import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { authMiddleware, generateToken, hashPassword, comparePassword } from "./auth";
import { registerSchema, loginSchema, insertTaskSchema, updateTaskSchema, updateUserSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.post("/api/auth/register", async (req, res) => {
    try {
      const result = registerSchema.safeParse(req.body);
      
      if (!result.success) {
        return res.status(400).json({ 
          message: result.error.errors[0]?.message || "Validation failed" 
        });
      }
      
      const { email, password, name } = result.data;
      
      const existingUser = await storage.getUserByEmail(email);
      if (existingUser) {
        return res.status(409).json({ message: "Email already registered" });
      }
      
      const hashedPassword = await hashPassword(password);
      const user = await storage.createUser({
        email,
        password: hashedPassword,
        name,
      });
      
      const token = generateToken({ userId: user.id, email: user.email });
      
      res.status(201).json({
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
      });
    } catch (error) {
      console.error("Register error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  app.post("/api/auth/login", async (req, res) => {
    try {
      const result = loginSchema.safeParse(req.body);
      
      if (!result.success) {
        return res.status(400).json({ 
          message: result.error.errors[0]?.message || "Validation failed" 
        });
      }
      
      const { email, password } = result.data;
      
      const user = await storage.getUserByEmail(email);
      if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
      
      const isValidPassword = await comparePassword(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
      
      const token = generateToken({ userId: user.id, email: user.email });
      
      res.json({
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  app.get("/api/auth/me", authMiddleware, async (req, res) => {
    try {
      const user = await storage.getUser(req.user!.userId);
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      res.json({
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
      });
    } catch (error) {
      console.error("Get user error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  app.patch("/api/auth/profile", authMiddleware, async (req, res) => {
    try {
      const result = updateUserSchema.safeParse(req.body);
      
      if (!result.success) {
        return res.status(400).json({ 
          message: result.error.errors[0]?.message || "Validation failed" 
        });
      }
      
      const data = result.data;
      
      if (data.email) {
        const existingUser = await storage.getUserByEmail(data.email);
        if (existingUser && existingUser.id !== req.user!.userId) {
          return res.status(409).json({ message: "Email already in use" });
        }
      }
      
      const user = await storage.updateUser(req.user!.userId, data);
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      res.json({
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
      });
    } catch (error) {
      console.error("Update profile error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  app.get("/api/tasks", authMiddleware, async (req, res) => {
    try {
      const { search, status } = req.query;
      
      let taskList;
      if (search || (status && status !== "all")) {
        taskList = await storage.searchTasks(
          req.user!.userId,
          (search as string) || "",
          status as string
        );
      } else {
        taskList = await storage.getTasks(req.user!.userId);
      }
      
      res.json(taskList);
    } catch (error) {
      console.error("Get tasks error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  app.get("/api/tasks/:id", authMiddleware, async (req, res) => {
    try {
      const task = await storage.getTask(req.params.id, req.user!.userId);
      
      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }
      
      res.json(task);
    } catch (error) {
      console.error("Get task error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  app.post("/api/tasks", authMiddleware, async (req, res) => {
    try {
      const result = insertTaskSchema.safeParse(req.body);
      
      if (!result.success) {
        return res.status(400).json({ 
          message: result.error.errors[0]?.message || "Validation failed" 
        });
      }
      
      const task = await storage.createTask(req.user!.userId, result.data);
      
      res.status(201).json(task);
    } catch (error) {
      console.error("Create task error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  app.patch("/api/tasks/:id", authMiddleware, async (req, res) => {
    try {
      const result = updateTaskSchema.safeParse(req.body);
      
      if (!result.success) {
        return res.status(400).json({ 
          message: result.error.errors[0]?.message || "Validation failed" 
        });
      }
      
      const task = await storage.updateTask(req.params.id, req.user!.userId, result.data);
      
      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }
      
      res.json(task);
    } catch (error) {
      console.error("Update task error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  app.delete("/api/tasks/:id", authMiddleware, async (req, res) => {
    try {
      const deleted = await storage.deleteTask(req.params.id, req.user!.userId);
      
      if (!deleted) {
        return res.status(404).json({ message: "Task not found" });
      }
      
      res.status(204).send();
    } catch (error) {
      console.error("Delete task error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  return httpServer;
}

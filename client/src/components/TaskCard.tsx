import { useState } from "react";
import { MoreVertical, Pencil, Trash2, CheckCircle2, Circle, Clock } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Task, TaskStatus } from "@shared/schema";

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
  onStatusChange: (taskId: string, status: TaskStatus) => void;
}

const statusConfig: Record<TaskStatus, { label: string; icon: typeof Circle; variant: "default" | "secondary" | "outline" }> = {
  todo: {
    label: "To Do",
    icon: Circle,
    variant: "secondary",
  },
  in_progress: {
    label: "In Progress",
    icon: Clock,
    variant: "default",
  },
  completed: {
    label: "Completed",
    icon: CheckCircle2,
    variant: "outline",
  },
};

export function TaskCard({ task, onEdit, onDelete, onStatusChange }: TaskCardProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const config = statusConfig[task.status];
  const StatusIcon = config.icon;

  const handleStatusCycle = () => {
    const statusOrder: TaskStatus[] = ["todo", "in_progress", "completed"];
    const currentIndex = statusOrder.indexOf(task.status);
    const nextStatus = statusOrder[(currentIndex + 1) % statusOrder.length];
    onStatusChange(task.id, nextStatus);
  };

  return (
    <Card 
      className="group hover-elevate transition-all duration-200"
      data-testid={`task-card-${task.id}`}
    >
      <CardHeader className="flex flex-row items-start justify-between gap-4 pb-2">
        <div className="flex items-start gap-3 min-w-0 flex-1">
          <button
            onClick={handleStatusCycle}
            className="mt-0.5 shrink-0 hover-elevate rounded-full p-1"
            data-testid={`button-toggle-status-${task.id}`}
            aria-label={`Change status from ${config.label}`}
          >
            <StatusIcon 
              className={`h-5 w-5 ${
                task.status === "completed" 
                  ? "text-chart-2 fill-chart-2" 
                  : task.status === "in_progress"
                  ? "text-primary"
                  : "text-muted-foreground"
              }`} 
            />
          </button>
          <div className="min-w-0 flex-1">
            <h3 
              className={`font-medium text-[15px] leading-tight ${
                task.status === "completed" ? "text-muted-foreground line-through" : ""
              }`}
              data-testid={`task-title-${task.id}`}
            >
              {task.title}
            </h3>
          </div>
        </div>
        <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 shrink-0 opacity-0 group-hover:opacity-100 data-[state=open]:opacity-100"
              data-testid={`button-task-menu-${task.id}`}
            >
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuItem
              onClick={() => onEdit(task)}
              data-testid={`button-edit-task-${task.id}`}
            >
              <Pencil className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => onDelete(task.id)}
              className="text-destructive focus:text-destructive"
              data-testid={`button-delete-task-${task.id}`}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      {task.description && (
        <CardContent className="pt-0 pb-4">
          <p 
            className="text-sm text-muted-foreground line-clamp-2"
            data-testid={`task-description-${task.id}`}
          >
            {task.description}
          </p>
        </CardContent>
      )}
      <CardContent className="pt-0 pb-4">
        <Badge 
          variant={config.variant}
          className="text-xs"
          data-testid={`task-status-badge-${task.id}`}
        >
          {config.label}
        </Badge>
      </CardContent>
    </Card>
  );
}

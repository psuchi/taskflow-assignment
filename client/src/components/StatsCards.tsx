import { CheckCircle2, Circle, Clock, ListTodo } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { Task } from "@shared/schema";

interface StatsCardsProps {
  tasks: Task[];
}

export function StatsCards({ tasks }: StatsCardsProps) {
  const stats = {
    total: tasks.length,
    todo: tasks.filter((t) => t.status === "todo").length,
    inProgress: tasks.filter((t) => t.status === "in_progress").length,
    completed: tasks.filter((t) => t.status === "completed").length,
  };

  const items = [
    {
      label: "Total Tasks",
      value: stats.total,
      icon: ListTodo,
      color: "text-foreground",
      bgColor: "bg-muted",
    },
    {
      label: "To Do",
      value: stats.todo,
      icon: Circle,
      color: "text-muted-foreground",
      bgColor: "bg-secondary",
    },
    {
      label: "In Progress",
      value: stats.inProgress,
      icon: Clock,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      label: "Completed",
      value: stats.completed,
      icon: CheckCircle2,
      color: "text-chart-2",
      bgColor: "bg-chart-2/10",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {items.map((item) => (
        <Card key={item.label} data-testid={`stat-card-${item.label.toLowerCase().replace(" ", "-")}`}>
          <CardContent className="flex items-center gap-4 p-4">
            <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${item.bgColor}`}>
              <item.icon className={`h-5 w-5 ${item.color}`} />
            </div>
            <div>
              <p className="text-2xl font-semibold" data-testid={`stat-value-${item.label.toLowerCase().replace(" ", "-")}`}>
                {item.value}
              </p>
              <p className="text-sm text-muted-foreground">{item.label}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

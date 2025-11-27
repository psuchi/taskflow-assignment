import { Plus, Search, ListTodo } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  type: "no-tasks" | "no-results";
  onCreateTask?: () => void;
  onClearFilters?: () => void;
}

export function EmptyState({ type, onCreateTask, onClearFilters }: EmptyStateProps) {
  if (type === "no-results") {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4" data-testid="empty-state-no-results">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted mb-4">
          <Search className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-medium mb-2">No tasks found</h3>
        <p className="text-muted-foreground text-center max-w-sm mb-6">
          We couldn't find any tasks matching your search criteria. Try adjusting your filters.
        </p>
        {onClearFilters && (
          <Button variant="outline" onClick={onClearFilters} data-testid="button-clear-filters">
            Clear Filters
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4" data-testid="empty-state-no-tasks">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
        <ListTodo className="h-8 w-8 text-primary" />
      </div>
      <h3 className="text-lg font-medium mb-2">No tasks yet</h3>
      <p className="text-muted-foreground text-center max-w-sm mb-6">
        Get started by creating your first task. Organize your work and boost your productivity.
      </p>
      {onCreateTask && (
        <Button onClick={onCreateTask} data-testid="button-create-first-task">
          <Plus className="mr-2 h-4 w-4" />
          Create Your First Task
        </Button>
      )}
    </div>
  );
}

interface Todo {
  id: string;
  task: string;
  description: string;
  priority: {
    priority_name: string;
    value: "default" | "outline" | "secondary" | "destructive";
  };
  completed: boolean;
}

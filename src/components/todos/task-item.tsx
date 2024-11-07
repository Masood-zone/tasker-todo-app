"use client";
import React, { startTransition, useActionState, useState } from "react";
import { Checkbox } from "../ui/checkbox";
import { Badge } from "../ui/badge";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Edit, Loader2Icon, XIcon } from "lucide-react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import {
  removeTodo,
  toggleTodoStatus,
  updateTodo,
} from "@/app/actions/actions";

export default function TaskItem({ todo }: { todo: Todo }) {
  const [state, updateTodoAction, isUpdating] = useActionState(updateTodo, {
    success: false,
    message: "",
  });
  const [priority, setPriority] = useState({
    priority_name: "Normal",
    value: "default",
  });

  const handleUpdateTodo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.append("docId", todo.id);
    formData.append("priority", JSON.stringify(priority));
    startTransition(() => updateTodoAction(formData));
  };

  const handleDeleteTodo = async (docId: string) => {
    await removeTodo(null, docId);
  };

  const handleToggleStatus = async (docId: string) => {
    await toggleTodoStatus(null, docId);
  };

  return (
    <li
      key={todo.id}
      className={`p-5 w-full flex items-center space-x-2 relative group border rounded-xl ${
        todo.completed
          ? "bg-primary dark:text-black text-white line-through"
          : ""
      }`}
    >
      <Checkbox
        checked={todo.completed}
        onCheckedChange={() => handleToggleStatus(todo.id)}
      />
      <div className="flex-1 py-3">
        <h3 className="font-medium text-xl">{todo.task}</h3>
        <p className="text-base">{todo.description}</p>
        <div className="flex flex-wrap gap-2 mt-2">
          <Badge variant={todo.priority.value}>
            {todo.priority.priority_name} priority
          </Badge>
        </div>
      </div>
      <div className="absolute right-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-2">
        {/* Edit Dialog */}
        <Dialog>
          <DialogTrigger asChild>
            <button>
              <Edit
                size={20}
                className={todo.completed ? "text-white" : "text-primary"}
              />
            </button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Task</DialogTitle>
              <DialogDescription>
                Update this task&apos;s details
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleUpdateTodo}>
              <input type="hidden" name="docId" value={todo.id} />
              <div className="flex flex-col items-center w-full gap-3">
                <Input name="task" defaultValue={todo.task} required />
                <Textarea
                  name="description"
                  rows={4}
                  defaultValue={todo.description}
                />
                <Select
                  defaultValue={todo.priority.value}
                  onValueChange={(
                    value: "default" | "outline" | "secondary" | "destructive"
                  ) => {
                    const priorityMapping = {
                      default: "Normal",
                      outline: "Least",
                      secondary: "Medium",
                      destructive: "High",
                    };
                    setPriority({
                      priority_name: priorityMapping[value],
                      value,
                    });
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Task priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">
                      <Badge variant="default">Normal priority</Badge>
                    </SelectItem>
                    <SelectItem value="outline">
                      <Badge variant="outline">Least priority</Badge>
                    </SelectItem>
                    <SelectItem value="secondary">
                      <Badge variant="secondary">Medium priority</Badge>
                    </SelectItem>
                    <SelectItem value="destructive">
                      <Badge variant="destructive">High priority</Badge>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <DialogClose asChild>
                <Button type="submit" className="w-full mt-5 rounded-full">
                  {isUpdating ? (
                    <span>
                      <Loader2Icon
                        size={20}
                        className="animate-spin text-white"
                      />
                    </span>
                  ) : (
                    "Update Task"
                  )}
                </Button>
              </DialogClose>
              {!state.success && (
                <p className="text-red-500 text-sm">{state.message}</p>
              )}
            </form>
          </DialogContent>
        </Dialog>
        {/* Delete Button */}
        <button onClick={() => handleDeleteTodo(todo.id)}>
          <XIcon size={20} className="text-red-500" />
        </button>
      </div>
    </li>
  );
}

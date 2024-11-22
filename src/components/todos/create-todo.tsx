"use client";
import React, {
  startTransition,
  useActionState,
  useEffect,
  useState,
} from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { addTodo } from "@/app/actions/actions";
import { toast } from "@/hooks/use-toast";
import { Textarea } from "../ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Badge } from "../ui/badge";
import { useSession } from "next-auth/react";

export const CreateTodo = () => {
  const session = useSession();
  const [state, formAction, isPending] = useActionState(addTodo, {
    success: false,
    message: "",
  });
  const [priority, setPriority] = useState({
    priority_name: "Normal",
    value: "default",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.append("priority", JSON.stringify(priority));

    startTransition(() => {
      formAction(formData);
    });
  };

  useEffect(() => {
    if (state.success) {
      toast({
        title: "Success",
        description: state.message,
        duration: 1000,
      });
    }
  }, [state.success, state.message]);

  if (!session?.data?.user?.email) {
    return (
      <div className="max-w-lg mx-auto text-center p-5 space-y-2">
        <span className="text-lg">
          Create an account or login to start adding tasks
        </span>
      </div>
    );
  }

  return (
    <>
      <Dialog>
        <DialogTrigger className="w-full mt-5 rounded-full text-white bg-primary py-3 dark:text-black dark:bg-white">
          Add Task
        </DialogTrigger>
        <DialogContent className="rounded-xl max-w-xl max-sm:w-96 mx-auto">
          <DialogHeader>
            <DialogTitle>Add Todo</DialogTitle>
            <DialogDescription>Create a new task</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col items-center w-full gap-3 ">
              <Input
                name="task"
                className="w-full py-6"
                placeholder="Task title"
                required
              />
              <Textarea
                name="description"
                rows={4}
                placeholder="Task description..."
              />
              <Select
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
            <Button
              type="submit"
              className="w-full mt-5 rounded-full"
              disabled={isPending}
            >
              {isPending ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                "Add Task"
              )}
            </Button>
            {!state.success && (
              <p className="text-sm text-center text-red-500 mt-2">
                {state.message}
              </p>
            )}
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreateTodo;

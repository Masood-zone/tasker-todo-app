import { fetchTodos } from "@/app/actions/actions";
import React from "react";
import NotFoundHead from "../animations/not-found.-head";
import TaskItem from "./task-item";

export default async function TaskList() {
  const { todos } = await fetchTodos();

  if (!todos || todos.length === 0) {
    return (
      <div className="max-w-lg mx-auto border rounded-xl text-center p-5 space-y-2">
        <NotFoundHead />
        <p className="">Hmm, no tasks!</p>
        <p className="text-2xl font-medium">Try creating some 👆</p>
      </div>
    );
  }

  const sortedTodos = todos.sort((a, b) => b.createdAt - a.createdAt);

  return (
    <ul className="space-y-4">
      {sortedTodos.map((todo) => (
        <TaskItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}

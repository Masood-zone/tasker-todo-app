import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home() {
  return (
    <main className="container mx-auto">
      {/* Header */}
      <header className="flex justify-center items-center py-5">
        <h1 className="text-4xl font-bold">Create a Task</h1>
      </header>
      {/* Input Task */}
      <section className="max-w-xl mx-auto py-5">
        <Input
          className="w-full rounded-full py-6 placeholder:text-lg text-lg"
          placeholder="Enter task"
        />
        <Button className="w-full mt-5 rounded-full">Add Task</Button>
      </section>
      {/* Task list */}
    </main>
  );
}

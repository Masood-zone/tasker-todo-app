import CreateTodo from "@/components/todos/create-todo";
import Image from "next/image";
import PageLogo from "@/assets/home-logo.svg";
import { getCurrentDayOfWeek } from "@/lib/date-teller";
import WavingHand from "@/components/animations/waving-hand";
import TaskList from "@/components/todos/task-list";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  return (
    <main className="container mx-auto">
      {/* Header */}
      <header className="flex flex-col gap-4 justify-center items-center py-5">
        <Image src={PageLogo} alt="logo" width={100} height={100} />
        <div className="text-2xl font-bold text-center">
          <span>Hey there!</span>
          <WavingHand /> It&lsquo;s {getCurrentDayOfWeek()}
        </div>
      </header>

      {/* Input Task */}
      <section className="md:max-w-xl w-full mx-auto py-5 md:px-0 px-5">
        <CreateTodo />
      </section>

      {/* Task list */}
      <section className="md:max-w-2xl w-full mx-auto h-auto p-5">
        <Suspense
          fallback={
            <div className="max-w-lg mx-auto border rounded-xl text-center p-5 space-y-2">
              <Skeleton className="h-10 w-full rounded-md" />
              <Skeleton className="h-10 w-full rounded-md" />
              <Skeleton className="h-10 w-full rounded-md" />
              <Skeleton className="h-10 w-full rounded-md" />
            </div>
          }
        >
          <TaskList />
        </Suspense>
      </section>
    </main>
  );
}

import React from "react";
import { auth, signOut } from "../actions/auth";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const session = await auth();
  if (!session) {
    return (
      <div className="max-w-xl mx-auto shadow rounded-xl">
        <p className="text-2xl font-medium p-4 text-red-500 text-center">
          Session not found
        </p>
      </div>
    );
  }
  const { user } = session;

  return (
    <section className="max-w-xl mx-auto shadow rounded-xl">
      <h1 className="text-2xl font-bold p-4">Profile</h1>
      <form
        action={async () => {
          "use server";
          await signOut();
          redirect("/");
        }}
      >
        <div className="p-4">
          <Image
            src={user?.image || ""}
            width={100}
            height={100}
            className="rounded-full pb-2 bg-gray-100"
            alt={`user ${user?.name}`}
          />
          <p className="text-lg">Welcome, {user?.name}</p>
          <p className="text-sm text-gray-500">Email: {user?.email}</p>

          <Button
            type="submit"
            variant="destructive"
            size="sm"
            className="mt-2"
          >
            Logout
          </Button>
        </div>
      </form>
    </section>
  );
}

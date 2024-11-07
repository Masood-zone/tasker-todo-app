import { auth, signIn } from "@/app/actions/auth";
import React from "react";
import { Button } from "../ui/button";
import Logo from "@/assets/logo.svg";
import Image from "next/image";
import Link from "next/link";
import UserAvatar from "./user-avatar";

export default async function Navbar() {
  const session = await auth();

  return (
    <header className="flex items-center justify-between w-full py-5 px-5">
      {/* Header */}
      <Link href="/">
        <div className="flex items-center space-x-2 hover:cursor-pointer">
          <Image src={Logo} alt="main-logo" className="w-5 h-5" />
          <h1 className="text-xl font-medium">Tasker Todo</h1>
        </div>
      </Link>
      {/* Profile */}
      <div className="">
        {!session?.user ? (
          <form
            action={async () => {
              "use server";
              await signIn();
            }}
            className="space-x-3"
          >
            <Button type="submit" variant="outline">
              Login
            </Button>
            <Button type="submit">Create Account</Button>
          </form>
        ) : (
          <UserAvatar
            user={{
              email: session.user.email ?? "",
              image: session.user.image ?? "",
              name: session.user.name ?? "",
            }}
          />
        )}
      </div>
    </header>
  );
}

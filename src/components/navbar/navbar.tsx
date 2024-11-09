import { auth, signIn } from "@/app/actions/auth";
import React from "react";
import { Button } from "../ui/button";
import Logo from "@/assets/home-logo.svg";
import Image from "next/image";
import Link from "next/link";
import UserAvatar from "./user-avatar";
import { DarkThemeToggle } from "../themes/toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { MenuIcon } from "lucide-react";

export default async function Navbar() {
  const session = await auth();

  return (
    <header className="flex items-center justify-between w-full py-5 px-5">
      {/* Header */}
      <Link href="/" className="flex space-x-4">
        <div className="flex items-center space-x-2 hover:cursor-pointer">
          <Image src={Logo} alt="main-logo" className="w-5 h-5" />
          <h1 className="text-xl font-medium">Tasker Todo</h1>
        </div>
        <DarkThemeToggle />
      </Link>
      {/* Profile */}
      <div className="">
        {!session?.user ? (
          <form
            action={async () => {
              "use server";
              await signIn();
            }}
            className="md:space-x-3"
          >
            <div className="md:block hidden">
              <Button type="submit" variant="outline">
                Login
              </Button>
              <Button type="submit">Create Account</Button>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger className="md:hidden block">
                <MenuIcon size={24} />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Button type="submit" variant="outline" className="w-full">
                    Login
                  </Button>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Button type="submit">Create Account</Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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

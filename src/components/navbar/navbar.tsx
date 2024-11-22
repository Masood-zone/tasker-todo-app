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
    <header className="flex items-center flex-row justify-between w-full py-5 px-5 ">
      {/* Header */}
      <Link
        href="/"
        className="flex space-x-4 max-[449px]:flex-col flex-row items-center gap-2 max-[449px]:items-start"
      >
        <div className="flex items-center space-x-2 hover:cursor-pointer">
          <Image src={Logo} alt="main-logo" className="w-5 h-5" />
          <h1 className="text-xl max-[499px]:text-base font-medium">
            Tasker Todo
          </h1>
        </div>
        <DarkThemeToggle />
      </Link>
      {/* Profile */}
      <div className="">
        {!session?.user ? (
          <div className="md:space-x-3">
            <div className="md:block hidden space-x-3">
              <Button
                type="submit"
                variant="outline"
                onClick={async () => {
                  "use server";
                  await signIn();
                }}
              >
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
                  <Button
                    type="submit"
                    variant="outline"
                    className="w-full"
                    onClick={async () => {
                      "use server";
                      await signIn();
                    }}
                  >
                    Login
                  </Button>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Button
                    type="submit"
                    onClick={async () => {
                      "use server";
                      await signIn();
                    }}
                  >
                    Create Account
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
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

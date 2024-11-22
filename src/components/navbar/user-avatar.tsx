"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Link from "next/link";
import { LogOutIcon, User2Icon } from "lucide-react";
import { Button } from "../ui/button";
import { signOut } from "next-auth/react";

interface User {
  email: string;
  image?: string;
  name?: string;
}

export default function UserAvatar({ user }: { user: User }) {
  const { email, image, name } = user;

  return (
    <div className="flex items-center space-x-2">
      {/* User Info */}
      <div className="flex flex-col items-end space-y-1">
        <span className="text-sm max-[399px]:hidden">{name || email}</span>
        <span className="text-xs text-gray-500 max-[399px]:hidden">
          {email}
        </span>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger>
          {/* Avatar */}
          <Avatar>
            <AvatarImage src={image} alt={email} />
            <AvatarFallback>
              {name ? name[0].toUpperCase() : email[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link href="/profile" className="flex gap-2">
              <User2Icon />
              Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Button
              variant="destructive"
              className="flex gap-2"
              onClick={() => signOut()}
            >
              <LogOutIcon />
              Log out
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

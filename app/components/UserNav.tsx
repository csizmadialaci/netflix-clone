"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { getUserSession } from "../action";

export default function UserNav() {
  const [userSession, setUserSession] = useState({
    userName: "",
    userEmail: "",
  });

  useEffect(() => {
    async function fetchUserData() {
      const session = await getUserSession();
      setUserSession(session);
    }
    fetchUserData();
  }, []);
  const { userName, userEmail } = userSession;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-sm">
          <Avatar className="h-12 w-12 rounded-sm">
            <AvatarImage src="https://eidocxtfxtyvekfduwtv.supabase.co/storage/v1/object/public/user%20image/avatar.png" />
            <AvatarFallback className="rounded-sm">{userName}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-60 lg:w-56 mt-4" align="end" forceMount>
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-2 lg:space-y-1">
            <p className="text-lg lg:text-sm font-medium leading-none">
              {" "}
              {userName}
            </p>
            <p className="text-md lg:text-xs leading-none text-muted-foreground break-words">
              {" "}
              {userEmail}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-xl"
          onClick={() => {
            signOut();
          }}
        >
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

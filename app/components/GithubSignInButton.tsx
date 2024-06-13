"use client";
import { Button } from "@/components/ui/button";
import GithubIcon from "../../public/github-mark-white.png";
import { signIn } from "next-auth/react";
import Image from "next/image";

export default function GithubSignInButton() {
  return (
    <Button
      onClick={() => {
        signIn("github");
      }}
      variant="outline"
      size="icon"
    >
      <Image src={GithubIcon} width={28} height={28} alt="github login icon" />
    </Button>
  );
}

"use client";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import { Button } from "../ui/button";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { signIn } from "next-auth/react";
import { defaultLoginRedirect } from "@/routes";

const Social = () => {
  const onClick = (provider: "google" | "github") => {
    signIn(provider, { callbackUrl: defaultLoginRedirect });
  };
  return (
    <div className=" flex items-center w-full gap-x-2">
      <Button
        size={"lg"}
        className="w-full"
        variant={"outline"}
        onClick={() => onClick("google")}
      >
        <FcGoogle />
      </Button>
      <Button
        size={"lg"}
        className="w-full"
        variant={"outline"}
        onClick={() => onClick("github")}
      >
        <GitHubLogoIcon />
      </Button>
    </div>
  );
};

export default Social;

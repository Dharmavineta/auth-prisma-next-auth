"use client";
import React, { FC } from "react";
import { Button } from "../ui/button";
import Link from "next/link";

type props = {
  href: string;
  label: string;
};

const BackButton: FC<props> = ({ href, label }) => {
  return (
    <Button asChild variant={"link"} className="w-full font-normal">
      <Link href={href}>{label}</Link>
    </Button>
  );
};

export default BackButton;

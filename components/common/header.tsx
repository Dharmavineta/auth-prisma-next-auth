import { cn } from "@/lib/utils";
import React, { FC } from "react";

type props = {
  label: string;
};

const Header: FC<props> = ({ label }) => {
  return (
    <div className="w-full flex flex-col gap-y-4 items-center justify-center">
      <h1 className={cn("text-3xl font-semibold")}>Auth</h1>
      <p className="text-muted-foreground text-sm">{label}</p>
    </div>
  );
};

export default Header;

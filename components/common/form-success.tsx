import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import React, { FC } from "react";

type props = {
  message?: string;
};

const FormSuccess: FC<props> = ({ message }) => {
  if (!message) return null;
  return (
    <div className="bg-emerald-500/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-emerald-500">
      <ExclamationTriangleIcon className="h-4 w-4" />
      <p>{message}</p>
    </div>
  );
};

export default FormSuccess;

import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import React from "react";

const Dashboard = async () => {
  const session = await auth();

  console.log(session?.user);
  return (
    <div>
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <Button>Sign Out</Button>
      </form>
    </div>
  );
};

export default Dashboard;

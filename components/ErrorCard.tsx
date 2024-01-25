import React from "react";
import { Card, CardFooter, CardHeader } from "./ui/card";
import Header from "./common/header";
import BackButton from "./common/BackButton";

const ErrorCard = () => {
  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader>
        <Header label="Oops! Something went wrong" />
      </CardHeader>
      <CardFooter>
        <BackButton label="Back to login" href="/login" />
      </CardFooter>
    </Card>
  );
};

export default ErrorCard;

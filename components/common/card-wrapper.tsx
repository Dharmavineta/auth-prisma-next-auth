"use client";
import React, { FC } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import Header from "./header";
import Social from "./Social";
import BackButton from "./BackButton";

type props = {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonhref: string;
  showSocial?: boolean;
};

const CardWrapper: FC<props> = ({
  backButtonLabel,
  backButtonhref,
  children,
  headerLabel,
  showSocial,
}) => {
  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader>
        <Header label={headerLabel} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      {showSocial && (
        <CardFooter>
          <Social />
        </CardFooter>
      )}
      <CardFooter>
        <BackButton href={backButtonhref} label={backButtonLabel} />
      </CardFooter>
    </Card>
  );
};

export default CardWrapper;

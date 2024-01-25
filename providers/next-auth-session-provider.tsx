import React, { FC } from "react";

type props = {
  children: React.ReactNode;
};

const NextAuthSessionProvider: FC<props> = ({ children }) => {
  return <div>{children}</div>;
};

export default NextAuthSessionProvider;

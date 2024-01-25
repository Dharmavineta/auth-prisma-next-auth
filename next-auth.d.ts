import NextAuth, { DefaultSession } from "next-auth";
import { JWT } from "@auth/core/jwt";

export type ExtendedUser = DefaultSession["user"] & {
  role: "ADMIN" | "USER";
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}

import NextAuth, { DefaultSession, Session } from "next-auth";
import authConfig from "./auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import PrismaDb from "./lib/db";
import { getUserById } from "./data";
import { JWT } from "@auth/core/jwt";
import { UserRole } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    token: JWT;
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/login",
    error: "/error",
  },
  events: {
    async linkAccount({ user }) {
      await PrismaDb.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  callbacks: {
    async session({ session, token }: { session: Session; token?: any }) {
      if (token && token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token && token.role && session.user) {
        session.user.role = token.role as UserRole;
      }

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;
      token.role = existingUser.role;
      return token;
    },
  },
  adapter: PrismaAdapter(PrismaDb),
  session: { strategy: "jwt" },
  ...authConfig,
});
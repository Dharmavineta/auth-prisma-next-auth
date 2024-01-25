import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

const PrismaDb = global.prisma || new PrismaClient();

if (process.env.NODE_ENV === "development") global.prisma = PrismaDb;

export default PrismaDb;

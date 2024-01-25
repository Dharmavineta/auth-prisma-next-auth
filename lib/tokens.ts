import { getVerificationTokenByEmail } from "@/data/verification-token";
import { v4 as uuid } from "uuid";
import PrismaDb from "./db";
export const generateVerificationToken = async (email: string) => {
  const token = uuid();

  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existToken = await getVerificationTokenByEmail(email);

  if (existToken) {
    await PrismaDb.verificationToken.delete({
      where: {
        id: existToken.id,
      },
    });
  }

  const verificationToken = await PrismaDb.verificationToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return verificationToken;
};

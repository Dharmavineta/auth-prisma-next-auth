import PrismaDb from "@/lib/db";

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const verificationToken = await PrismaDb.verificationToken.findFirst({
      where: {
        email,
      },
    });
    return verificationToken;
  } catch (error) {
    console.log(error);
  }
};

export const getVerificationTokenByToken = async (token: string) => {
  try {
    const verificationToken = await PrismaDb.verificationToken.findFirst({
      where: {
        token,
      },
    });
    return verificationToken;
  } catch (error) {
    console.log(error);
  }
};

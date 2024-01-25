"use server";

import { signIn } from "@/auth";
import { registerFormType } from "@/components/common/register-form";
import { loginFormType } from "@/components/forms/login-form";
import { getUserByEmail } from "@/data";
import PrismaDb from "@/lib/db";
import { generateVerificationToken } from "@/lib/tokens";
import { defaultLoginRedirect } from "@/routes";
import { loginFormSchema, registerFormSchema } from "@/schemas";
import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";

export const login = async (values: loginFormType) => {
  const validatedFields = loginFormSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid Fields" };
  }

  const { email, password } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Invalid Credentials" };
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email
    );

    return { success: "Confirmation email sent" };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: defaultLoginRedirect,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials" };
        default:
          return { error: "Something went wrong" };
      }
    }
    throw error;
  }
};

export const register = async (values: registerFormType) => {
  const validatedFields = registerFormSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid Fields" };
  }

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(validatedFields.data.password, salt);

  const isUser = await getUserByEmail(validatedFields.data.email);

  if (isUser) {
    return { error: "User already exists" };
  }
  const result = await PrismaDb.user.create({
    data: {
      ...validatedFields.data,
      password: hashPassword,
    },
  });

  const verificationToken = await generateVerificationToken(
    validatedFields.data.email
  );

  return { success: "Confirmation Email sent" };
};

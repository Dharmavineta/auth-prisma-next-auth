import * as z from "zod";

export const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const registerFormSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: "Min password lenght is 6 characters" }),
  name: z.string().min(1),
});

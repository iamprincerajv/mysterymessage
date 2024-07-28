import { z } from "zod";

export const usernameVaildation = z
  .string()
  .min(3, "Username must be atleast of 3 characters")
  .max(16, "Username cannot be more than 16 characters")
  .regex(/^[a-zA-Z0-9_]+$/, "Username must not contain special character");

  export const signUpSchema = z.object({
    username: usernameVaildation,
    email: z.string().email({message: "Invalid email address"}),
    password: z.string().min(8, {message: "Password must be at least 8 characters"}),
  });

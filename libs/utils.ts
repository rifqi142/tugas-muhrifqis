import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const authFormSchema = (type: string) =>
  z.object({
    // sign up
    name: type === "sign-in" ? z.string().optional() : z.string().min(8),
    phone: type === "sign-in" ? z.string().optional() : z.string().min(10),
    // both
    email: z.string().email(),
    password: z.string().min(8),
  });

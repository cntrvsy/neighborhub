import { z } from 'zod'

// Sign In Schema
export const SignInSchema = z.object({
  email: z.string().email().min(3),
  password: z.string().min(6)
})

export type SignInSchema = typeof SignInSchema;

// Sign Up Schema
export const SignUpSchema = z.object({
email: z.string().email().min(3),
password: z.string().min(6),
confirm: z.string().min(6)
}).refine((data) => data.password == data.confirm,{
message: "Passwords didn't match",
path: ["confirm"]
})

// Reset Password Schema
export const ResetPasswordSchema = z.object({
email: z.string().email().min(3),
})

// Confirm Password Schema
export const ConfirmPasswordSchema = z.object({
token: z.string().min(1),
password: z.string().min(6),
confirm: z.string().min(6)
}).refine((data) => data.password == data.confirm,{
message: "Passwords didn't match",
path: ["confirm"]
})

// Store Insert Schema
export const StoreInsertSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  location: z.string().min(1),
})

export type StoreInsertSchema = typeof StoreInsertSchema

// Store Delete Schema
export const StoreDeleteSchema = z.object({
  id: z.string(),
})

export type StoreDeleteSchema = typeof StoreDeleteSchema

// Store Update Schema
export const StoreUpdateSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  description: z.string().min(1),
  location: z.string().min(1),
})

export type StoreUpdateSchema = typeof StoreUpdateSchema;
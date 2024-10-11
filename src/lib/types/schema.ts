import { z } from 'zod'

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

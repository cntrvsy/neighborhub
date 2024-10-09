import { z } from 'zod'

// Store Schema
export const StoreSchema = z.object({
    name: z.string().min(1),
    description: z.string().min(1),
    location: z.string().min(1),
  })

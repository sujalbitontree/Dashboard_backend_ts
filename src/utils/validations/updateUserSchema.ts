import { z } from 'zod'

export const updateUserSchema = z.object({
 id: z.coerce.number(),
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must be under 20 characters'),

  age: z.coerce
    .number()
    .min(5, 'Age must be at least 5')
    .max(80, 'Age must be at most 80'),
})

export type UpdateUserInput = z.infer<typeof updateUserSchema>

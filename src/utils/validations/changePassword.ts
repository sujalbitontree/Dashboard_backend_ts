import {z} from 'zod'
import { passwordSchema } from './signupSchema'

export const changePasswordSchema = z.object({
    oldPassword : passwordSchema,
    newPassword : passwordSchema,
}).refine((data) => data.oldPassword !== data.newPassword, {
  message: "New password must be different from the old password",
  path: ["newPassword"], 
});

export type ChangePasswordInput = z.infer<typeof changePasswordSchema>
import {z} from 'zod'
import { passwordSchema } from './signupSchema'


export const resetPasswordSchema = z.object({
    password : passwordSchema,
    confirmPassword : passwordSchema
})
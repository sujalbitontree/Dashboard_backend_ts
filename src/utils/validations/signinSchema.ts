import {z} from "zod"
import { emailSchema, passwordSchema } from "./signupSchema"




export const signinSchema = z.object({
    email : emailSchema,
    password : passwordSchema
})


export type SigninSchema = z.infer<typeof signinSchema>
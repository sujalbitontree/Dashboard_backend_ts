import { z } from 'zod';

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
export const emailSchema = z.email({
  pattern: emailRegex,
  message: 'Invalid email format',
})


const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).*$/;

export const passwordSchema = z
  .string()
  .min(8, { message: 'Password must be at least 8 characters long' }) 
  .max(14, { message: 'Password must be at most 14 characters long' })
  .regex(passwordRegex, {
    message: "Password must contain at least one uppercase, one lowercase, one number and one special character"
  });

export const signupSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters').max(20, 'Username must be under 20 characters'),
  email: emailSchema,
  password: passwordSchema,
  confirmPassword: z.string(), 
  age: z.coerce.number().min(5).max(80),
  gender: z.string().min(1, "Gender is required")
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"], 
});

export type SignupSchema = z.infer<typeof signupSchema>
import { findByEmail } from "../../repository/userRepository/checkEmail"
import { create } from "../../repository/userRepository/signup"
import { hashPassword } from "../../utils/bcrypt/bcrypt"
import { SignupSchema } from "../../utils/validations/signupSchema"

export const registerUser = async (userData : SignupSchema) => {
  const { email, password } = userData
 

  const existingUser = await findByEmail(email)
  if (existingUser) {
    throw new Error('Email already exists')
  }

  const hashedPassword = await hashPassword(password)

  return await create({
    ...userData,
    password: hashedPassword,
  })
}
import { findByEmail } from '../../repository/userRepository/checkEmail'
import { comparePassword } from '../../utils/bcrypt/bcrypt'
import { generateToken } from '../../utils/tokens/tokens'
import { SigninSchema } from '../../utils/validations/signinSchema'
import dotenv from 'dotenv'
dotenv.config()

export const loginUser = async (userData: SigninSchema) => {
  const { email, password } = userData

  const user = await findByEmail(email)

  if (!user || !(await comparePassword(password, user.password_hash))) {
    throw new Error('Invalid email or password')
  }

  const payload = {
    id: user.id,
    email: user.email,
  }

 

  const accessToken = generateToken(
    payload,
    process.env.ACCESS_SECRET as string,
    '30m'
  )
  const refreshToken = generateToken(
    payload,
    process.env.REFRESH_SECRET as string,
    '7d'
  )
  console.log(`refreshToken`, refreshToken)

  return { accessToken, refreshToken, user }
}

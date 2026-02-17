import { completePasswordReset } from '../../repository/userRepository/completePasswordReset'
import { findUserByResetToken } from '../../repository/userRepository/findUserByResetToken'
import { ResetResponse, ResetUserData } from '../../types/user'
import { comparePassword, hashPassword } from '../../utils/bcrypt/bcrypt'
import { getHashedToken } from '../../utils/crypto/crypto'

export const resetPassword = async (
  userData: ResetUserData
): Promise<ResetResponse> => {
  const token = userData.token
  const { password } = userData

  if (!token) throw new Error('Token missing')

  const cleanToken = String(token).trim()
  const hashedToken = getHashedToken(cleanToken)

  const user = await findUserByResetToken(hashedToken)

  if (!user) {
    throw new Error('Invalid Token')
  }

  const isExpired = new Date(user.reset_password_expiry) < new Date()
  if (isExpired) {
    throw new Error('Token Expired')
  }


  const isSamePassword = await comparePassword(password, user.password_hash)

  if (isSamePassword) {
    throw new Error('New password must be different from the old one')
  }

  const newHashedPassword = await hashPassword(password)

  await completePasswordReset(user.id, newHashedPassword)

  return { success: true }
}

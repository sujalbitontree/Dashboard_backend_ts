import { findById } from '../../repository/userRepository/findById'
import { updatePasswordById } from '../../repository/userRepository/changePassword'
import { ChangePasswordInput, User } from '../../types/user'
import { comparePassword, hashPassword } from '../../utils/bcrypt/bcrypt'

export const updatePassword = async (
  userData: ChangePasswordInput
): Promise<boolean> => {
  const user: User | null = await findById(userData.id)

  if (!user) {
    throw new Error('User not found')
  }

  const isMatch = await comparePassword(
    userData.oldPassword,
    user.password_hash
  )
  if (!isMatch) {
    throw new Error('Current password is incorrect')
  }

  const newHashedPassword = await hashPassword(userData.newPassword)

  const affectedRows: unknown = await updatePasswordById(
    userData.id,
    newHashedPassword
  )

  if (affectedRows === 0) {
    throw new Error('Failed to update password')
  }

  return true
}

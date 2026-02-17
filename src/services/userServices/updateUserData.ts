import { findById } from '../../repository/userRepository/findById'
import { updateUserDataBYId } from '../../repository/userRepository/updateUserData'
import { UpdateUserInput } from '../../utils/validations/updateUserSchema'

export const updateUserData = async (
  userData: UpdateUserInput
): Promise<boolean> => {
  const user = await findById(userData.id as number)

  if (!user) {
    throw new Error('User not found')
  }

  await updateUserDataBYId(userData)

  return true
}

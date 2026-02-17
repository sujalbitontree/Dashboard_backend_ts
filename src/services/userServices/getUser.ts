import { findById } from '../../repository/userRepository/findById'
import { User } from '../../types/user'

export const getUser = async (userData: Pick<User, 'id'>) => {
  const user = await findById(userData.id)
  if (!user) {
    throw new Error('User not found')
  }
  return user
}

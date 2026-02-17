import { query } from '../../db'
import { FIND_USER_BY_RESET_TOKEN } from '../../db/Queries/queries'
import { User } from '../../types/user'

export const findUserByResetToken = async (
  hashedToken: string
): Promise<User | null> => {
  const { rows } = await query(FIND_USER_BY_RESET_TOKEN, [hashedToken])
  return rows[0]
}

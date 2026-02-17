import { query } from '../../db'
import { FIND_BY_EMAIL } from '../../db/Queries/queries'
import { User } from '../../types/user'

export const findByEmail = async (email: string): Promise<User | null> => {
  const { rows } = await query(FIND_BY_EMAIL, [email])
  return rows[0]
}

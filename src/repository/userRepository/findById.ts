import { query } from '../../db'
import { FIND_BY_ID } from '../../db/Queries/queries'
import { User } from '../../types/user'

export const findById = async (id: Number): Promise<User | null> => {
  const { rows } = await query(FIND_BY_ID, [id])
  return rows[0]
}

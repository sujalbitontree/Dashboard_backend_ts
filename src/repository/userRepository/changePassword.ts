import { query } from '../../db'
import { UPDATE_PASSWORD_BY_ID } from '../../db/Queries/queries'

export const updatePasswordById = async (
  id: number,
  newPasswordHash: string
) => {
  return await query(UPDATE_PASSWORD_BY_ID, [newPasswordHash, id])
}

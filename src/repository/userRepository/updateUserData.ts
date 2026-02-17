import { query } from '../../db'
import { UPDATE_USERDATA_BY_ID } from '../../db/Queries/queries'
import { User } from '../../types/user'
import { UpdateUserInput } from '../../utils/validations/updateUserSchema'
export const updateUserDataBYId = async (
  userData: UpdateUserInput
): Promise<User | unknown> => {
  const { id, username, age } = userData

  return await query(UPDATE_USERDATA_BY_ID, [id, username, age])
}

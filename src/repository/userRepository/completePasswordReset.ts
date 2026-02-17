import { query } from '../../db'
import { COMPLETE_PASSWORD_RESET } from '../../db/Queries/queries'

export const completePasswordReset = async (
  userId: Number,
  hashedPassword: string,
  
): Promise<void> => {
  await query(COMPLETE_PASSWORD_RESET, [hashedPassword, userId])
}

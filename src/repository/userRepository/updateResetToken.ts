import { query } from '../../db'
import { UPDATE_RESET_TOKEN } from '../../db/Queries/queries'

export const updateResetToken = async (
  userId: Number,
  hashedToken: string,
  expiry: Date
): Promise<void> => {
  await query(UPDATE_RESET_TOKEN, [userId, hashedToken, expiry])
}

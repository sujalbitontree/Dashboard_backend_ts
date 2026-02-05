import { query } from "../../db";

export const findByEmail = async (email:string) => {
  const isEmailExists = 'SELECT * FROM users WHERE email = $1'
  const { rows } = await query(isEmailExists, [email])
  return rows[0]
}
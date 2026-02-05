import { query } from "../../db";
import { SignupSchema } from "../../utils/validations/signupSchema";

type SignupInput = Omit<SignupSchema,'confirmPassword'>
export const create = async (userData : SignupInput) => {
  const { username, password, email, age, gender } = userData
  const sql = `
        INSERT INTO users (username, password_hash, email, age, gender)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id, username, email, created_at;
    `
  const values = [username, password, email, age, gender]
  const { rows } = await query(sql, values)
  console.log(query)
  return rows[0]
}
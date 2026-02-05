import { query } from "../../db";
import { CREATE_USER } from "../../db/Queries/queries";
import { User } from "../../types/user";
import { SignupSchema } from "../../utils/validations/signupSchema";

type SignupInput = Omit<SignupSchema,'confirmPassword'>
export const create = async (userData : SignupInput):Promise<User | null> => {
  const { username, password, email, age, gender } = userData
  
  const values = [username, password, email, age, gender]
  const { rows } = await query(CREATE_USER, values)
  console.log(query)
  return rows[0]
}
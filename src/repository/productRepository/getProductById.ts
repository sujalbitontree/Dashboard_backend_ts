import { query } from '../../db'
import { GET_PRODUCT_BY_ID } from '../../db/Queries/productQuery'

export const getProductById = async (id: number) => {
  return await query(GET_PRODUCT_BY_ID, [id])
}

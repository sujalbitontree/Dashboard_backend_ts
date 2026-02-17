import { getProductById } from '../../repository/productRepository/getProductById'

export const getProduct = async (id: number) => {
  const product = await getProductById(id)
  return product
}

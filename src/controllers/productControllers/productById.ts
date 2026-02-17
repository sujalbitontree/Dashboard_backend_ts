import { Request, Response } from 'express'
import { getProduct } from '../../services/productsServices/getProduct'

export const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const product = await getProduct(Number(id))

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      })
    }

    return res.status(200).json({
      success: true,
      product,
    })
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error' })
  }
}

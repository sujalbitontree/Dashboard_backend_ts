import express from 'express'
import { getProducts } from '../../controllers/productControllers/products'
import { getProductById } from '../../controllers/productControllers/productById'
import { authenticate } from '../../middleware/authentication'

const productRouter = express.Router()

productRouter.get('/products', authenticate, getProducts)
productRouter.get('/products/:id', authenticate, getProductById)

export default productRouter

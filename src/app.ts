import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import router from './routes/userRoutes/router'
import dotenv from 'dotenv'
import productRouter from './routes/productRoutes/productRoutes'
dotenv.config()
const app = express()

app.use(cors({
    origin : process.env.URL,
    credentials: true,
}))
app.use(cookieParser())
app.use(express.json())
app.use('/api/v1',router)
app.use('/api/v1',productRouter)

export default app

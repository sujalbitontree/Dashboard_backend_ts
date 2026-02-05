import express from 'express'
import cors from 'cors'
import router from './routes/userRoutes/router'
import dotenv from 'dotenv'
dotenv.config()
const app = express()

app.use(cors({
    origin : process.env.URL,
    credentials: true,
}))
app.use(express.json())
app.use('/api/v1/auth',router)

export default app

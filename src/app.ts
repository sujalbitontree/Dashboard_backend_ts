import express from 'express'
import cors from 'cors'
import router from './routes/userRoutes/router'
const app = express()

app.use(cors())
app.use(express.json())
app.use('/api/v1/auth',router)

export default app

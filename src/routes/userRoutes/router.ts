import express from 'express'
import { signup } from '../../controllers/userController/signup';

const router = express.Router()

router.post('/signup', signup);
export default router
import express from 'express'
import { signup } from '../../controllers/userController/signup';
import { signin } from '../../controllers/userController/signin';

const router = express.Router()

router.post('/signup', signup);
router.post('/signin',signin)
export default router
import express from 'express'
import { signup } from '../../controllers/userController/signup';
import { signin } from '../../controllers/userController/signin';
import { forgotpassword } from '../../controllers/userController/forgotPassword';
import { resetpassword } from '../../controllers/userController/resetPassword';
import { refresh } from '../../controllers/userController/refreshToken';

const router = express.Router()

router.post('/signup', signup);
router.post('/signin',signin)
router.post('/forgot-password',forgotpassword)
router.post('/reset-password/:token',resetpassword)
router.post('/refresh',refresh)
export default router
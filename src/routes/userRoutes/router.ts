import express from 'express'
import { signup } from '../../controllers/userController/signup'
import { signin } from '../../controllers/userController/signin'
import { forgotpassword } from '../../controllers/userController/forgotPassword'
import { resetpassword } from '../../controllers/userController/resetPassword'
import { refresh } from '../../controllers/userController/refreshToken'
import { updateUser } from '../../controllers/userController/updateUserData'
import { authenticate } from '../../middleware/authentication'
import { changePassword } from '../../controllers/userController/changePassword'
import { dashboard } from '../../controllers/userController/dashboard'
import { logout } from '../../controllers/userController/logout'

const router = express.Router()

router.post('/signup', signup)
router.post('/signin', signin)
router.post('/forgot-password', forgotpassword)
router.post('/reset-password/:token', resetpassword)
router.post('/refresh', refresh)
router.post('/edit-profile', authenticate, updateUser)
router.post('/change-password', authenticate, changePassword)
router.get('/dashboard', authenticate, dashboard)
router.post('/logout', authenticate, logout)

export default router

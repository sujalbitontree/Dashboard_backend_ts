import { Request, Response } from 'express'
import { z } from 'zod'
import { passwordSchema } from '../../utils/validations/signupSchema'
import { resetPasswordSchema } from '../../utils/validations/resetPasswordSchema'
import { resetPassword } from '../../services/userServices/resetPassowrd'

interface ResetPasswordParams {
  token: string
}

interface ResetPasswordBody {
  password: string
}

export const resetpassword = async (
  req: Request<ResetPasswordParams, {}, ResetPasswordBody>,
  res: Response
): Promise<Response> => {
  const result = resetPasswordSchema.safeParse(req.body)

  if (!result.success) {
    return res.status(400).json({
      success: false,
      message: result.error.issues[0].message,
    })
  }

  try {
    const { token } = req.params
    const { password } = req.body

    const userData = {
      token,
      password,
    }

    await resetPassword(userData)

    return res.status(200).json({
      success: true,
      message: 'Password has been reset successfully. You can now log in.',
    })
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : 'An unexpected error occurred'

    return res.status(400).json({
      success: false,
      message: errorMessage,
    })
  }
}

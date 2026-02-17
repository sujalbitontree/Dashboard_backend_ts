import { Request, Response } from 'express'
import { z } from 'zod'
import { emailSchema } from '../../utils/validations/signupSchema'
import { forgotPassword } from '../../services/userServices/forgotPassword'


export const forgotpassword = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const result = emailSchema.safeParse(req.body.email)

  if (!result.success) {
    return res.status(400).json({
      success: false,
      message: result.error.issues[0].message,
    })
  }

  try {
    const email = result.data
    await forgotPassword(email)

    return res.status(200).json({
      success: true,
      message: 'Reset link sent to email',
    })
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : 'An unexpected error occurred'

    console.error(`Forgot Password Error:`, errorMessage)

    return res.status(400).json({
      success: false,
      message: errorMessage,
    })
  }
}

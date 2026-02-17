import { Request, Response } from 'express'
import { changePasswordSchema } from '../../utils/validations/changePassword'
import { updatePassword } from '../../services/userServices/updatePassword'

interface AuthenticatedRequest extends Request {
  user?: {
    id: number
  }
}

export const changePassword = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<Response> => {
  const result = changePasswordSchema.safeParse(req.body)

  if (!result.success) {
    return res.status(400).json({
      success: false,
      message: result.error.issues[0].message,
    })
  }

  try {
    const id = req.user?.id

    if (!id) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized: User ID missing',
      })
    }

    const { oldPassword, newPassword } = result.data

    await updatePassword({ id, oldPassword, newPassword })

    return res.status(200).json({
      success: true,
      message: 'Password changed Successfully',
    })
  } catch (error: unknown) {
   const errorMessage = error instanceof Error ? error.message : 'Internal Server Error';


    return res.status(400).json({
      success: false,
      message: errorMessage,
    });
  }
}

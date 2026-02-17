import { Request, Response } from 'express'
import { updateUserData } from '../../services/userServices/updateUserData'
import { updateUserSchema } from '../../utils/validations/updateUserSchema'

export const updateUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const result = updateUserSchema.safeParse(req.body)

  if (!result.success) {
    console.error(`Validation Error:`, result.error)
    return res.status(400).json({
      success: false,
      message: result.error.issues[0].message,
    })
  }

  try {
    const { id, username, age } = result.data

    await updateUserData({ id, username, age })

    return res.status(200).json({
      success: true,
      message: 'Data Updated Successfully',
    })
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : 'Internal Server Error'

    return res.status(404).json({
      success: false,
      message: errorMessage,
    })
  }
}

import { Request, Response } from 'express'
import { verifyToken } from '../../utils/tokens/tokens'
import { UserPayload } from '../../types/user'
import { getUser } from '../../services/userServices/getUser'
import dotenv from 'dotenv'
dotenv.config()

export const dashboard = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const header = req.headers.authorization

    if (!header || !header.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'No token provided',
      })
    }

    const token = header.split(' ')[1]

    const secret = process.env.ACCESS_SECRET as string

    const decoded = verifyToken(token, secret) as UserPayload

    if (!decoded || !decoded.id) {
      return res
        .status(401)
        .json({ success: false, message: 'Invalid token payload' })
    }
    const user = await getUser({ id: decoded.id })

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      })
    }

    return res.status(200).json({
      success: true,
      user,
    })
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : 'Internal Server Error'

    console.error(`Error in dashboard:`, error)

    return res.status(401).json({
      success: false,
      message: errorMessage,
    })
  }
}

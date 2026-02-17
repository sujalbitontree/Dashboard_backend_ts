import dotenv from 'dotenv'
dotenv.config()

import { Request, Response, NextFunction } from 'express'
import { verifyToken } from '../utils/tokens/tokens'
import { findByEmail } from '../repository/userRepository/checkEmail'
import {  UserPayload } from '../types/user'

interface AuthenticatedRequest extends Request {
  user?: UserPayload
}

export const authenticate = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const authHeader = req.headers.authorization
  const { refreshToken } = req.cookies

  if (!authHeader?.startsWith('Bearer ') || !refreshToken) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  const token = authHeader.split(' ')[1]

  try {
    const decoded = verifyToken(
      token,
      process.env.ACCESS_SECRET as string
    ) as UserPayload

    const decodedRefresh = verifyToken(
      refreshToken,
      process.env.REFRESH_SECRET as string
    ) as UserPayload

    

    const user = await findByEmail(decoded.email)
    if (!user) {
      return res.status(401).json({ message: 'User not found' })
    }

    req.user = decoded
    next()
  } catch (error) {
    res.clearCookie('refreshToken')
    return res
      .status(401)
      .json({ message: 'Session invalid. Please login again.' })
  }
}

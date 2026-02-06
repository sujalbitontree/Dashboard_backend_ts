import { Request, Response } from 'express';
import { generateToken, verifyToken } from '../../utils/tokens/tokens';
import { findByEmail } from '../../repository/userRepository/checkEmail';
import dotenv from 'dotenv'
dotenv.config()

interface TokenPayload {
  id: string;
  email: string;
}

export const refresh = async (req: Request, res: Response): Promise<Response> => {
  const refreshToken: string | undefined = req.cookies?.refreshToken;
  
  console.log(`refreshToken`, refreshToken);

  if (!refreshToken) {
    return res.status(401).json({ success: false, message: 'No refresh token' });
  }

  try {
    const decoded = verifyToken(refreshToken, process.env.REFRESH_SECRET!) as TokenPayload;
    
    const user = await findByEmail(decoded.email);

    if (!user) {
      throw new Error('Email not found');
    }

    const newAccessToken = generateToken(
      { id: user.id, email: user.email },
      process.env.ACCESS_SECRET!,
      '30m',
    );

    return res.json({ accessToken: newAccessToken });
  } catch (error) {
    return res.status(401).json({ 
      success: false,
      message: 'Invalid refresh token' 
    });
  }
};
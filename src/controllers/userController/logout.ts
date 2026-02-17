import { Request, Response } from 'express';


export const logout = async (req: Request, res: Response): Promise<Response> => {
  try {
    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: false, 
      sameSite: 'lax',
      path: '/',
    });

    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Logout failed";
    
    return res.status(500).json({
      success: false,
      message: errorMessage,
    });
  }
};
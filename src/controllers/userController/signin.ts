import { Request, Response } from 'express';
import { signinSchema } from '../../utils/validations/signinSchema';
import { loginUser } from '../../services/userServices/signin';

export const signin = async (
  req: Request,
  res: Response
): Promise<Response> => {
  
  const result = signinSchema.safeParse(req.body);

  if (!result.success) {
    const errorMessage = result.error.issues[0].message;
    
    return res.status(400).json({
      success: false,
      message: errorMessage,
    });
  }

  try {
   
    const {accessToken,refreshToken} = await loginUser(req.body);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    return res.status(200).json({
      success: true,
      message:"Sign in successful",
      data: { accessToken },
    })
  } catch (error: unknown) {
   const message = error instanceof Error ? error.message : "An unexpected error occurred";

  return res.status(404).json({
    success: false,
    message: message,
  })
  }
};
import { Request, Response } from 'express';
import { signupSchema } from '../../utils/validations/signupSchema';
import { registerUser } from '../../services/userServices/signup';
export const signup = async (
  req: Request,
  res: Response
): Promise<Response> => {
  
  const result = signupSchema.safeParse(req.body);

  if (!result.success) {
    const errorMessage = result.error.issues[0].message;
    
    return res.status(400).json({
      success: false,
      message: errorMessage,
    });
  }

  try {
   
    const user = await registerUser(result.data);

    return res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: user,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "An unexpected error occurred";

  return res.status(400).json({
    success: false,
    message: message,
  })
  }
};
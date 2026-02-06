import { findByEmail } from "../../repository/userRepository/checkEmail"
import { updateResetToken } from "../../repository/userRepository/updateResetToken";
import { resetPasswordToken } from "../../utils/crypto/crypto";
import { sendEmail } from "../../utils/nodemailer/mailFormat";
import dotenv from 'dotenv'
dotenv.config()
export const forgotPassword = async(email:string):Promise<void>=>{

  const user = await findByEmail(email)
  if(!user){
   
   throw new Error('Unauthorized User')
  }

    const { hashedToken, expiry, resetToken } = resetPasswordToken();
      await updateResetToken(user.id,hashedToken,expiry)

  const resetUrl = `${process.env.RESET_URL}/${resetToken}`
  const message = `Follow this link to reset your password: ${resetUrl}`


 await sendEmail({
    email: user.email,
    subject: 'Password Reset Request',
    message,
    resetUrl
  });
}
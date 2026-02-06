import crypto from 'crypto'

interface ResetTokenData{
    hashedToken : string,
    expiry: Date;
  resetToken: string;
}

export const getHashedToken = (token: string | number): string => {
  const dataToHash = String(token);
  return crypto.createHash('sha256').update(dataToHash).digest('hex');
};

export const resetPasswordToken = (): ResetTokenData => {
  const resetToken = crypto.randomBytes(32).toString('hex');

  const hashed = getHashedToken(resetToken);

  const expiry = new Date(Date.now() + 5 * 60 * 1000);

  return {
    hashedToken: hashed,
    expiry,
    resetToken
  };
};
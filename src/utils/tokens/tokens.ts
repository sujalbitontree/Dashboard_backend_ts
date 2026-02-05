import jwt, { SignOptions } from 'jsonwebtoken';
export const generateToken =  (payload : Object,privateKey:string,expiresIn:SignOptions['expiresIn']):string=>{
    return jwt.sign(payload,privateKey,{expiresIn})
    
}

export const verifyToken = (token:string,privateKey:string)=>{
    return jwt.verify(token,privateKey)
}
export interface User{
    id : Number
    username : string,
    email : string,
    password_hash : string,
    created_at:Date,
    age? : Number,
    gender? : string,
    reset_password_expiry : string ,
    reset_password_token : string,
   

}

export interface UserPayload {
  email: string;
  id: number;
}



export interface ChangePasswordInput {
  id: number;
  oldPassword: string;
  newPassword: string;
}

export interface ResetUserData {
  token: string | number
  password: string
}

export interface ResetResponse {
  success: boolean
}

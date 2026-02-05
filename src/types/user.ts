export interface User{
    id : Number
    username : string,
    email : string,
    password_hash : string,
    created_at:Date,
    age? : Number,
    gender? : string
}
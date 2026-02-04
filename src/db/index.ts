import { Pool } from "pg";
import dotenv from 'dotenv'
dotenv.config()

export const pool = new Pool({
    connectionString : process.env.DB_URL
})

pool.on("connect",()=>{
    console.log(`Database Connected`);
})

pool.on("error",(err)=>{
    console.log(`Database Connection error ${err}`);
    process.exit(-1)
})
export const FIND_BY_EMAIL = `SELECT * FROM users WHERE email = $1`

export const CREATE_USER =  `
        INSERT INTO users (username, password_hash, email, age, gender)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id, username, email, created_at;
    `

export const FIND_BY_ID = `SELECT * FROM users WHERE id = $1`

export const FIND_USER_BY_RESET_TOKEN = 
              `SELECT id, password_hash, reset_password_expiry 
               FROM users 
               WHERE reset_password_token = $1`


export const UPDATE_RESET_TOKEN =  `
        UPDATE users 
        SET reset_password_token = $2, reset_password_expiry = $3 
        WHERE id = $1
    `

export const COMPLETE_PASSWORD_RESET = 
`
        UPDATE users 
        SET password_hash = $1, 
            reset_password_token = NULL, 
            reset_password_expiry = NULL 
        WHERE id = $2
    `
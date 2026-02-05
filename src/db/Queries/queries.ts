export const FIND_BY_EMAIL = `SELECT * FROM users WHERE email = $1`

export const CREATE_USER =  `
        INSERT INTO users (username, password_hash, email, age, gender)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id, username, email, created_at;
    `
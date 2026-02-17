import { Client } from 'pg'
import fs from 'fs'
import path from 'path'
import dotenv from 'dotenv'
import { Product } from '../types/products'
dotenv.config()
const DB_URL = process.env.DB_URL

async function runMigration() {
  const client = new Client({
    connectionString: DB_URL,
  })

  try {
    await client.connect()
    console.log('Connected to PostgreSQL using URL.')

    const createTableQuery = `
            CREATE TABLE IF NOT EXISTS products (
                id INTEGER PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                description TEXT,
                price NUMERIC(10, 2),
                discount_percentage NUMERIC(5, 2),
                quantity INTEGER,
                category VARCHAR(100),
                brand VARCHAR(100),
                rating NUMERIC(3, 2),
                thumbnail TEXT,
                created_at TIMESTAMP WITH TIME ZONE
            );
        `
    await client.query(createTableQuery)

    const jsonPath = path.join(__dirname, '..', 'Data', 'products.json')

    const data: Product[] = JSON.parse(fs.readFileSync(jsonPath, 'utf8'))

    const insertQuery = `
            INSERT INTO products (
                id, title, description, price, discount_percentage, 
                quantity, category, brand, rating, thumbnail, created_at
            ) VALUES (
                $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11
            )
            ON CONFLICT (id) DO UPDATE SET
                title = EXCLUDED.title,
                description = EXCLUDED.description,
                price = EXCLUDED.price,
                quantity = EXCLUDED.quantity;
        `

    for (const p of data) {
      const values = [
        p.id,
        p.title,
        p.description,
        p.price,
        p.discountPercentage,
        p.quantity,
        p.category,
        p.brand,
        p.rating,
        p.thumbnail,
        p.createdAt,
      ]
      await client.query(insertQuery, values)
    }

    console.log(`Success: ${data.length} products synced.`)
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error('Migration error:', err.message)
    } else {
      console.error('An unknown error occurred:', err)
    }
  } finally {
    await client.end()
  }
}

runMigration()

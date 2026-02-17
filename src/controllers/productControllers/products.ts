import { Request, Response } from 'express'
import pool from '../../db'

export const getProducts = async (req: Request, res: Response) => {
  try {
    const { category, brand, minPrice, maxPrice, search } = req.query

    const page = parseInt(req.query.page as string) || 1
    const limit = parseInt(req.query.limit as string) || 6
    const offset = (page - 1) * limit

    let queryText = 'SELECT * FROM products WHERE 1=1'
    const queryParams: any[] = []

    if (category) {
      queryParams.push(category)
      queryText += ` AND category = $${queryParams.length}`
    }

    if (brand) {
      queryParams.push((brand as string).toLowerCase())
      queryText += ` AND LOWER(brand) = $${queryParams.length}`
    }

    if (minPrice) {
      queryParams.push(minPrice)
      queryText += ` AND price >= $${queryParams.length}`
    }

    if (maxPrice) {
      queryParams.push(maxPrice)
      queryText += ` AND price <= $${queryParams.length}`
    }

    if (search) {
      queryParams.push(`%${search}%`)
      queryText += ` AND title ILIKE $${queryParams.length}`
    }

    queryText += ` ORDER BY id ASC`

    queryParams.push(limit)
    queryText += ` LIMIT $${queryParams.length}`

    queryParams.push(offset)
    queryText += ` OFFSET $${queryParams.length}`

    const result = await pool.query(queryText, queryParams)

    res.status(200).json({
      success: true,
      count: result.rows.length,
      data: result.rows,
    })
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server Error' })
  }
}

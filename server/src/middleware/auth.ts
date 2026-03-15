import type { Request, Response, NextFunction } from 'express'
import { verifyAccessToken } from '../utils/jwt'

export function authMiddleware(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization
  if (!authHeader?.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Unauthorized' })
    return
  }

  const token = authHeader.slice(7)
  try {
    const { userId } = verifyAccessToken(token)
    req.userId = userId
    next()
  } catch {
    res.status(401).json({ message: 'Invalid or expired token' })
  }
}

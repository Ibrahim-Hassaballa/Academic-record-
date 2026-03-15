import type { Request, Response } from 'express'
import { findUser, users } from '../data/users'
import { findStudent } from '../data/students'
import { signAccessToken, signTempToken, verifyTempToken } from '../utils/jwt'

export function login(req: Request, res: Response): void {
  const { username, password } = req.body as { username: string; password: string }

  if (!username || !password) {
    res.status(400).json({ message: 'Username and password are required' })
    return
  }

  const user = findUser(username)
  if (!user || user.password !== password) {
    res.status(401).json({ message: 'Invalid username or password' })
    return
  }

  const tempToken = signTempToken(user.id)
  res.json({ tempToken, requires2FA: true })
}

export function verify2FA(req: Request, res: Response): void {
  const { tempToken, code } = req.body as { tempToken: string; code: string }

  if (!tempToken || !code) {
    res.status(400).json({ message: 'Token and code are required' })
    return
  }

  let userId: string
  try {
    const payload = verifyTempToken(tempToken)
    userId = payload.userId
  } catch {
    res.status(401).json({ message: 'Invalid or expired session. Please login again.' })
    return
  }

  const found = users.find((u) => u.id === userId)
  if (!found || found.twoFACode !== code) {
    res.status(401).json({ message: 'Invalid verification code' })
    return
  }

  const student = findStudent(found.studentId)
  if (!student) {
    res.status(404).json({ message: 'Student not found' })
    return
  }

  const accessToken = signAccessToken(userId)
  res.json({ accessToken, student })
}

import jwt from 'jsonwebtoken'

const SECRET = process.env.JWT_SECRET || 'ksu-dev-secret-2026'
const TEMP_SECRET = process.env.JWT_TEMP_SECRET || 'ksu-temp-secret-2026'

export function signAccessToken(userId: string): string {
  return jwt.sign({ userId, type: 'access' }, SECRET, { expiresIn: '24h' })
}

export function signTempToken(userId: string): string {
  return jwt.sign({ userId, type: 'temp' }, TEMP_SECRET, { expiresIn: '5m' })
}

export function verifyAccessToken(token: string): { userId: string } {
  const payload = jwt.verify(token, SECRET) as { userId: string; type: string }
  if (payload.type !== 'access') throw new Error('Invalid token type')
  return { userId: payload.userId }
}

export function verifyTempToken(token: string): { userId: string } {
  const payload = jwt.verify(token, TEMP_SECRET) as { userId: string; type: string }
  if (payload.type !== 'temp') throw new Error('Invalid token type')
  return { userId: payload.userId }
}

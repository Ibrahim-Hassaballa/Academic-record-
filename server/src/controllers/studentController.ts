import type { Request, Response } from 'express'
import { users } from '../data/users'
import { findStudent } from '../data/students'
import { announcements } from '../data/announcements'

function getStudentByUserId(userId: string) {
  const user = users.find((u) => u.id === userId)
  if (!user) return null
  return findStudent(user.studentId)
}

export function getProfile(req: Request, res: Response): void {
  const student = getStudentByUserId(req.userId!)
  if (!student) {
    res.status(404).json({ message: 'Student not found' })
    return
  }
  res.json(student)
}

export function getAnnouncements(_req: Request, res: Response): void {
  res.json(announcements.sort((a, b) => {
    if (a.priority === 'high' && b.priority !== 'high') return -1
    if (b.priority === 'high' && a.priority !== 'high') return 1
    return b.date.localeCompare(a.date)
  }))
}

import type { Request, Response } from 'express'
import { users } from '../data/users'
import { getAllCourses, findCourse } from '../data/courses'
import { getEnrollments, isEnrolled, addEnrollment, removeEnrollment } from '../data/enrollments'
import { findStudent } from '../data/students'

function getStudentId(userId: string): string | null {
  const user = users.find((u) => u.id === userId)
  return user?.studentId ?? null
}

export function getCourses(req: Request, res: Response): void {
  const studentId = getStudentId(req.userId!)
  if (!studentId) {
    res.status(404).json({ message: 'Student not found' })
    return
  }

  const enrollments = getEnrollments(studentId)
  const enrolledIds = new Set(enrollments.map((e) => e.courseId))
  const student = findStudent(studentId)
  const passedIds = new Set(student?.passedCourseIds ?? [])

  const coursesWithEnrollment = getAllCourses().map((c) => ({
    ...c,
    isEnrolled: enrolledIds.has(c.id),
    isPassed: passedIds.has(c.id),
  }))

  res.json(coursesWithEnrollment)
}

export function registerCourse(req: Request, res: Response): void {
  const studentId = getStudentId(req.userId!)
  if (!studentId) {
    res.status(404).json({ message: 'Student not found' })
    return
  }

  const { courseId } = req.body as { courseId: string }
  if (!courseId) {
    res.status(400).json({ message: 'courseId is required' })
    return
  }

  const course = findCourse(courseId)
  if (!course) {
    res.status(404).json({ message: 'Course not found' })
    return
  }

  if (isEnrolled(studentId, courseId)) {
    res.status(409).json({ message: 'Already enrolled in this course' })
    return
  }

  if (course.seatsAvailable <= 0) {
    res.status(400).json({ message: 'No seats available' })
    return
  }

  addEnrollment(studentId, courseId)
  course.seatsAvailable -= 1

  res.json({ message: 'Course registered successfully' })
}

export function dropCourse(req: Request, res: Response): void {
  const studentId = getStudentId(req.userId!)
  if (!studentId) {
    res.status(404).json({ message: 'Student not found' })
    return
  }

  const { courseId } = req.params
  if (!isEnrolled(studentId, courseId)) {
    res.status(404).json({ message: 'Enrollment not found' })
    return
  }

  removeEnrollment(studentId, courseId)

  const course = findCourse(courseId)
  if (course) course.seatsAvailable += 1

  res.json({ message: 'Course dropped successfully' })
}

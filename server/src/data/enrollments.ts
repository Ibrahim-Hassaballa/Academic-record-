import type { Enrollment } from '../types'

// In-memory mutable enrollment store (resets on server restart)
const enrollments: Enrollment[] = [
  // Currently enrolled in semester 7 (الفصل الثاني 1447, started 18/1/2026)
  { studentId: 's1', courseId: 'p13', registeredAt: '2026-01-18T08:00:00Z' },
  { studentId: 's1', courseId: 'p14', registeredAt: '2026-01-18T08:05:00Z' },
]

export function getEnrollments(studentId: string): Enrollment[] {
  return enrollments.filter((e) => e.studentId === studentId)
}

export function isEnrolled(studentId: string, courseId: string): boolean {
  return enrollments.some((e) => e.studentId === studentId && e.courseId === courseId)
}

export function addEnrollment(studentId: string, courseId: string): Enrollment {
  const enrollment: Enrollment = {
    studentId,
    courseId,
    registeredAt: new Date().toISOString(),
  }
  enrollments.push(enrollment)
  return enrollment
}

export function removeEnrollment(studentId: string, courseId: string): boolean {
  const idx = enrollments.findIndex(
    (e) => e.studentId === studentId && e.courseId === courseId
  )
  if (idx === -1) return false
  enrollments.splice(idx, 1)
  return true
}

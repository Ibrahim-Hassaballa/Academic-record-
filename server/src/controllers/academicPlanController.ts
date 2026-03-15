import type { Request, Response } from 'express'
import { users } from '../data/users'
import { findStudent } from '../data/students'
import { semestersTemplate } from '../data/academicPlan'
import { getEnrollments } from '../data/enrollments'
import type { AcademicPlan, Semester, AcademicPlanCourse } from '../types'

export function getAcademicPlan(req: Request, res: Response): void {
  const user = users.find((u) => u.id === req.userId!)
  if (!user) {
    res.status(404).json({ message: 'User not found' })
    return
  }

  const student = findStudent(user.studentId)
  if (!student) {
    res.status(404).json({ message: 'Student not found' })
    return
  }

  const enrollments = getEnrollments(student.id)
  const enrolledIds = new Set(enrollments.map((e) => e.courseId))
  const passedIds = new Set(student.passedCourseIds)

  // Program requirement: 30 mandatory + 6 elective-1 + 6 elective-2 = 42 cr
  const totalCredits = 42
  let completedCredits = 0

  const semesters: Semester[] = semestersTemplate.map((sem) => {
    const courses: AcademicPlanCourse[] = sem.courses.map((course) => {
      let status: AcademicPlanCourse['status']
      if (passedIds.has(course.id)) {
        status = 'passed'
        if (course.type !== 'thesis') completedCredits += course.credits
      } else if (enrolledIds.has(course.id)) {
        status = 'enrolled'
      } else {
        status = 'remaining'
      }
      return { ...course, status }
    })
    return { ...sem, courses }
  })

  const plan: AcademicPlan = {
    programAr: 'ماجستير محاسبة عامة',
    programEn: "Master's in General Accounting",
    totalCredits,
    completedCredits,
    semesters,
  }

  res.json(plan)
}

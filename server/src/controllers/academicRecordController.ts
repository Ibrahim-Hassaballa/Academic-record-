import type { Request, Response } from 'express'
import { users } from '../data/users'
import { findStudent } from '../data/students'
import { semesterRecords } from '../data/academicRecord'
import { getEnrollments } from '../data/enrollments'
import { findCourse } from '../data/courses'
import type { AcademicRecord, SemesterRecord, GradeRecord } from '../types'

export function getAcademicRecord(req: Request, res: Response): void {
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

  const totalCreditsCompleted = semesterRecords.reduce(
    (sum, sem) => sum + sem.courses.reduce((s, c) => s + c.credits, 0),
    0
  )

  const weightedSum = semesterRecords.reduce(
    (sum, sem) => sum + sem.courses.reduce((s, c) => s + c.points * c.credits, 0),
    0
  )

  const cumulativeGpa = Math.round((weightedSum / totalCreditsCompleted) * 100) / 100

  // Build current in-progress semester from active enrollments
  const enrollments = getEnrollments(student.id)
  const allRecords: SemesterRecord[] = [...semesterRecords]

  if (enrollments.length > 0) {
    const inProgressCourses: GradeRecord[] = enrollments
      .map((e) => findCourse(e.courseId))
      .filter((c): c is NonNullable<typeof c> => c !== undefined)
      .map((c) => ({
        courseId: c.id,
        codeAr: c.codeAr,
        codeEn: c.codeEn,
        nameAr: c.nameAr,
        nameEn: c.nameEn,
        credits: c.credits,
        grade: '–',
        gradeAr: '–',
        points: 0,
        score: 0,
        inProgress: true,
      }))

    allRecords.push({
      semesterNameAr: student.levelAr,
      semesterNameEn: student.levelEn,
      dateHijri: '29/7/1447هـ',
      dateGregorian: '18/1/2026م',
      semesterGpa: 0,
      inProgress: true,
      courses: inProgressCourses,
    })
  }

  const record: AcademicRecord = {
    studentNumber: student.studentNumber,
    nameAr: student.nameAr,
    nameEn: student.nameEn,
    programAr: student.departmentAr,
    programEn: student.departmentEn,
    semesterRecords: allRecords,
    cumulativeGpa,
    totalCreditsCompleted,
    scale: 5,
  }

  res.json(record)
}

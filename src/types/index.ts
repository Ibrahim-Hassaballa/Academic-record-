export interface Student {
  id: string
  nameAr: string
  nameEn: string
  studentNumber: string
  departmentAr: string
  departmentEn: string
  levelAr: string
  levelEn: string
  email: string
  photoUrl?: string
  gpa: GPA
  passedCourseIds: string[]
}

export interface GPA {
  cumulative: number
  semester: number
  scale: number
}

export interface Course {
  id: string
  codeAr: string
  codeEn: string
  nameAr: string
  nameEn: string
  credits: number
  instructorAr: string
  instructorEn: string
  schedule: string
  seats: number
  seatsAvailable: number
  semester: string
}

export interface CourseWithEnrollment extends Course {
  isEnrolled: boolean
  isPassed: boolean
}

export interface Enrollment {
  studentId: string
  courseId: string
  registeredAt: string
}

export type CourseStatus = 'passed' | 'enrolled' | 'remaining'

export interface AcademicPlanCourse {
  id: string
  codeAr: string
  codeEn: string
  nameAr: string
  nameEn: string
  credits: number
  prerequisites: string[]
  status: CourseStatus
  type: 'mandatory' | 'elective1' | 'elective2' | 'thesis'
}

export interface Semester {
  number: number
  nameAr: string
  nameEn: string
  courses: AcademicPlanCourse[]
}

export interface AcademicPlan {
  programAr: string
  programEn: string
  totalCredits: number
  completedCredits: number
  semesters: Semester[]
}

export interface GradeRecord {
  courseId: string
  codeAr: string
  codeEn: string
  nameAr: string
  nameEn: string
  credits: number
  grade: string
  gradeAr: string
  points: number
  score: number
  inProgress?: boolean
}

export interface SemesterRecord {
  semesterNameAr: string
  semesterNameEn: string
  semesterGpa: number
  courses: GradeRecord[]
  dateHijri: string
  dateGregorian: string
  inProgress?: boolean
}

export interface AcademicRecord {
  studentNumber: string
  nameAr: string
  nameEn: string
  programAr: string
  programEn: string
  semesterRecords: SemesterRecord[]
  cumulativeGpa: number
  totalCreditsCompleted: number
  scale: number
}

export interface Announcement {
  id: string
  titleAr: string
  titleEn: string
  bodyAr: string
  bodyEn: string
  date: string
  priority: 'high' | 'normal'
}

export interface LoginPayload {
  username: string
  password: string
}

export interface TwoFAPayload {
  tempToken: string
  code: string
}

export interface AuthResponse {
  accessToken: string
  student: Student
}

export interface TempTokenResponse {
  tempToken: string
  requires2FA: boolean
}

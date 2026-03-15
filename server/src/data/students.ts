import type { Student } from '../types'

export const students: Student[] = [
  {
    id: 's1',
    nameAr: 'تغريد عيد العطوي',
    nameEn: 'Taghrid Eid Al-Atwi',
    studentNumber: '45123456',
    departmentAr: 'ماجستير محاسبة عامة',
    departmentEn: "Master's in General Accounting",
    levelAr: 'الفصل الدراسي الثاني 1447 | 29/7/1447هـ – 18/1/2026م',
    levelEn: 'Semester 2 – 1447H | 29/7/1447H – 18/1/2026',
    email: '45123456@student.ksu.edu.sa',
    gpa: {
      cumulative: 4.25,
      semester: 4.50,
      scale: 5,
    },
    passedCourseIds: ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8', 'p9', 'p10', 'p11', 'p12'],
  },
]

export function findStudent(id: string): Student | undefined {
  return students.find((s) => s.id === id)
}

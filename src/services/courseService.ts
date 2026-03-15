import { api } from './api'
import type { CourseWithEnrollment } from '../types'

export const courseService = {
  getCourses: () => api.get<CourseWithEnrollment[]>('/api/courses'),
  register: (courseId: string) => api.post<{ message: string }>('/api/courses/register', { courseId }),
  drop: (courseId: string) => api.delete<{ message: string }>(`/api/courses/drop/${courseId}`),
}

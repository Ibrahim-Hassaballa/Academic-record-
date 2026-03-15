import { api } from './api'
import type { Student, Announcement } from '../types'

export const studentService = {
  getProfile: () => api.get<Student>('/api/student/profile'),
  getAnnouncements: () => api.get<Announcement[]>('/api/student/announcements'),
}

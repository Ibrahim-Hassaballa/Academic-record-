import { api } from './api'
import type { AcademicPlan } from '../types'

export const academicPlanService = {
  getAcademicPlan: () => api.get<AcademicPlan>('/api/academic-plan'),
}

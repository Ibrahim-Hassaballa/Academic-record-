import { api } from './api'
import type { AcademicRecord } from '../types'

export async function fetchAcademicRecord(): Promise<AcademicRecord> {
  return api.get<AcademicRecord>('/api/academic-record')
}

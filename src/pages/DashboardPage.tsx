import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../contexts/AuthContext'
import { studentService } from '../services/studentService'
import { courseService } from '../services/courseService'
import StudentInfoCard from '../components/dashboard/StudentInfoCard'
import GPACard from '../components/dashboard/GPACard'
import EnrolledCoursesCard from '../components/dashboard/EnrolledCoursesCard'
import AnnouncementsCard from '../components/dashboard/AnnouncementsCard'
import Spinner from '../components/ui/Spinner'
import Alert from '../components/ui/Alert'
import type { Announcement, CourseWithEnrollment } from '../types'

export default function DashboardPage() {
  const { t, i18n } = useTranslation()
  const { user } = useAuth()
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [courses, setCourses] = useState<CourseWithEnrollment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    Promise.all([studentService.getAnnouncements(), courseService.getCourses()])
      .then(([ann, crs]) => {
        setAnnouncements(ann)
        setCourses(crs)
      })
      .catch(() => setError(t('common.error')))
      .finally(() => setLoading(false))
  }, [t])

  const displayName = i18n.language === 'ar' ? user?.nameAr : user?.nameEn

  if (loading) return <Spinner />

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Welcome banner */}
      <div className="bg-gradient-to-r from-[#29beff] to-ksu-blue rounded-xl p-6 text-white">
        <h1 className="text-2xl font-bold">{t('dashboard.welcome')}، {displayName}</h1>
        <p className="text-blue-200 text-sm mt-1">
          {i18n.language === 'ar' ? user?.departmentAr : user?.departmentEn} —{' '}
          {i18n.language === 'ar' ? user?.levelAr : user?.levelEn}
        </p>
      </div>

      {error && <Alert type="error" message={error} onClose={() => setError('')} />}

      {user && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <StudentInfoCard student={user} />
            <GPACard gpa={user.gpa} />
          </div>
          <div className="space-y-6">
            <EnrolledCoursesCard courses={courses} />
            <AnnouncementsCard announcements={announcements} />
          </div>
        </div>
      )}
    </div>
  )
}

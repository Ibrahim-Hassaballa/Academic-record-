import { useTranslation } from 'react-i18next'
import Card from '../ui/Card'
import type { CourseWithEnrollment } from '../../types'

export default function EnrolledCoursesCard({ courses }: { courses: CourseWithEnrollment[] }) {
  const { t, i18n } = useTranslation()
  const isAr = i18n.language === 'ar'
  const enrolled = courses.filter((c) => c.isEnrolled)

  return (
    <Card title={t('dashboard.enrolled_courses')}>
      {enrolled.length === 0 ? (
        <p className="text-sm text-gray-400 text-center py-4">{t('dashboard.no_courses')}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-start py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  {t('dashboard.course_name')}
                </th>
                <th className="text-start py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  {t('dashboard.credits')}
                </th>
                <th className="text-start py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden sm:table-cell">
                  {t('dashboard.schedule')}
                </th>
              </tr>
            </thead>
            <tbody>
              {enrolled.map((c) => (
                <tr key={c.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="py-2.5 font-medium text-gray-800">
                    {isAr ? c.nameAr : c.nameEn}
                  </td>
                  <td className="py-2.5 text-gray-600">{c.credits}</td>
                  <td className="py-2.5 text-gray-500 hidden sm:table-cell">{c.schedule}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  )
}

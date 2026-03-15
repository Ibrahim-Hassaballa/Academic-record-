import { useTranslation } from 'react-i18next'
import Card from '../ui/Card'
import type { Student } from '../../types'

export default function StudentInfoCard({ student }: { student: Student }) {
  const { t, i18n } = useTranslation()
  const isAr = i18n.language === 'ar'

  const name = isAr ? student.nameAr : student.nameEn
  const dept = isAr ? student.departmentAr : student.departmentEn
  const level = isAr ? student.levelAr : student.levelEn

  return (
    <Card title={t('dashboard.student_info')}>
      <div className="flex items-center gap-4 mb-4">
        <div className="w-16 h-16 rounded-full bg-ksu-blue flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
          {name.charAt(0)}
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-900">{name}</h2>
          <p className="text-sm text-gray-500">{dept}</p>
        </div>
      </div>
      <div className="space-y-3">
        <InfoRow label={t('dashboard.student_id')} value={student.studentNumber} ltr />
        <InfoRow label={t('dashboard.level')} value={level} />
        <InfoRow label={t('dashboard.email')} value={student.email} ltr />
      </div>
    </Card>
  )
}

function InfoRow({ label, value, ltr = false }: { label: string; value: string; ltr?: boolean }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
      <span className="text-sm text-gray-500">{label}</span>
      <span className="text-sm font-medium text-gray-800" dir={ltr ? 'ltr' : undefined}>{value}</span>
    </div>
  )
}

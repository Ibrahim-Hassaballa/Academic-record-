import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { academicPlanService } from '../services/academicPlanService'
import Badge from '../components/ui/Badge'
import Spinner from '../components/ui/Spinner'
import Alert from '../components/ui/Alert'
import type { AcademicPlan, AcademicPlanCourse } from '../types'

const typeLabel = {
  mandatory: { ar: 'إلزامي', en: 'Mandatory' },
  elective1: { ar: 'اختياري 1', en: 'Elective 1' },
  elective2: { ar: 'اختياري 2', en: 'Elective 2' },
  thesis: { ar: 'رسالة', en: 'Thesis' },
}

const typeColor = {
  mandatory: 'bg-blue-50 text-blue-700 border-blue-200 border',
  elective1: 'bg-purple-50 text-purple-700 border-purple-200 border',
  elective2: 'bg-indigo-50 text-indigo-700 border-indigo-200 border',
  thesis: 'bg-amber-50 text-amber-700 border-amber-200 border',
}

function CourseCard({ course, isAr, statusLabel }: {
  course: AcademicPlanCourse
  isAr: boolean
  statusLabel: string
}) {
  return (
    <div className={`rounded-xl border p-4 transition-all
      ${course.status === 'passed' ? 'bg-emerald-50 border-emerald-200' :
        course.status === 'enrolled' ? 'bg-amber-50 border-amber-200' :
          'bg-white border-gray-200'}`}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <span className="text-xs font-mono text-gray-400">
          {isAr ? course.codeAr : course.codeEn}
        </span>
        <Badge status={course.status} label={statusLabel} />
      </div>
      <h4 className="text-sm font-semibold text-gray-800 leading-snug mb-3">
        {isAr ? course.nameAr : course.nameEn}
      </h4>
      <div className="flex items-center justify-between">
        <span className={`text-xs px-2 py-0.5 rounded-full ${typeColor[course.type]}`}>
          {isAr ? typeLabel[course.type].ar : typeLabel[course.type].en}
        </span>
        <span className="text-xs text-gray-500 font-medium">
          {course.credits} {isAr ? 'ساعة' : 'cr.'}
        </span>
      </div>
    </div>
  )
}

export default function AcademicPlanPage() {
  const { t, i18n } = useTranslation()
  const isAr = i18n.language === 'ar'
  const [plan, setPlan] = useState<AcademicPlan | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    academicPlanService.getAcademicPlan()
      .then(setPlan)
      .catch(() => setError(t('common.error')))
      .finally(() => setLoading(false))
  }, [t])

  if (loading) return <Spinner />

  if (!plan) return <Alert type="error" message={error || t('common.error')} />

  const progressPct = Math.round((plan.completedCredits / plan.totalCredits) * 100)

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">{t('plan.title')}</h1>
        <p className="text-gray-500 text-sm mt-1">
          {isAr ? plan.programAr : plan.programEn}
        </p>
      </div>

      {error && <Alert type="error" message={error} onClose={() => setError('')} />}

      {/* Summary bar */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-6">
          <StatBox label={t('plan.total_credits')} value={plan.totalCredits} color="text-gray-800" />
          <StatBox label={t('plan.completed_credits')} value={plan.completedCredits} color="text-ksu-blue" />
          <StatBox label={t('plan.remaining_credits')} value={plan.totalCredits - plan.completedCredits} color="text-gray-500" />
          <StatBox label={t('plan.progress')} value={`${progressPct}%`} color="text-ksu-gold" />
        </div>
        <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-ksu-blue rounded-full transition-all duration-700"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      {/* Semesters */}
      {plan.semesters.map((semester) => (
        <div key={semester.number} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 bg-ksu-blue text-white">
            <h3 className="font-semibold">{isAr ? semester.nameAr : semester.nameEn}</h3>
            <p className="text-blue-200 text-xs mt-0.5">
              {semester.courses.reduce((s, c) => s + c.credits, 0)}{' '}
              {isAr ? 'ساعة' : 'cr'} &mdash; {semester.courses.length}{' '}
              {isAr ? 'مقررات' : 'courses'}
            </p>
          </div>
          <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {semester.courses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                isAr={isAr}
                statusLabel={t(`status.${course.status}`)}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function StatBox({ label, value, color }: { label: string; value: number | string; color: string }) {
  return (
    <div className="text-center">
      <div className={`text-3xl font-bold ${color}`}>{value}</div>
      <div className="text-xs text-gray-500 mt-1">{label}</div>
    </div>
  )
}

import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLanguage } from '../contexts/LanguageContext'
import { fetchAcademicRecord } from '../services/academicRecordService'
import type { AcademicRecord, SemesterRecord } from '../types'

const gradeColor: Record<string, string> = {
  'A+': 'text-emerald-700 bg-emerald-50',
  A:   'text-emerald-700 bg-emerald-50',
  'A-': 'text-emerald-600 bg-emerald-50',
  'B+': 'text-blue-700 bg-blue-50',
  B:   'text-blue-700 bg-blue-50',
  'B-': 'text-blue-600 bg-blue-50',
  'C+': 'text-amber-700 bg-amber-50',
  C:   'text-amber-700 bg-amber-50',
  'C-': 'text-amber-600 bg-amber-50',
  D:   'text-orange-700 bg-orange-50',
  F:   'text-red-700 bg-red-50',
}

function GpaRing({ gpa, scale, label }: { gpa: number; scale: number; label: string }) {
  const pct = gpa / scale
  const r = 32
  const circ = 2 * Math.PI * r
  const dash = circ * pct
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative w-20 h-20">
        <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
          <circle cx="40" cy="40" r={r} fill="none" stroke="#e5e7eb" strokeWidth="8" />
          <circle
            cx="40" cy="40" r={r} fill="none"
            stroke="#0084bd" strokeWidth="8"
            strokeDasharray={`${dash} ${circ}`}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-lg font-bold text-gray-900 leading-none">{gpa.toFixed(2)}</span>
          <span className="text-[10px] text-gray-500">/ {scale}</span>
        </div>
      </div>
      <span className="text-xs text-gray-500 text-center">{label}</span>
    </div>
  )
}

function SemesterTable({ sem, isAr }: { sem: SemesterRecord; isAr: boolean }) {
  const { t } = useTranslation()
  const name = isAr ? sem.semesterNameAr : sem.semesterNameEn
  const totalCredits = sem.courses.reduce((s, c) => s + c.credits, 0)
  const accentColor = sem.inProgress ? 'border-s-amber-400' : 'border-s-ksu-blue'

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Semester header */}
      <div className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5 px-5 py-3.5 bg-gray-50 border-b border-gray-100 border-s-[3px] ${accentColor}`}>
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold text-gray-800">{name}</h3>
            {sem.inProgress && (
              <span className="text-[10px] font-semibold bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">
                {isAr ? 'قيد الدراسة' : 'In Progress'}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 mt-0.5 flex-wrap">
            <span className="text-xs text-gray-500" dir="ltr">{sem.dateHijri}</span>
            <span className="text-gray-300 text-xs">|</span>
            <span className="text-xs text-gray-500" dir="ltr">{sem.dateGregorian}</span>
            <span className="text-gray-300 text-xs">·</span>
            <span className="text-xs text-ksu-blue font-medium">
              {totalCredits} {isAr ? 'ساعات' : 'cr.'}
            </span>
          </div>
        </div>
        {!sem.inProgress && (
          <div className="flex items-center gap-1.5 text-xs text-gray-500 shrink-0">
            <span>{t('record.semester_gpa')}:</span>
            <span className="font-semibold text-ksu-blue">{sem.semesterGpa.toFixed(2)}</span>
            <span className="text-gray-400">/ {t('record.scale_5')}</span>
          </div>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-xs text-gray-500 uppercase tracking-wide bg-gray-50/50">
              <th className="px-5 py-2.5 text-start font-medium">{t('record.course_code')}</th>
              <th className="px-5 py-2.5 text-start font-medium">{t('record.course_name')}</th>
              <th className="px-5 py-2.5 text-center font-medium">{t('record.credits')}</th>
              <th className="px-5 py-2.5 text-center font-medium">{t('record.score')}</th>
              <th className="px-5 py-2.5 text-center font-medium">{t('record.grade')}</th>
              <th className="px-5 py-2.5 text-center font-medium">{t('record.points')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {sem.courses.map((c) => (
              <tr key={c.courseId} className="hover:bg-gray-50/60 transition-colors">
                <td className="px-5 py-3 font-mono text-xs text-gray-600 whitespace-nowrap">
                  {isAr ? c.codeAr : c.codeEn}
                </td>
                <td className="px-5 py-3 text-gray-800 font-medium">
                  {isAr ? c.nameAr : c.nameEn}
                </td>
                <td className="px-5 py-3 text-center text-gray-600">{c.credits}</td>
                {c.inProgress ? (
                  <>
                    <td className="px-5 py-3 text-center">
                      <span className="text-xs text-amber-600 font-medium">–</span>
                    </td>
                    <td className="px-5 py-3 text-center">
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-700">
                        {isAr ? 'قيد الدراسة' : 'In Progress'}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-center">
                      <span className="text-xs text-amber-600 font-medium">–</span>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="px-5 py-3 text-center text-gray-700 font-medium">{c.score}%</td>
                    <td className="px-5 py-3 text-center">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold ${gradeColor[c.grade] ?? 'text-gray-700 bg-gray-100'}`}>
                        {isAr ? c.gradeAr : c.grade}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-center text-gray-700 font-medium">{c.points.toFixed(2)}</td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default function AcademicRecordPage() {
  const { t } = useTranslation()
  const { lang } = useLanguage()
  const isAr = lang === 'ar'

  const [record, setRecord] = useState<AcademicRecord | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    fetchAcademicRecord()
      .then(setRecord)
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-ksu-blue border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (error || !record) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-3 text-gray-500">
        <p>{t('common.error')}</p>
        <button
          onClick={() => { setError(false); setLoading(true); fetchAcademicRecord().then(setRecord).catch(() => setError(true)).finally(() => setLoading(false)) }}
          className="px-4 py-2 bg-ksu-blue text-white rounded-lg text-sm hover:bg-ksu-dark transition-colors"
        >
          {t('common.retry')}
        </button>
      </div>
    )
  }

  const name      = isAr ? record.nameAr    : record.nameEn
  const program   = isAr ? record.programAr : record.programEn

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Page heading */}
      <div>
        <h1 className="text-xl font-bold text-gray-900">{t('record.title')}</h1>
        <p className="text-sm text-gray-500 mt-0.5">{t('record.subtitle')}</p>
      </div>

      {/* Student summary card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 border-s-[3px] border-s-ksu-blue">
          <h2 className="text-sm font-semibold text-gray-700">{t('record.student_info')}</h2>
        </div>

        <div className="px-6 py-5 flex flex-col sm:flex-row sm:items-center gap-6">
          {/* Student details */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <InfoItem label={t('dashboard.student_id')} value={record.studentNumber} ltr />
            <InfoItem label={t('record.student_name')} value={name} />
            <InfoItem label={t('dashboard.department')} value={program} />
            <InfoItem label={t('record.total_credits')} value={`${record.totalCreditsCompleted} ${isAr ? 'ساعة' : 'cr.'}`} />
          </div>

          {/* GPA rings */}
          <div className="flex gap-6 sm:gap-8 shrink-0 justify-center">
            <GpaRing
              gpa={record.cumulativeGpa}
              scale={record.scale}
              label={t('dashboard.gpa')}
            />
          </div>
        </div>
      </div>

      {/* Semester records */}
      <div className="space-y-4">
        {record.semesterRecords.map((sem, i) => (
          <SemesterTable key={i} sem={sem} isAr={isAr} />
        ))}
      </div>

      {/* Grade legend */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 px-6 py-4">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
          {t('record.grade_legend')}
        </h3>
        <div className="flex flex-wrap gap-2">
          {[
            { grade: 'A+', range: '95–100', pts: '5.00' },
            { grade: 'A',  range: '90–94',  pts: '4.75' },
            { grade: 'B+', range: '85–89',  pts: '4.50' },
            { grade: 'B',  range: '80–84',  pts: '4.25' },
            { grade: 'C+', range: '75–79',  pts: '4.00' },
            { grade: 'C',  range: '70–74',  pts: '3.75' },
            { grade: 'D',  range: '60–69',  pts: '3.00' },
            { grade: 'F',  range: '< 60',   pts: '0.00' },
          ].map(({ grade, range, pts }) => (
            <div key={grade} className="flex items-center gap-1.5 text-xs text-gray-600 bg-gray-50 rounded-lg px-3 py-1.5">
              <span className={`font-bold px-1.5 py-0.5 rounded ${gradeColor[grade] ?? ''}`}>{grade}</span>
              <span>{range}</span>
              <span className="text-gray-400">({pts})</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function InfoItem({ label, value, ltr = false }: { label: string; value: string; ltr?: boolean }) {
  return (
    <div>
      <dt className="text-xs text-gray-500">{label}</dt>
      <dd className="text-sm font-semibold text-gray-800 mt-0.5" dir={ltr ? 'ltr' : undefined}>{value}</dd>
    </div>
  )
}

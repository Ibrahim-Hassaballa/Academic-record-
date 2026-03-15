import { useEffect, useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { courseService } from '../services/courseService'
import Button from '../components/ui/Button'
import Modal from '../components/ui/Modal'
import Alert from '../components/ui/Alert'
import Spinner from '../components/ui/Spinner'
import type { CourseWithEnrollment } from '../types'

type ModalState = { action: 'register' | 'drop' | 're_register'; course: CourseWithEnrollment } | null

export default function CourseRegistrationPage() {
  const { t, i18n } = useTranslation()
  const isAr = i18n.language === 'ar'

  const [courses, setCourses] = useState<CourseWithEnrollment[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [creditFilter, setCreditFilter] = useState<string>('all')
  const [modal, setModal] = useState<ModalState>(null)
  const [actionLoading, setActionLoading] = useState(false)
  const [alertMsg, setAlertMsg] = useState<{ type: 'success' | 'error'; msg: string } | null>(null)

  const loadCourses = () => {
    setLoading(true)
    courseService.getCourses()
      .then(setCourses)
      .catch(() => setAlertMsg({ type: 'error', msg: t('common.error') }))
      .finally(() => setLoading(false))
  }

  useEffect(loadCourses, [])

  const filtered = useMemo(() => {
    return courses.filter((c) => {
      const name = isAr ? c.nameAr : c.nameEn
      const code = isAr ? c.codeAr : c.codeEn
      const matchSearch = search === '' ||
        name.toLowerCase().includes(search.toLowerCase()) ||
        code.toLowerCase().includes(search.toLowerCase())
      const matchCredit = creditFilter === 'all' || c.credits.toString() === creditFilter
      return matchSearch && matchCredit
    })
  }, [courses, search, creditFilter, isAr])

  const handleConfirm = async () => {
    if (!modal) return
    setActionLoading(true)
    try {
      if (modal.action === 'register' || modal.action === 're_register') {
        await courseService.register(modal.course.id)
        setAlertMsg({ type: 'success', msg: t('courses.success_register') })
      } else {
        await courseService.drop(modal.course.id)
        setAlertMsg({ type: 'success', msg: t('courses.success_drop') })
      }
      loadCourses()
    } catch {
      setAlertMsg({ type: 'error', msg: t('common.error') })
    } finally {
      setActionLoading(false)
      setModal(null)
    }
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">{t('courses.title')}</h1>
      </div>

      {alertMsg && (
        <Alert
          type={alertMsg.type}
          message={alertMsg.msg}
          onClose={() => setAlertMsg(null)}
        />
      )}

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t('courses.search')}
          className="flex-1 rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ksu-blue/30 focus:border-ksu-blue"
        />
        <select
          value={creditFilter}
          onChange={(e) => setCreditFilter(e.target.value)}
          className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ksu-blue/30 focus:border-ksu-blue bg-white"
        >
          <option value="all">{t('courses.all_credits')}</option>
          <option value="2">2 {t('courses.credits')}</option>
          <option value="3">3 {t('courses.credits')}</option>
          <option value="6">6 {t('courses.credits')}</option>
        </select>
      </div>

      {/* Table */}
      {loading ? (
        <Spinner />
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  {[
                    t('courses.code'),
                    t('courses.name'),
                    t('courses.credits'),
                    t('courses.instructor'),
                    t('courses.schedule'),
                    t('courses.seats'),
                    t('courses.status'),
                    t('courses.action'),
                  ].map((h) => (
                    <th
                      key={h}
                      className="px-4 py-3 text-start text-xs font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="text-center py-10 text-gray-400 text-sm">
                      {t('courses.no_results')}
                    </td>
                  </tr>
                ) : (
                  filtered.map((c) => (
                    <tr key={c.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 font-mono text-xs text-gray-600">
                        {isAr ? c.codeAr : c.codeEn}
                      </td>
                      <td className="px-4 py-3 font-medium text-gray-800">
                        {isAr ? c.nameAr : c.nameEn}
                      </td>
                      <td className="px-4 py-3 text-gray-600">{c.credits}</td>
                      <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                        {isAr ? c.instructorAr : c.instructorEn}
                      </td>
                      <td className="px-4 py-3 text-gray-500 whitespace-nowrap">{c.schedule}</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs font-medium ${c.seatsAvailable === 0 ? 'text-red-500' : 'text-ksu-blue'}`}>
                          {c.seatsAvailable === 0 ? t('courses.no_seats') : c.seatsAvailable}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {c.isPassed ? (
                          <span className="inline-block text-[11px] font-semibold bg-emerald-100 text-emerald-700 px-2.5 py-1 rounded-full">
                            {t('courses.passed')}
                          </span>
                        ) : c.isEnrolled ? (
                          <span className="inline-block text-[11px] font-semibold bg-amber-100 text-amber-700 px-2.5 py-1 rounded-full">
                            {t('courses.registered')}
                          </span>
                        ) : (
                          <span className="inline-block text-[11px] font-semibold bg-gray-100 text-gray-500 px-2.5 py-1 rounded-full">
                            {t('courses.not_registered')}
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        {c.isPassed ? (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setModal({ action: 're_register', course: c })}
                          >
                            {t('courses.re_register')}
                          </Button>
                        ) : c.isEnrolled ? (
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => setModal({ action: 'drop', course: c })}
                          >
                            {t('courses.drop')}
                          </Button>
                        ) : (
                          <Button
                            variant="primary"
                            size="sm"
                            disabled={c.seatsAvailable === 0}
                            onClick={() => setModal({ action: 'register', course: c })}
                          >
                            {t('courses.register')}
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      <Modal
        isOpen={!!modal}
        title={
          modal?.action === 'drop'
            ? t('courses.confirm_drop')
            : modal?.action === 're_register'
            ? t('courses.confirm_re_register')
            : t('courses.confirm_register')
        }
        message={`${
          modal?.action === 'drop'
            ? t('courses.confirm_drop_msg')
            : modal?.action === 're_register'
            ? t('courses.confirm_re_register_msg')
            : t('courses.confirm_register_msg')
        } "${isAr ? modal?.course.nameAr : modal?.course.nameEn}"؟`}
        confirmLabel={t('courses.confirm')}
        cancelLabel={t('courses.cancel')}
        onConfirm={handleConfirm}
        onCancel={() => setModal(null)}
        isLoading={actionLoading}
        confirmVariant={modal?.action === 'drop' ? 'danger' : 'primary'}
      />
    </div>
  )
}

import { useTranslation } from 'react-i18next'
import Card from '../ui/Card'
import type { GPA } from '../../types'

function gpaColor(gpa: number, scale: number) {
  const ratio = gpa / scale
  if (ratio >= 0.7) return 'text-ksu-blue'
  if (ratio >= 0.5) return 'text-yellow-500'
  return 'text-red-500'
}

function barColor(gpa: number, scale: number) {
  const ratio = gpa / scale
  if (ratio >= 0.7) return 'bg-ksu-blue'
  if (ratio >= 0.5) return 'bg-ksu-gold'
  return 'bg-red-500'
}

export default function GPACard({ gpa }: { gpa: GPA }) {
  const { t } = useTranslation()
  const pct = (gpa.cumulative / gpa.scale) * 100
  const semPct = (gpa.semester / gpa.scale) * 100

  return (
    <Card title={t('dashboard.gpa')}>
      <div className="flex justify-between mb-6">
        <div className="text-center">
          <div className={`text-4xl font-bold ${gpaColor(gpa.cumulative, gpa.scale)}`}>
            {gpa.cumulative.toFixed(2)}
          </div>
          <div className="text-xs text-gray-500 mt-1">{t('dashboard.gpa')}</div>
          <div className="text-xs text-gray-400">{t('dashboard.gpa_scale')} {gpa.scale}</div>
        </div>
        <div className="text-center">
          <div className={`text-4xl font-bold ${gpaColor(gpa.semester, gpa.scale)}`}>
            {gpa.semester.toFixed(2)}
          </div>
          <div className="text-xs text-gray-500 mt-1">{t('dashboard.semester_gpa')}</div>
          <div className="text-xs text-gray-400">{t('dashboard.gpa_scale')} {gpa.scale}</div>
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>{t('dashboard.gpa')}</span>
            <span>{pct.toFixed(0)}%</span>
          </div>
          <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${barColor(gpa.cumulative, gpa.scale)}`}
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
        <div>
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>{t('dashboard.semester_gpa')}</span>
            <span>{semPct.toFixed(0)}%</span>
          </div>
          <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${barColor(gpa.semester, gpa.scale)}`}
              style={{ width: `${semPct}%` }}
            />
          </div>
        </div>
      </div>
    </Card>
  )
}

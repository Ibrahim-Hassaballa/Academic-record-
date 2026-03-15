import { useTranslation } from 'react-i18next'
import Card from '../ui/Card'
import type { Announcement } from '../../types'

export default function AnnouncementsCard({ announcements }: { announcements: Announcement[] }) {
  const { t, i18n } = useTranslation()
  const isAr = i18n.language === 'ar'

  return (
    <Card title={t('dashboard.announcements')}>
      {announcements.length === 0 ? (
        <p className="text-sm text-gray-400 text-center py-4">{t('dashboard.no_announcements')}</p>
      ) : (
        <div className="space-y-3">
          {announcements.map((a) => (
            <div
              key={a.id}
              className={`border-s-4 ps-3 py-1.5 rounded-e-lg
                ${a.priority === 'high'
                  ? 'border-red-500 bg-red-50'
                  : 'border-ksu-blue bg-gray-50'
                }`}
            >
              <div className="flex items-center gap-2 mb-0.5">
                <h4 className="text-sm font-semibold text-gray-800">
                  {isAr ? a.titleAr : a.titleEn}
                </h4>
                {a.priority === 'high' && (
                  <span className="text-[10px] bg-red-500 text-white px-1.5 py-0.5 rounded font-medium">
                    {t('dashboard.high_priority')}
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                {isAr ? a.bodyAr : a.bodyEn}
              </p>
              <p className="text-[11px] text-gray-400 mt-1">{a.date}</p>
            </div>
          ))}
        </div>
      )}
    </Card>
  )
}

import type { CourseStatus } from '../../types'

interface BadgeProps {
  status: CourseStatus
  label: string
}

const styles: Record<CourseStatus, string> = {
  passed: 'bg-emerald-100 text-emerald-700 border border-emerald-200',
  enrolled: 'bg-amber-100 text-amber-700 border border-amber-200',
  remaining: 'bg-gray-100 text-gray-500 border border-gray-200',
}

export default function Badge({ status, label }: BadgeProps) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[status]}`}>
      {label}
    </span>
  )
}

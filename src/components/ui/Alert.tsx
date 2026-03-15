interface AlertProps {
  type: 'success' | 'error' | 'info'
  message: string
  onClose?: () => void
}

const styles = {
  success: 'bg-blue-50 border-blue-400 text-blue-800',
  error: 'bg-red-50 border-red-400 text-red-800',
  info: 'bg-blue-50 border-blue-400 text-blue-800',
}

export default function Alert({ type, message, onClose }: AlertProps) {
  return (
    <div className={`flex items-center justify-between rounded-lg border-s-4 p-4 ${styles[type]}`}>
      <p className="text-sm font-medium">{message}</p>
      {onClose && (
        <button onClick={onClose} className="ms-3 text-current opacity-60 hover:opacity-100">
          ✕
        </button>
      )}
    </div>
  )
}

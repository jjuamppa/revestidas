import React, { useEffect } from 'react'

export default function Toast({ message, onClose }: { message: string; onClose?: () => void }) {
  useEffect(() => {
    const t = setTimeout(() => onClose && onClose(), 2500)
    return () => clearTimeout(t)
  }, [onClose])

  return (
    <div className="fixed bottom-6 right-6 bg-black text-white px-4 py-2 rounded shadow">
      {message}
    </div>
  )
}

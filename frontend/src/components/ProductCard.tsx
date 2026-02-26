import React, { useState, useEffect } from 'react'

type Props = {
  title?: string
  description?: string
  price?: string
  image?: string
  loading?: boolean
}

export default function ProductCard({ title, description, price, image, loading }: Props) {
  if (loading) {
    return (
      <article className="bg-white rounded shadow-sm overflow-hidden animate-pulse">
        <div className="h-56 bg-gray-200 rounded" />
        <div className="p-4">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
          <div className="h-4 bg-gray-200 rounded w-1/2" />
        </div>
      </article>
    )
  }

  const [src, setSrc] = useState<string | undefined>(image)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setIsOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <article className="bg-white rounded shadow hover:shadow-md overflow-hidden">
      <div className="h-56 bg-gray-100 flex items-center justify-center overflow-hidden">
        <img
          src={src}
          alt={title}
          loading="lazy"
          onError={() => setSrc('/assets/placeholder.svg')}
          onClick={() => setIsOpen(true)}
          className="object-cover h-full w-full transform hover:scale-105 transition-transform duration-200 cursor-pointer"
        />
      </div>

      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center p-4"
          onClick={() => setIsOpen(false)}
        >
          <div className="relative max-w-full max-h-full" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Cerrar imagen"
              className="absolute -top-3 -right-3 bg-white rounded-full p-1 shadow-lg"
            >
              ✕
            </button>
            <img
              src={src}
              alt={title}
              onError={() => setSrc('/assets/placeholder.svg')}
              className="max-w-[90vw] max-h-[90vh] object-contain rounded bg-white"
            />
          </div>
        </div>
      )}
      <div className="p-4">
        <h3 className="font-medium mb-2">{title}</h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{description}</p>
        <div className="text-lg font-semibold">${price}</div>
      </div>
    </article>
  )
}

import React from 'react'

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

  return (
    <article className="bg-white rounded shadow hover:shadow-md overflow-hidden">
      <div className="h-56 bg-gray-100 flex items-center justify-center overflow-hidden">
        <img src={image} alt={title} className="object-cover h-full w-full transform hover:scale-105 transition-transform duration-200" />
      </div>
      <div className="p-4">
        <h3 className="font-medium mb-2">{title}</h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{description}</p>
        <div className="text-lg font-semibold">${price}</div>
      </div>
    </article>
  )
}

import React from 'react'

export default function Spinner({ size = 24 }: { size?: number }) {
  return (
    <svg
      className="animate-spin text-gray-700"
      style={{ width: size, height: size }}
      viewBox="0 0 24 24"
      fill="none"
    >
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" opacity="0.2" />
      <path
        d="M22 12a10 10 0 00-10-10"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  )
}

// src/components/ProgressDots.jsx
import React from 'react'

export default function ProgressDots({ total, current }) {
  return (
    <div className="flex justify-center mt-6 space-x-3">
      {[...Array(total)].map((_, i) => {
        const isActive = i === current
        return (
          <span
            key={i}
            className={`w-2 h-2 rounded-full transition-transform duration-300 ${
              isActive
                ? 'bg-blue-600 scale-125 shadow-md'
                : 'bg-gray-300 hover:bg-gray-400 cursor-pointer'
            }`}
            aria-label={`Phase ${i + 1} ${isActive ? '(current)' : ''}`}
          />
        )
      })}
    </div>
  )
}

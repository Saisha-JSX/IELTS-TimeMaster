// src/components/TimerDisplay.jsx
import React from 'react'
import { formatTime } from '../utils/timeUtils' // example helper to format seconds as mm:ss

export default function TimerDisplay({ time }) {
  return (
    <div className="mt-5 mb-4">
      <div
        className="inline-block px-10 py-6 rounded-lg bg-gradient-to-r from-gray-100 to-gray-50 shadow-inner text-5xl font-mono font-semibold text-gray-900 select-none"
        aria-live="polite"
        aria-atomic="true"
      >
        {formatTime(time)}
      </div>
    </div>
  )
}

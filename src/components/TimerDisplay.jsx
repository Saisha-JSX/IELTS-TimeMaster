import React, { useRef } from 'react'
import { formatTime } from '../utils/timeUtils'

export default function TimerDisplay({ time, duration, isWarning, isDone }) {
  const radius = 56
  const stroke = 8
  const normalizedRadius = radius - stroke / 2
  const circumference = 2 * Math.PI * normalizedRadius
  const progress = Math.max(0, Math.min(1, time / duration))
  const strokeDashoffset = circumference * (1 - progress)

  const circleColor = '#3b82f6' // Always blue

  const timerRef = useRef(null)

  // Removed blinking effect on warning

  return (
    <div className="mt-5 mb-4 flex justify-center items-center">
      <div className="relative w-40 h-40">
        <div className="absolute inset-0 flex items-center justify-center">
          <svg width="100%" height="100%" viewBox="0 0 120 120" className="rotate-[-90deg]">
            <circle
              stroke="#e5e7eb"
              fill="transparent"
              strokeWidth={stroke}
              r={normalizedRadius}
              cx="60"
              cy="60"
            />
            <circle
              stroke={circleColor}
              fill="transparent"
              strokeWidth={stroke}
              r={normalizedRadius}
              cx="60"
              cy="60"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              style={{ transition: 'stroke-dashoffset 0.5s ease' }}
            />
          </svg>
        </div>

        <div
          ref={timerRef}
          className="absolute inset-0 flex flex-col items-center justify-center text-gray-900 select-none px-2 text-center"
          style={{ visibility: 'visible' }}  // Ensure visibility is always visible
        >
          <div className="text-4xl font-mono font-semibold">{formatTime(time)}</div>
          <div className="text-xs text-gray-600 mt-1">
            minutes remaining
          </div>
        </div>
      </div>
    </div>
  )
}

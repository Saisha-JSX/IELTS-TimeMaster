import React from 'react'

const tipsByMode = {
  Reading: 'Focus on skimming first to get the main idea, then read for details.',
  Writing: 'Plan your essay structure before writing to organize your ideas clearly.',
  Speaking: 'Practice speaking clearly and confidently, and try to expand your answers.',
  Pomodoro: 'Use short breaks to stretch and relax your mind to maintain focus.',
}

export default function StudyTips({ mode }) {
  const tip = tipsByMode[mode]

  if (!tip) return null

  return (
    <section
      className="
        mt-8
        max-w-xl
        bg-white
        p-5
        rounded-xl
        shadow-md
        border
        border-gray-200
        flex
        items-center
        gap-4
        transition
        duration-300
        hover:shadow-lg
      "
      role="region"
      aria-label={`Study tips for ${mode}`}
    >
      {/* Small bulb icon with circle background */}
      <div className="flex-shrink-0 bg-yellow-100 rounded-full p-2 w-10 h-10 flex items-center justify-center shadow-sm">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 text-yellow-600"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M9 21h6v-1.5H9V21zm3-19a7 7 0 0 0-7 7c0 2.8 2 5.2 4.7 6v2h4.6v-2c2.7-.8 4.7-3.2 4.7-6a7 7 0 0 0-7-7z" />
        </svg>
      </div>

      {/* Text content */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 select-none mb-1">
          Study Tips
        </h3>
        <p className="text-gray-700 leading-relaxed select-text text-sm">{tip}</p>
      </div>
    </section>
  )
}

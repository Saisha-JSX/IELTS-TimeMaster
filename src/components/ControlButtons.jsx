// src/components/ControlButtons.jsx
import React from 'react'

export default function ControlButtons({ onStart, onPause, onReset, onSkip, isRunning }) {
  return (
    <div className="flex justify-center space-x-6 mt-6">
      {isRunning ? (
        <button
          onClick={onPause}
          aria-label="Pause timer"
          className="btn-primary"
          title="Pause"
        >
          <PauseIcon />
        </button>
      ) : (
        <button
          onClick={onStart}
          aria-label="Start timer"
          className="btn-primary"
          title="Start"
        >
          <PlayIcon />
        </button>
      )}

      <button
        onClick={onReset}
        aria-label="Reset timer"
        className="btn-secondary"
        title="Reset"
      >
        <ResetIcon />
      </button>

      <button
        onClick={onSkip}
        aria-label="Skip phase"
        className="btn-secondary"
        title="Skip"
      >
        <SkipIcon />
      </button>
    </div>
  )
}

const iconClass = 'w-6 h-6 stroke-current'

function PlayIcon() {
  return (
    <svg
      className={iconClass}
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
    >
      <polygon points="5 3 19 12 5 21" />
    </svg>
  )
}

function PauseIcon() {
  return (
    <svg
      className={iconClass}
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
    >
      <rect x="6" y="4" width="4" height="16" />
      <rect x="14" y="4" width="4" height="16" />
    </svg>
  )
}

function ResetIcon() {
  return (
    <svg
      className={iconClass}
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
    >
      <path d="M1 4v6h6" />
      <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
    </svg>
  )
}

function SkipIcon() {
  return (
    <svg
      className={iconClass}
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
    >
      <polygon points="5 4 15 12 5 20 5 4" />
      <line x1="19" y1="5" x2="19" y2="19" />
    </svg>
  )
}

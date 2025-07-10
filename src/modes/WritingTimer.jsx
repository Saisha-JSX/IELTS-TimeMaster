// src/modes/WritingTimer.jsx
import { useState, useEffect, useRef } from 'react'
import TimerDisplay from '../components/TimerDisplay'
import ControlButtons from '../components/ControlButtons'
import ProgressDots from '../components/ProgressDots'
import QuoteBox from '../components/QuoteBox'

const phases = [
  { title: 'Task 1', duration: 20 * 60 },
  { title: 'Task 2', duration: 40 * 60 },
]

export default function WritingTimer() {
  const [phaseIndex, setPhaseIndex] = useState(0)
  const [timeLeft, setTimeLeft] = useState(phases[0].duration)
  const [isRunning, setIsRunning] = useState(false)
  const intervalRef = useRef(null)

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((t) => {
          if (t <= 1) {
            handleSkip()
            return 0
          }
          return t - 1
        })
      }, 1000)
    } else {
      clearInterval(intervalRef.current)
    }
    return () => clearInterval(intervalRef.current)
  }, [isRunning])

  useEffect(() => {
    setTimeLeft(phases[phaseIndex].duration)
  }, [phaseIndex])

  function handleStart() {
    setIsRunning(true)
  }

  function handlePause() {
    setIsRunning(false)
  }

  function handleReset() {
    setIsRunning(false)
    setTimeLeft(phases[phaseIndex].duration)
  }

  function handleSkip() {
    setIsRunning(false)
    if (phaseIndex < phases.length - 1) {
      setPhaseIndex((i) => i + 1)
    } else {
      setPhaseIndex(0)
    }
  }

  return (
    <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center space-y-6">
      
      {/* Engaging header with style */}
      <div className="flex items-center justify-center gap-2 p-3 mb-2 rounded-md bg-green-50 border border-green-100 shadow-sm">
        <span className="text-2xl animate-bounce-slow">📝</span>
        <h2 className="text-lg sm:text-xl font-bold text-green-800 tracking-wide">
          Writing <span className="text-gray-500">:</span>{' '}
          <span className="text-gray-700">{phases[phaseIndex].title}</span>
        </h2>
      </div>

      <TimerDisplay time={timeLeft} />

      <ControlButtons
        onStart={handleStart}
        onPause={handlePause}
        onReset={handleReset}
        onSkip={handleSkip}
        isRunning={isRunning}
      />

      <ProgressDots total={phases.length} current={phaseIndex} />

      <QuoteBox />
    </div>
  )
}

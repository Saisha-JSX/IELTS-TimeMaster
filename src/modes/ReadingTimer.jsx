import { useEffect, useState, useRef, useCallback } from 'react'
import TimerDisplay from '../components/TimerDisplay'
import ControlButtons from '../components/ControlButtons'
import ProgressDots from '../components/ProgressDots'
import QuoteBox from '../components/QuoteBox'

const phases = [
  { title: 'Passage 1', duration: 15 * 60 },
  { title: 'Passage 2', duration: 20 * 60 },
  { title: 'Passage 3', duration: 20 * 60 },
]

export default function ReadingTimer() {
  const [phaseIndex, setPhaseIndex] = useState(0)
  const [timeLeft, setTimeLeft] = useState(phases[0].duration)
  const [isRunning, setIsRunning] = useState(false)
  const [autoMode, setAutoMode] = useState(false)
  const intervalRef = useRef(null)

  // Auto-advance and timer logic
  const handleSkip = useCallback(() => {
    setIsRunning(false)
    const nextIndex = (phaseIndex + 1) % phases.length
    setPhaseIndex(nextIndex)

    if (autoMode && nextIndex !== 0) {
      setTimeout(() => setIsRunning(true), 500)
    }
  }, [phaseIndex, autoMode])

  useEffect(() => {
    if (!isRunning) return

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current)
          handleSkip()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(intervalRef.current)
  }, [isRunning, handleSkip])

  // Reset timer on phase change
  useEffect(() => {
    setTimeLeft(phases[phaseIndex].duration)
  }, [phaseIndex])

  const handleStart = () => setIsRunning(true)
  const handlePause = () => setIsRunning(false)
  const handleReset = () => {
    setIsRunning(false)
    setTimeLeft(phases[phaseIndex].duration)
  }

  const handlePhaseClick = (index) => {
    if (index !== phaseIndex) {
      setIsRunning(false)
      setPhaseIndex(index)
    }
  }

  return (
    <div className="max-w-md w-full bg-[#f8f8f8] rounded-xl shadow-lg border border-gray-200 p-6 sm:p-8 text-center space-y-6 mx-auto">
      {/* Header */}
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-blue-900">IELTS Reading Practice</h2>
        <p className="text-sm text-gray-600">
          Current Section: <span className="font-medium text-gray-800">{phases[phaseIndex].title}</span>
        </p>
      </div>

      {/* Timer */}
      <TimerDisplay time={timeLeft} />

      {/* Controls */}
      <ControlButtons
        onStart={handleStart}
        onPause={handlePause}
        onReset={handleReset}
        onSkip={handleSkip}
        isRunning={isRunning}
      />

      {/* Progress Dots */}
      <ProgressDots
        total={phases.length}
        current={phaseIndex}
        onDotClick={handlePhaseClick}
      />

      {/* Auto Advance Toggle */}
      <div className="flex justify-center items-center space-x-2 text-sm">
        <label htmlFor="autoMode" className="text-gray-700">Auto-advance</label>
        <input
          id="autoMode"
          type="checkbox"
          checked={autoMode}
          onChange={() => setAutoMode((prev) => !prev)}
          className="accent-blue-600"
        />
      </div>

      {/* Motivation */}
      <QuoteBox />
    </div>
  )
}

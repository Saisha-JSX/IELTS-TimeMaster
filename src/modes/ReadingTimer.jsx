import { useEffect, useState, useRef } from 'react'
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
  const intervalRef = useRef(null)

  // Countdown logic
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

  // Reset time on phase change
  useEffect(() => {
    setTimeLeft(phases[phaseIndex].duration)
  }, [phaseIndex])

  const handleStart = () => setIsRunning(true)
  const handlePause = () => setIsRunning(false)

  const handleReset = () => {
    setIsRunning(false)
    setTimeLeft(phases[phaseIndex].duration)
  }

  const handleSkip = () => {
    setIsRunning(false)
    const nextIndex = phaseIndex < phases.length - 1 ? phaseIndex + 1 : 0
    setPhaseIndex(nextIndex)
    setTimeout(() => {
      if (isRunning) setIsRunning(true)
    }, 100)
  }

  const handlePhaseClick = (index) => {
    if (index !== phaseIndex) {
      setIsRunning(false)
      setPhaseIndex(index)
    }
  }

  return (
    <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center space-y-6">
      {/* Phase Header */}
      <div className="flex items-center justify-center gap-3 bg-blue-50 border border-blue-100 rounded-md px-4 py-2 shadow-sm">
        <span className="text-2xl animate-pulse-slow">📖</span>
        <h2 className="text-lg sm:text-xl font-bold text-blue-800">
          Reading <span className="text-gray-500">–</span>{' '}
          <span className="text-gray-700">{phases[phaseIndex].title}</span>
        </h2>
      </div>

      {/* Timer Display */}
      <TimerDisplay time={timeLeft} />

      {/* Control Buttons */}
      <ControlButtons
        onStart={handleStart}
        onPause={handlePause}
        onReset={handleReset}
        onSkip={handleSkip}
        isRunning={isRunning}
      />

      {/* Progress Dots (now clickable) */}
      <ProgressDots
        total={phases.length}
        current={phaseIndex}
        onDotClick={handlePhaseClick}
      />

      {/* Motivational Quote */}
      <QuoteBox />
    </div>
  )
}

// src/modes/PomodoroTimer.jsx
import { useState, useEffect, useRef } from 'react'
import TimerDisplay from '../components/TimerDisplay'
import ControlButtons from '../components/ControlButtons'
import ProgressDots from '../components/ProgressDots'
import QuoteBox from '../components/QuoteBox'

const phases = [
  { title: 'Work', duration: 25 * 60 },
  { title: 'Break', duration: 5 * 60 },
]

export default function PomodoroTimer() {
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
    setPhaseIndex((i) => (i + 1) % phases.length)
  }

  return (
    <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
      <h2 className="text-xl font-semibold text-gray-700">{phases[phaseIndex].title}</h2>
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

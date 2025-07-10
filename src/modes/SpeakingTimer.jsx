// src/modes/SpeakingTimer.jsx
import { useState, useEffect, useRef } from 'react'
import TimerDisplay from '../components/TimerDisplay'
import ControlButtons from '../components/ControlButtons'
import ProgressDots from '../components/ProgressDots'
import QuoteBox from '../components/QuoteBox'

const phases = [
  { title: 'Part 1', duration: 60 }, // 1 minute
  { title: 'Part 2', duration: 120 }, // 2 minutes
  { title: 'Part 3', duration: 60 }, // 1 minute
]

export default function SpeakingTimer() {
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

import { useEffect, useState, useRef, useCallback } from 'react'
import TimerDisplay from '../components/TimerDisplay'
import ControlButtons from '../components/ControlButtons'
import ProgressDots from '../components/ProgressDots'

// Optional: preload sounds
const beepSound = new Audio('/sounds/rain.mp3')
const doneSound = new Audio('/sounds/rain.mp3')

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
  const [warningTriggered, setWarningTriggered] = useState(false)

  const intervalRef = useRef(null)

  const handleSkip = useCallback(() => {
    setIsRunning(false)
    setWarningTriggered(false) // reset warning
    const nextIndex = (phaseIndex + 1) % phases.length
    setPhaseIndex(nextIndex)

    // Play "done" sound
    doneSound.play()

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

        if (prev === 10 && !warningTriggered) {
          beepSound.play()
          setWarningTriggered(true)
        }

        return prev - 1
      })
    }, 1000)

    return () => clearInterval(intervalRef.current)
  }, [isRunning, handleSkip, warningTriggered])

  useEffect(() => {
    setTimeLeft(phases[phaseIndex].duration)
    setWarningTriggered(false)
  }, [phaseIndex])

  const handleStart = () => setIsRunning(true)
  const handlePause = () => setIsRunning(false)
  const handleReset = () => {
    setIsRunning(false)
    setTimeLeft(phases[phaseIndex].duration)
    setWarningTriggered(false)
  }

  const handlePhaseClick = (index) => {
    if (index !== phaseIndex) {
      setIsRunning(false)
      setPhaseIndex(index)
      setWarningTriggered(false)
    }
  }

  return (
    <div className="max-w-md w-full bg-[#f8f8f8] rounded-xl shadow-lg border border-gray-200 p-6 sm:p-8 text-center space-y-6 mx-auto">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-blue-900">IELTS Reading Practice</h2>
        <p className="text-sm text-gray-600">
          Current Section: <span className="font-medium text-gray-800">{phases[phaseIndex].title}</span>
        </p>
      </div>

      <TimerDisplay
        time={timeLeft}
        duration={phases[phaseIndex].duration}
        isWarning={timeLeft <= 15 && timeLeft > 0}
        isDone={timeLeft === 0}
      />

      <ControlButtons
        onStart={handleStart}
        onPause={handlePause}
        onReset={handleReset}
        onSkip={handleSkip}
        isRunning={isRunning}
      />

      <ProgressDots
        total={phases.length}
        current={phaseIndex}
        onDotClick={handlePhaseClick}
      />

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
    </div>
  )
}

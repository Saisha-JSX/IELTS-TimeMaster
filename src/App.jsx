import { useState } from 'react'
import ModeSelector from './components/ModeSelector'
import ReadingTimer from './modes/ReadingTimer'
import WritingTimer from './modes/WritingTimer'
import SpeakingTimer from './modes/SpeakingTimer'
import PomodoroTimer from './modes/PomodoroTimer'
import Footer from './components/Footer'
import StudyTips from './components/StudyTips' // <-- Import here

export default function App() {
  const [mode, setMode] = useState('Reading')

  const renderTimer = () => {
    switch (mode) {
      case 'Reading':
        return <ReadingTimer />
      case 'Writing':
        return <WritingTimer />
      case 'Speaking':
        return <SpeakingTimer />
      case 'Pomodoro':
        return <PomodoroTimer />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-gray-100 text-gray-900">
      <header className="bg-white border-b border-gray-300 shadow-sm">
        <div className="flex flex-col md:flex-row items-center justify-between p-4 gap-4">
          <div className="flex items-center gap-4">
            <img
              src="/assets/logo.svg"
              alt="IELTS TimeMaster Logo"
              className="w-10 h-10"
            />
            <div>
              <h1 className="text-2xl font-bold tracking-wide">IELTS TimeMaster</h1>
              <p className="text-sm text-gray-600">
                Your ultimate IELTS preparation companion
              </p>
            </div>
          </div>
          <ModeSelector activeMode={mode} onChange={setMode} />
        </div>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center p-6">
        {renderTimer()}
        {/* Study Tips below timer */}
        <StudyTips mode={mode} />
      </main>

      <Footer />
    </div>
  )
}

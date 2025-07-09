// src/App.jsx
import { useState } from 'react'
import ModeSelector from './components/ModeSelector'
import ReadingTimer from './modes/ReadingTimer' 
import WritingTimer from './modes/WritingTimer'
import SpeakingTimer from './modes/SpeakingTimer'
import PomodoroTimer from './modes/PomodoroTimer'
import Footer from './components/Footer'

export default function App() {
  const [mode, setMode] = useState('Reading')

  // Map mode to timer component
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
      {/* Header */}
      <header className="flex items-center gap-4 p-4 border-b border-gray-300 bg-white shadow-sm">
        <img
          src="/assets/logo.svg"
          alt="IELTS TimeMaster Logo"
          className="w-10 h-10"
        />
        <div>
          <h1 className="text-2xl font-bold tracking-wide">IELTS TimeMaster</h1>
          <p className="text-sm text-gray-600 italic">Train with precision. Practice with purpose.</p>
        </div>
      </header>

      {/* Mode selector */}
      <ModeSelector activeMode={mode} onChange={setMode} />

      {/* Main timer panel */}
      <main className="flex-grow flex flex-col items-center justify-center p-6">
        {renderTimer()}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}

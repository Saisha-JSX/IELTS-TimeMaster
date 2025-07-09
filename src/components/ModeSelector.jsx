// src/components/ModeSelector.jsx
const modes = [
  { name: 'Reading', color: 'text-blue-600 border-blue-600' },
  { name: 'Writing', color: 'text-green-600 border-green-600' },
  { name: 'Speaking', color: 'text-orange-600 border-orange-600' },
  { name: 'Pomodoro', color: 'text-red-600 border-red-600' },
]

export default function ModeSelector({ activeMode, onChange }) {
  return (
    <nav className="flex justify-center gap-6 bg-white border-b border-gray-300 shadow-sm">
      {modes.map(({ name, color }) => {
        const isActive = activeMode === name
        return (
          <button
            key={name}
            onClick={() => onChange(name)}
            className={`relative px-4 py-3 font-semibold border-b-4 -mb-px
              ${isActive ? `${color}` : 'border-transparent text-gray-500 hover:text-gray-700'}
              transition-colors duration-200`}
            aria-current={isActive ? 'page' : undefined}
          >
            {name}
          </button>
        )
      })}
    </nav>
  )
}

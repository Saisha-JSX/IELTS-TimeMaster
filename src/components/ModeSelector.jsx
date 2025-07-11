const modes = [
  { name: 'Reading', color: 'text-blue-600 border-blue-600' },
  { name: 'Writing', color: 'text-green-600 border-green-600' },
  { name: 'Speaking', color: 'text-orange-600 border-orange-600' },
  { name: 'Pomodoro', color: 'text-red-600 border-red-600' },
]

export default function ModeSelector({ activeMode, onChange }) {
  return (
    <nav className="flex gap-2">
      {modes.map(({ name, color }) => {
        const isActive = activeMode === name
        return (
          <button
            key={name}
            onClick={() => onChange(name)}
            className={`px-4 py-2 text-sm font-medium rounded-md border transition-colors duration-200
              ${isActive 
                ? `bg-gray-100 border-b-4 ${color}` 
                : 'text-gray-600 border-transparent hover:bg-gray-50 hover:text-gray-800'}
            `}
            aria-current={isActive ? 'page' : undefined}
          >
            {name}
          </button>
        )
      })}
    </nav>
  )
}

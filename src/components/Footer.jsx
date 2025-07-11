export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-white border-t border-gray-300 text-sm text-gray-500">
      <div className="max-w-4xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
        <div>
          <span>© {year} IELTS TimeMaster</span>
        </div>

        <div className="flex gap-3 items-center">
          <a
            href="https://github.com/Saisha-JSX/IELTS-TimeMaster/issues"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Give feedback on GitHub"
            className="underline hover:text-gray-700 transition-colors duration-150"
          >
            Give Feedback
          </a>
          <span className="hidden sm:inline-block">|</span>
          <span className="text-gray-400">v1.0.0</span>
        </div>
      </div>
    </footer>
  )
}

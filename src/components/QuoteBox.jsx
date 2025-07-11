import { useEffect, useState } from 'react'
import quotes from '../utils/quotes'

export default function QuoteBox() {
  const [quote, setQuote] = useState('Get ready to focus!')
  const [fade, setFade] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false)
      setTimeout(() => {
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)]
        setQuote(randomQuote)
        setFade(true)
      }, 300) // fade out before setting new quote
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div
      className={`mt-8 max-w-2xl mx-auto text-center px-4 transition-opacity duration-500 ease-in-out ${
        fade ? 'opacity-100' : 'opacity-0'
      }`}
      aria-live="polite"
    >
      <p className="text-lg sm:text-xl text-sky-700 italic font-medium leading-relaxed">
        “{quote}”
      </p>
    </div>
  )
}

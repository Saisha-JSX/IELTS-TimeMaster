import { useEffect, useState } from 'react'
import quotes from '../utils/quotes'

export default function QuoteBox() {
  const [quote, setQuote] = useState('Get ready to focus!')

  useEffect(() => {
    const interval = setInterval(() => {
      const randomQuote = quotes[Math.floor(Math.random() * quotes.length)]
      setQuote(randomQuote)
    }, 30000) // change quote every 30 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div
      className="mt-6 max-w-xl mx-auto text-center italic"
      style={{
        fontSize: '1rem',
        color: '#7a9cc6', 
        fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
        lineHeight: '1.6',
      }}
      key={quote}
    >
      “{quote}”
    </div>
  )
}

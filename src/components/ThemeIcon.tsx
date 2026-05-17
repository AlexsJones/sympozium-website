import { useState, useEffect } from 'react'

const ICONS: Record<string, string> = {
  jade: '/icon.svg',
  industrial: '/icon-industrial.svg',
}

export default function ThemeIcon({ className }: { className?: string }) {
  const [src, setSrc] = useState('/icon.png')

  useEffect(() => {
    const update = () => {
      const theme = document.documentElement.getAttribute('data-theme') || 'default'
      setSrc(ICONS[theme] || '/icon.png')
    }
    update()
    const observer = new MutationObserver(update)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    return () => observer.disconnect()
  }, [])

  return <img src={src} alt="Sympozium" className={className} />
}

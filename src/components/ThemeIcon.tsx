import { useState, useEffect } from 'react'

const ICONS: Record<string, string> = {
  industrial: '/icon-industrial.svg',
  classic: '/icon.png',
  jade: '/icon.svg',
}

export default function ThemeIcon({ className }: { className?: string }) {
  const [src, setSrc] = useState('/icon-industrial.svg')

  useEffect(() => {
    const update = () => {
      const theme = document.documentElement.getAttribute('data-theme') || 'industrial'
      setSrc(ICONS[theme] || '/icon.png')
    }
    update()
    const observer = new MutationObserver(update)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    return () => observer.disconnect()
  }, [])

  return <img src={src} alt="Sympozium" className={className} />
}

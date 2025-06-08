'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

export type Theme = 'iron-man' | 'war-machine' | 'rescue'

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

const themes: Theme[] = ['iron-man', 'war-machine', 'rescue']

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('iron-man')

  useEffect(() => {
    const savedTheme = localStorage.getItem('iron-cinema-theme') as Theme
    if (savedTheme && themes.includes(savedTheme)) {
      setTheme(savedTheme)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('iron-cinema-theme', theme)
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const toggleTheme = () => {
    const currentIndex = themes.indexOf(theme)
    const nextIndex = (currentIndex + 1) % themes.length
    setTheme(themes[nextIndex])
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

export const themeConfig = {
  'iron-man': {
    name: 'Mark 85 - Iron Man',
    description: 'Classic Red & Gold Arc Reactor',
    emoji: '🔴',
    colors: {
      primary: '#dc2626',
      secondary: '#fbbf24',
      accent: '#f59e0b'
    }
  },
  'war-machine': {
    name: 'Mark II - War Machine',
    description: 'Tactical Dark Operations',
    emoji: '⚫',
    colors: {
      primary: '#374151',
      secondary: '#6b7280',
      accent: '#9ca3af'
    }
  },
  'rescue': {
    name: 'Mark 49 - Rescue',
    description: 'Bright Support Systems',
    emoji: '💙',
    colors: {
      primary: '#3b82f6',
      secondary: '#60a5fa',
      accent: '#93c5fd'
    }
  }
}
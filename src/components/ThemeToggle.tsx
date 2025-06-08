'use client'

import { useState } from 'react'
import { useTheme, themeConfig, Theme } from '@/contexts/ThemeContext'

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="iron-button text-white px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 flex items-center gap-2"
        aria-label="アーマーテーマを変更"
      >
        <span className="text-lg">{themeConfig[theme].emoji}</span>
        <span className="hidden sm:inline">アーマー変更</span>
        <span className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full right-0 mt-2 w-80 iron-card rounded-xl p-4 z-50 shadow-2xl">
            <h3 className="text-lg font-bold mb-3 text-center" style={{ color: 'var(--theme-secondary)' }}>
              🛡️ マーク別アーマー選択
            </h3>
            <div className="space-y-3">
              {(Object.keys(themeConfig) as Theme[]).map((themeKey) => {
                const config = themeConfig[themeKey]
                const isActive = theme === themeKey
                
                return (
                  <button
                    key={themeKey}
                    onClick={() => handleThemeChange(themeKey)}
                    className={`w-full p-3 rounded-lg transition-all duration-300 text-left ${
                      isActive 
                        ? 'iron-button' 
                        : 'bg-gray-800/50 border border-gray-700/50 hover:bg-gray-700/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{config.emoji}</span>
                      <div className="flex-1 min-w-0">
                        <div className={`font-semibold text-sm ${
                          isActive ? 'text-white' : 'text-gray-200'
                        }`}>
                          {config.name}
                        </div>
                        <div className={`text-xs ${
                          isActive ? 'text-gray-200' : 'text-gray-400'
                        }`}>
                          {config.description}
                        </div>
                      </div>
                      {isActive && (
                        <div className="text-sm font-bold text-yellow-400">
                          ✓ ACTIVE
                        </div>
                      )}
                    </div>
                    
                    {/* カラープレビュー */}
                    <div className="flex gap-1 mt-2">
                      <div 
                        className="w-4 h-4 rounded-full border border-gray-600"
                        style={{ backgroundColor: config.colors.primary }}
                      />
                      <div 
                        className="w-4 h-4 rounded-full border border-gray-600"
                        style={{ backgroundColor: config.colors.secondary }}
                      />
                      <div 
                        className="w-4 h-4 rounded-full border border-gray-600"
                        style={{ backgroundColor: config.colors.accent }}
                      />
                    </div>
                  </button>
                )
              })}
            </div>
            
            <div className="mt-4 pt-3 border-t border-gray-700/50">
              <p className="text-xs text-gray-400 text-center">
                💡 アーク・リアクター技術により、テーマ設定は自動保存されます
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
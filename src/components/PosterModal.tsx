'use client'

import { useEffect } from 'react'

interface PosterModalProps {
  isOpen: boolean
  onClose: () => void
  posterUrl: string
  movieTitle: string
}

export default function PosterModal({ isOpen, onClose, posterUrl, movieTitle }: PosterModalProps) {
  // ESCキーでモーダルを閉じる
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      // スクロールを無効化
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* オーバーレイ */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
        style={{
          background: `radial-gradient(circle at center, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.9) 100%)`
        }}
      />
      
      {/* モーダルコンテンツ */}
      <div className="relative z-10 max-w-4xl max-h-[90vh] w-full">
        {/* 閉じるボタン */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 iron-button text-white p-3 rounded-full font-bold text-lg transition-all duration-300 hover:scale-110 z-20"
          aria-label="ポスター表示を閉じる"
        >
          ✕
        </button>
        
        {/* ポスター表示エリア */}
        <div className="iron-card rounded-xl overflow-hidden shadow-2xl transform transition-all duration-300 hover:scale-[1.02]">
          <div className="relative">
            {/* アーク・リアクター風グロー効果 */}
            <div className="absolute inset-0 rounded-xl opacity-30 animate-pulse"
                 style={{
                   background: `radial-gradient(circle at center, var(--theme-glow, rgba(251, 191, 36, 0.3)) 0%, transparent 70%)`
                 }}
            />
            
            <img
              src={posterUrl}
              alt={`${movieTitle} - ポスター拡大表示`}
              className="w-full h-auto max-h-[80vh] object-contain rounded-xl"
              style={{
                filter: 'drop-shadow(0 0 20px var(--theme-glow, rgba(251, 191, 36, 0.3)))'
              }}
            />
            
            {/* ポスター情報オーバーレイ */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-xl">
              <h3 className="text-2xl font-bold mb-2" style={{ color: 'var(--theme-secondary)' }}>
                🎬 {movieTitle}
              </h3>
              <p className="text-sm opacity-80" style={{ color: 'var(--theme-text-secondary)' }}>
                🔍 Iron Cinema アーカイブ - アーク・リアクター技術により強化表示
              </p>
            </div>
          </div>
        </div>
        
        {/* 操作ヒント */}
        <div className="mt-4 text-center">
          <p className="text-sm opacity-70" style={{ color: 'var(--theme-text-secondary)' }}>
            💡 ESCキー または 背景クリック で閉じる
          </p>
        </div>
      </div>
    </div>
  )
}
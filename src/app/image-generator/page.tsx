'use client'

import { useState } from 'react'
import Link from 'next/link'
import { GeneratedImage } from '@/lib/openai'

export default function ImageGeneratorPage() {
  const [theme, setTheme] = useState('')
  const [generatedImage, setGeneratedImage] = useState<GeneratedImage | null>(null)
  const [loading, setLoading] = useState(false)
  const [currentTheme, setCurrentTheme] = useState('')

  const generateImage = async () => {
    if (!theme.trim()) {
      alert('テーマを入力してください')
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ theme: theme.trim() }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'SF画像の生成に失敗しました')
      }

      setGeneratedImage(data.image)
      setCurrentTheme(data.theme)
    } catch (error) {
      console.error('Error generating image:', error)
      alert(error instanceof Error ? error.message : 'SF画像の生成中にエラーが発生しました')
    } finally {
      setLoading(false)
    }
  }

  const downloadImage = () => {
    if (!generatedImage) return

    const link = document.createElement('a')
    link.href = `data:image/png;base64,${generatedImage.base64}`
    link.download = `sf-image-${currentTheme.replace(/\s+/g, '-')}.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-6">
          <Link href="/" className="hover:opacity-80 transition-opacity duration-300 flex items-center gap-2" style={{ color: 'var(--theme-accent)' }}>
            <span style={{ color: 'var(--theme-primary)' }}>←</span> IRON CINEMA に戻る
          </Link>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2" style={{ color: 'var(--theme-secondary)' }}>
            🎨 J.A.R.V.I.S. SF画像生成システム
          </h1>
          <p style={{ color: 'var(--theme-text-secondary)' }} className="text-lg">
            OpenAI Image-1モデルを使用してテーマベースSF画像を生成
          </p>
          <div 
            className="w-24 h-1 mx-auto mt-4 rounded-full"
            style={{ 
              background: `linear-gradient(to right, var(--theme-primary), var(--theme-secondary))` 
            }}
          ></div>
        </div>

        {/* テーマ入力セクション */}
        <div className="iron-card rounded-xl p-6 mb-8">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2" style={{ color: 'var(--theme-secondary)' }}>
            🎯 テーマ入力
          </h2>
          <p style={{ color: 'var(--theme-text-secondary)' }} className="text-sm mb-4">
            SF画像のテーマを入力してください（例：「サイバーパンク都市」「宇宙ステーション」「ロボット戦争」）
          </p>
          <div className="flex gap-3">
            <input
              type="text"
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              placeholder="SF画像のテーマを入力..."
              className="flex-1 px-4 py-3 bg-gray-800/50 border border-gray-600/30 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400/50 transition-all duration-300"
              onKeyDown={(e) => e.key === 'Enter' && generateImage()}
              disabled={loading}
            />
            <button
              onClick={generateImage}
              disabled={loading || !theme.trim()}
              className="iron-button text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? '🔄 生成中...' : '🚀 画像生成'}
            </button>
          </div>
        </div>

        {/* 生成結果 */}
        {generatedImage && (
          <div className="iron-card rounded-xl p-6 mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold" style={{ color: 'var(--theme-secondary)' }}>
                「{currentTheme}」のSF画像
              </h2>
              <button
                onClick={downloadImage}
                className="iron-button text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300"
              >
                📥 ダウンロード
              </button>
            </div>
            
            <div className="text-center">
              <img
                src={`data:image/png;base64,${generatedImage.base64}`}
                alt={`SF画像: ${currentTheme}`}
                className="max-w-full h-auto rounded-lg shadow-lg mx-auto"
                style={{ maxHeight: '600px' }}
              />
            </div>

            {generatedImage.revised_prompt && (
              <div className="mt-4 p-3 rounded-lg" style={{ backgroundColor: 'var(--theme-surface-light)' }}>
                <h3 className="font-semibold mb-2" style={{ color: 'var(--theme-accent)' }}>
                  生成プロンプト:
                </h3>
                <p style={{ color: 'var(--theme-text)' }} className="text-sm">
                  {generatedImage.revised_prompt}
                </p>
              </div>
            )}
          </div>
        )}

        {/* 空の状態 */}
        {!generatedImage && !loading && (
          <div className="text-center">
            <div className="iron-card iron-card-animated rounded-xl p-8 max-w-md mx-auto">
              <div className="text-4xl mb-4 animate-bounce" style={{ color: 'var(--theme-secondary)' }}>
                🎨
              </div>
              <p style={{ color: 'var(--theme-text)' }} className="text-lg">
                テーマを入力して、J.A.R.V.I.S.にSF画像を生成してもらいましょう！
              </p>
            </div>
          </div>
        )}

        {/* ローディング状態 */}
        {loading && (
          <div className="text-center">
            <div className="iron-card rounded-xl p-8 max-w-md mx-auto">
              <div className="animate-spin text-4xl mb-4" style={{ color: 'var(--theme-secondary)' }}>
                ⚡
              </div>
              <p style={{ color: 'var(--theme-text)' }} className="text-lg">
                J.A.R.V.I.S.が「{theme}」をテーマにSF画像を生成しています...
              </p>
              <p style={{ color: 'var(--theme-text-secondary)' }} className="text-sm mt-2">
                高品質な画像生成には1-2分かかる場合があります
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
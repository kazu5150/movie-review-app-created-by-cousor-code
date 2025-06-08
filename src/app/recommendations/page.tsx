'use client'

import { useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { RecommendedMovie } from '@/lib/openai'

export default function RecommendationsPage() {
  const [theme, setTheme] = useState('')
  const [recommendations, setRecommendations] = useState<RecommendedMovie[]>([])
  const [loading, setLoading] = useState(false)
  const [currentTheme, setCurrentTheme] = useState('')
  const [registering, setRegistering] = useState<string | null>(null)

  const fetchRecommendations = async () => {
    if (!theme.trim()) {
      alert('テーマを入力してください')
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/movie-recommendations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ theme: theme.trim() }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || '映画推薦の取得に失敗しました')
      }

      setRecommendations(data.recommendations)
      setCurrentTheme(data.theme)
    } catch (error) {
      console.error('Error fetching recommendations:', error)
      alert(error instanceof Error ? error.message : '映画推薦の取得中にエラーが発生しました')
    } finally {
      setLoading(false)
    }
  }

  const registerMovie = async (movie: RecommendedMovie) => {
    setRegistering(movie.title)
    try {
      const { error } = await supabase
        .from('movies')
        .insert([{
          title: movie.title,
          director: movie.director,
          year: movie.year,
          genre: movie.genre,
          description: movie.description,
          poster_url: movie.poster_url || null
        }])

      if (error) {
        console.error('Error registering movie:', error)
        alert('映画の登録に失敗しました')
      } else {
        alert(`「${movie.title}」を映画データベースに登録しました！`)
      }
    } catch (error) {
      console.error('Error:', error)
      alert('エラーが発生しました')
    } finally {
      setRegistering(null)
    }
  }

  const getSimilarityBadge = (score: number) => {
    if (score >= 0.9) return { label: 'PERFECT', color: 'var(--theme-secondary)' }
    if (score >= 0.8) return { label: 'EXCELLENT', color: 'var(--theme-accent)' }
    return { label: 'GOOD', color: 'var(--theme-primary)' }
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-6">
          <Link href="/" className="hover:opacity-80 transition-opacity duration-300 flex items-center gap-2" style={{ color: 'var(--theme-accent)' }}>
            <span style={{ color: 'var(--theme-primary)' }}>←</span> IRON CINEMA に戻る
          </Link>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2" style={{ color: 'var(--theme-secondary)' }}>
            🤖 J.A.R.V.I.S. 映画推薦システム
          </h1>
          <p style={{ color: 'var(--theme-text-secondary)' }} className="text-lg">
            あなたのテーマに基づいて最適なSF映画を推薦します
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
            興味のあるテーマ、感情、概念などを入力してください（例：「タイムトラベル」「人工知能」「宇宙探査」）
          </p>
          <div className="flex gap-3">
            <input
              type="text"
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              placeholder="映画のテーマを入力..."
              className="flex-1 px-4 py-3 bg-gray-800/50 border border-gray-600/30 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400/50 transition-all duration-300"
              onKeyDown={(e) => e.key === 'Enter' && fetchRecommendations()}
            />
            <button
              onClick={fetchRecommendations}
              disabled={loading || !theme.trim()}
              className="iron-button text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? '🔄 分析中...' : '🚀 推薦取得'}
            </button>
          </div>
        </div>

        {/* 推薦結果 */}
        {recommendations.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--theme-secondary)' }}>
              「{currentTheme}」のテーマに基づく推薦映画
            </h2>
            
            <div className="grid gap-6">
              {recommendations.map((movie, index) => {
                const badge = getSimilarityBadge(movie.similarity_score)
                return (
                  <div 
                    key={`${movie.title}-${index}`}
                    className="iron-card iron-card-animated rounded-xl overflow-hidden"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex flex-col md:flex-row">
                      {/* ポスター画像 */}
                      {movie.poster_url && (
                        <div className="md:w-48 flex-shrink-0">
                          <img
                            src={movie.poster_url}
                            alt={movie.title}
                            className="w-full h-64 md:h-full object-cover"
                          />
                        </div>
                      )}
                      
                      {/* 映画情報 */}
                      <div className="flex-1 p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold" style={{ color: 'var(--theme-secondary)' }}>
                            {movie.title}
                          </h3>
                          <span 
                            className="px-2 py-1 rounded text-xs font-bold text-white"
                            style={{ backgroundColor: badge.color }}
                          >
                            {badge.label}
                          </span>
                          <span style={{ color: 'var(--theme-text-secondary)' }} className="text-sm">
                            関連度: {(movie.similarity_score * 100).toFixed(0)}%
                          </span>
                        </div>
                        
                        <div className="grid gap-3 md:grid-cols-2 mb-4">
                          <div>
                            <span className="font-semibold" style={{ color: 'var(--theme-primary)' }}>監督:</span>
                            <span style={{ color: 'var(--theme-text-secondary)' }} className="ml-2">{movie.director}</span>
                          </div>
                          <div>
                            <span className="font-semibold" style={{ color: 'var(--theme-primary)' }}>年:</span>
                            <span style={{ color: 'var(--theme-text-secondary)' }} className="ml-2">{movie.year}</span>
                          </div>
                        </div>
                        
                        <p style={{ color: 'var(--theme-text-secondary)' }} className="mb-3">
                          {movie.description}
                        </p>
                        
                        <div className="mb-4 p-3 rounded-lg" style={{ backgroundColor: 'var(--theme-surface-light)' }}>
                          <span className="font-semibold" style={{ color: 'var(--theme-accent)' }}>推薦理由:</span>
                          <span style={{ color: 'var(--theme-text)' }} className="ml-2">{movie.reason}</span>
                        </div>
                      </div>
                    </div>
                    
                        <div className="flex gap-3">
                          <button
                            onClick={() => registerMovie(movie)}
                            disabled={registering === movie.title}
                            className="iron-button text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {registering === movie.title ? '⚡ 登録中...' : '📽️ データベースに登録'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* 空の状態 */}
        {recommendations.length === 0 && !loading && (
          <div className="text-center">
            <div className="iron-card iron-card-animated rounded-xl p-8 max-w-md mx-auto">
              <div className="text-4xl mb-4 animate-bounce" style={{ color: 'var(--theme-secondary)' }}>
                🤖
              </div>
              <p style={{ color: 'var(--theme-text)' }} className="text-lg">
                テーマを入力して、J.A.R.V.I.S.にSF映画を推薦してもらいましょう！
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
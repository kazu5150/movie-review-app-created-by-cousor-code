'use client'

import { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { Movie } from '@/types/movie'
import ThemeToggle from '@/components/ThemeToggle'

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [allMovies, setAllMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    fetchMovies()
  }, [])

  const handleSearch = useCallback(() => {
    if (!searchQuery.trim()) {
      setMovies(allMovies)
      return
    }

    const query = searchQuery.toLowerCase()
    const filteredMovies = allMovies.filter(movie =>
      movie.title.toLowerCase().includes(query) ||
      movie.director.toLowerCase().includes(query) ||
      movie.genre.toLowerCase().includes(query) ||
      movie.description.toLowerCase().includes(query)
    )
    setMovies(filteredMovies)
  }, [searchQuery, allMovies])

  useEffect(() => {
    handleSearch()
  }, [handleSearch])

  const fetchMovies = async () => {
    try {
      const { data, error } = await supabase
        .from('movies')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching movies:', error)
      } else {
        setMovies(data || [])
        setAllMovies(data || [])
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold iron-glow text-yellow-400 mb-2">
              🎬 IRON CINEMA
            </h1>
            <p className="text-gray-300 text-lg">Powered by Arc Reactor Technology</p>
          </div>
          <div className="text-center text-yellow-400 text-lg animate-pulse">
            ⚡ システム起動中...
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8 relative">
          <div className="absolute top-0 right-0">
            <ThemeToggle />
          </div>
          <h1 className="text-5xl font-bold iron-title mb-2" style={{ color: 'var(--theme-secondary)' }}>
            🎬 IRON CINEMA
          </h1>
          <p className="iron-nav text-lg" style={{ color: 'var(--theme-text-secondary)' }}>
            Powered by Arc Reactor Technology
          </p>
          <div 
            className="w-24 h-1 mx-auto mt-4 rounded-full iron-divider"
            style={{ 
              background: `linear-gradient(to right, var(--theme-primary), var(--theme-secondary))` 
            }}
          ></div>
        </div>
        
        <div className="mb-8 text-center space-y-6">
          <div className="max-w-2xl mx-auto">
            <div className="relative mb-6">
              <input
                type="text"
                placeholder="🔍 映画を検索... (タイトル、監督、ジャンル、概要)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 rounded-xl bg-gray-800/50 border-2 border-gray-700/50 text-white placeholder-gray-400 focus:border-yellow-400/50 focus:outline-none transition-all duration-300 text-lg iron-card"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-yellow-400 transition-colors duration-300"
                >
                  ✕
                </button>
              )}
            </div>
            {searchQuery && (
              <p className="text-gray-400 text-sm mb-4">
&quot;{searchQuery}&quot; の検索結果: {movies.length}件
              </p>
            )}
          </div>
          
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 max-w-5xl mx-auto">
            <Link
              href="/add-movie"
              className="iron-button iron-button-animated text-white px-6 py-4 rounded-lg font-semibold text-center transition-all duration-300 inline-block"
            >
              <div className="text-2xl mb-1">⚡</div>
              <div>新しい映画を追加</div>
              <div className="text-xs opacity-70">Add Movie</div>
            </Link>
            <Link
              href="/recommendations"
              className="iron-button text-white px-6 py-4 rounded-lg font-semibold text-center transition-all duration-300 inline-block"
              style={{ animationDelay: '0.2s' }}
            >
              <div className="text-2xl mb-1">🤖</div>
              <div>AI映画推薦</div>
              <div className="text-xs opacity-70">J.A.R.V.I.S. Recommends</div>
            </Link>
            <Link
              href="/image-generator"
              className="iron-button text-white px-6 py-4 rounded-lg font-semibold text-center transition-all duration-300 inline-block"
              style={{ animationDelay: '0.4s' }}
            >
              <div className="text-2xl mb-1">🎨</div>
              <div>SF画像生成</div>
              <div className="text-xs opacity-70">AI Image Generator</div>
            </Link>
            <Link
              href="/intelligence"
              className="iron-button text-white px-6 py-4 rounded-lg font-semibold text-center transition-all duration-300 inline-block"
              style={{ animationDelay: '0.6s' }}
            >
              <div className="text-2xl mb-1">🛡️</div>
              <div>インテリジェンス</div>
              <div className="text-xs opacity-70">S.H.I.E.L.D. Report</div>
            </Link>
          </div>
          <div className="pt-2">
            <Link
              href="/admin"
              className="text-gray-400 hover:text-yellow-400 text-sm transition-colors duration-300"
            >
              ⚙️ 管理パネル（サンプルデータ投入）
            </Link>
          </div>
        </div>

        {movies.length === 0 ? (
          <div className="text-center">
            <div className="iron-card iron-card-animated rounded-xl p-8 max-w-md mx-auto">
              <div className="text-yellow-400 text-4xl mb-4 animate-bounce">
                {searchQuery ? '🔍' : '🤖'}
              </div>
              <p className="text-gray-300 text-lg">
                {searchQuery ? (
                  <>
                    検索条件 &quot;{searchQuery}&quot; に一致する映画が見つかりませんでした。<br />
                    別のキーワードで検索してみてください。
                  </>
                ) : (
                  <>
                    データベースが空です。<br />
                    最初の映画を追加してシステムを起動しましょう！
                  </>
                )}
              </p>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {movies.map((movie, index) => (
              <div 
                key={movie.id} 
                className="iron-card iron-card-animated rounded-xl overflow-hidden transition-all duration-300"
                style={{
                  animationDelay: `${Math.min(index + 1, 6) * 0.1}s`
                }}
              >
                {movie.poster_url && (
                  <Link href={`/movie/${movie.id}`} className="block aspect-[2/3] overflow-hidden group">
                    <img
                      src={movie.poster_url}
                      alt={movie.title}
                      className="w-full h-full object-cover border-b-2 border-yellow-400/30 transition-transform duration-300 group-hover:scale-105 cursor-pointer"
                    />
                  </Link>
                )}
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--theme-secondary)' }}>
                    {movie.title}
                  </h2>
                  <div className="space-y-2 mb-4" style={{ color: 'var(--theme-text-secondary)' }}>
                    <p>
                      <span className="font-semibold" style={{ color: 'var(--theme-primary)' }}>監督:</span> {movie.director}
                    </p>
                    <p>
                      <span className="font-semibold" style={{ color: 'var(--theme-primary)' }}>年:</span> {movie.year}
                    </p>
                    <p>
                      <span className="font-semibold" style={{ color: 'var(--theme-primary)' }}>ジャンル:</span> {movie.genre}
                    </p>
                  </div>
                  <p className="mb-4 line-clamp-3" style={{ color: 'var(--theme-text-secondary)' }}>
                    {movie.description}
                  </p>
                  <div className="flex gap-2">
                    <Link
                      href={`/movie/${movie.id}`}
                      className="flex-1 font-semibold transition-colors duration-300 flex items-center gap-2"
                      style={{ color: 'var(--theme-secondary)' }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = 'var(--theme-accent)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = 'var(--theme-secondary)'
                      }}
                    >
                      詳細スキャン開始 <span style={{ color: 'var(--theme-primary)' }}>→</span>
                    </Link>
                    <Link
                      href={`/edit-movie/${movie.id}`}
                      className="px-3 py-1 text-sm bg-blue-600/20 border border-blue-500/30 text-blue-400 hover:bg-blue-600/30 hover:text-blue-300 rounded transition-colors duration-300"
                    >
                      編集
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

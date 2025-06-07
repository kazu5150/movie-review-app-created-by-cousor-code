'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { Movie } from '@/types/movie'

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchMovies()
  }, [])

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
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold iron-title text-yellow-400 mb-2">
            🎬 IRON CINEMA
          </h1>
          <p className="text-gray-300 text-lg iron-nav">Powered by Arc Reactor Technology</p>
          <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-yellow-400 mx-auto mt-4 rounded-full iron-divider"></div>
        </div>
        
        <div className="mb-8 text-center space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/add-movie"
              className="iron-button iron-button-animated text-white px-8 py-3 rounded-lg font-semibold text-lg transition-all duration-300 inline-block"
            >
              ⚡ 新しい映画を追加
            </Link>
            <Link
              href="/stats"
              className="iron-button text-white px-8 py-3 rounded-lg font-semibold text-lg transition-all duration-300 inline-block"
              style={{ animationDelay: '0.2s' }}
            >
              📊 データ解析レポート
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
              <div className="text-yellow-400 text-4xl mb-4 animate-bounce">🤖</div>
              <p className="text-gray-300 text-lg">
                データベースが空です。<br />
                最初の映画を追加してシステムを起動しましょう！
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
                  <div className="aspect-[2/3] overflow-hidden">
                    <img
                      src={movie.poster_url}
                      alt={movie.title}
                      className="w-full h-full object-cover border-b-2 border-yellow-400/30"
                    />
                  </div>
                )}
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-3 text-yellow-400">{movie.title}</h2>
                  <div className="space-y-2 mb-4 text-gray-300">
                    <p><span className="text-red-400 font-semibold">監督:</span> {movie.director}</p>
                    <p><span className="text-red-400 font-semibold">年:</span> {movie.year}</p>
                    <p><span className="text-red-400 font-semibold">ジャンル:</span> {movie.genre}</p>
                  </div>
                  <p className="text-gray-400 mb-4 line-clamp-3">{movie.description}</p>
                  <div className="flex gap-2">
                    <Link
                      href={`/movie/${movie.id}`}
                      className="flex-1 text-yellow-400 hover:text-yellow-300 font-semibold transition-colors duration-300 flex items-center gap-2"
                    >
                      詳細スキャン開始 <span className="text-red-400">→</span>
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

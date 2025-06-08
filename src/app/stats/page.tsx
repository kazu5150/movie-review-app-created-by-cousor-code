'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { getMovieStats, MovieStats } from '@/lib/stats'

export default function StatsPage() {
  const [stats, setStats] = useState<MovieStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const data = await getMovieStats()
      setStats(data)
    } catch (error) {
      console.error('統計データの取得に失敗:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center text-yellow-400 text-lg animate-pulse">
            ⚡ データ解析中...
          </div>
        </div>
      </div>
    )
  }

  if (!stats) {
    return (
      <div className="min-h-screen py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center">
            <div className="iron-card rounded-xl p-8 max-w-md mx-auto">
              <div className="text-red-400 text-4xl mb-4">⚠️</div>
              <p className="text-gray-300">データの取得に失敗しました</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-6">
          <Link href="/" className="text-yellow-400 hover:text-yellow-300 font-semibold transition-colors duration-300 flex items-center gap-2">
            <span className="text-red-400">←</span> IRON CINEMA に戻る
          </Link>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold iron-title text-yellow-400 mb-2">
            📊 データベース解析レポート
          </h1>
          <p className="text-gray-300 text-lg">Arc Reactor Analytics System</p>
          <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-yellow-400 mx-auto mt-4 rounded-full iron-divider"></div>
        </div>

        {/* 概要統計 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="iron-card iron-card-animated rounded-xl p-6 text-center">
            <div className="text-3xl text-yellow-400 mb-2">🎬</div>
            <div className="text-2xl font-bold text-white mb-1">{stats.totalMovies}</div>
            <div className="text-gray-400">総映画数</div>
          </div>
          <div className="iron-card iron-card-animated rounded-xl p-6 text-center stagger-2">
            <div className="text-3xl text-yellow-400 mb-2">📝</div>
            <div className="text-2xl font-bold text-white mb-1">{stats.totalReviews}</div>
            <div className="text-gray-400">総レビュー数</div>
          </div>
          <div className="iron-card iron-card-animated rounded-xl p-6 text-center stagger-3">
            <div className="text-3xl text-yellow-400 mb-2">⭐</div>
            <div className="text-2xl font-bold text-white mb-1">{stats.averageRating.toFixed(1)}</div>
            <div className="text-gray-400">平均評価</div>
          </div>
          <div className="iron-card iron-card-animated rounded-xl p-6 text-center stagger-4">
            <div className="text-3xl text-yellow-400 mb-2">📈</div>
            <div className="text-2xl font-bold text-white mb-1">
              {stats.totalReviews > 0 ? (stats.totalReviews / stats.totalMovies).toFixed(1) : '0'}
            </div>
            <div className="text-gray-400">映画あたりレビュー数</div>
          </div>
        </div>

        {/* チャートセクション */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* ジャンル別分布 */}
          <div className="iron-card rounded-xl p-6">
            <h2 className="text-2xl font-bold text-yellow-400 mb-6 flex items-center gap-2">
              🎭 ジャンル別分布
            </h2>
            {stats.genreDistribution.length > 0 ? (
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={stats.genreDistribution}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {stats.genreDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#374151', 
                        border: '1px solid #fbbf24',
                        borderRadius: '8px',
                        color: '#f9fafb'
                      }} 
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="text-center text-gray-400 py-16">データがありません</div>
            )}
          </div>

          {/* 年別映画数 */}
          <div className="iron-card rounded-xl p-6">
            <h2 className="text-2xl font-bold text-yellow-400 mb-6 flex items-center gap-2">
              📅 年別映画数
            </h2>
            {stats.yearDistribution.length > 0 ? (
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={stats.yearDistribution}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis 
                      dataKey="year" 
                      stroke="#9ca3af"
                      fontSize={12}
                    />
                    <YAxis 
                      stroke="#9ca3af"
                      fontSize={12}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#374151', 
                        border: '1px solid #fbbf24',
                        borderRadius: '8px',
                        color: '#f9fafb'
                      }} 
                    />
                    <Bar dataKey="count" fill="#fbbf24" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="text-center text-gray-400 py-16">データがありません</div>
            )}
          </div>
        </div>

        {/* 評価分布とトップ映画 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 評価分布 */}
          <div className="iron-card rounded-xl p-6">
            <h2 className="text-2xl font-bold text-yellow-400 mb-6 flex items-center gap-2">
              ⭐ 評価分布
            </h2>
            {stats.ratingDistribution.some(item => item.count > 0) ? (
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={stats.ratingDistribution}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis 
                      dataKey="rating" 
                      stroke="#9ca3af"
                      fontSize={12}
                    />
                    <YAxis 
                      stroke="#9ca3af"
                      fontSize={12}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#374151', 
                        border: '1px solid #fbbf24',
                        borderRadius: '8px',
                        color: '#f9fafb'
                      }} 
                    />
                    <Bar dataKey="count" fill="#dc2626" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="text-center text-gray-400 py-16">レビューがありません</div>
            )}
          </div>

          {/* トップ映画 */}
          <div className="iron-card rounded-xl p-6">
            <h2 className="text-2xl font-bold text-yellow-400 mb-6 flex items-center gap-2">
              🏆 高評価映画トップ5
            </h2>
            {stats.topRatedMovies.length > 0 ? (
              <div className="space-y-4">
                {stats.topRatedMovies.map((movie, index) => (
                  <div key={movie.id} className="flex items-center gap-4 p-4 bg-gray-800/50 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-400">#{index + 1}</div>
                    <div className="flex-1">
                      <h3 className="font-bold text-white">{movie.title}</h3>
                      <p className="text-gray-400 text-sm">{movie.director} ({movie.year})</p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-yellow-400">
                        ⭐ {movie.avgRating.toFixed(1)}
                      </div>
                      <div className="text-sm text-gray-400">
                        {movie.reviewCount}件のレビュー
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-400 py-16">レビューのある映画がありません</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
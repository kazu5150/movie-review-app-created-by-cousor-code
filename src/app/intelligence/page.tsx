'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { Movie, Review } from '@/types/movie'
import { ReviewAnalyticsEngine, ReviewAnalytics } from '@/lib/reviewAnalytics'
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts'

export default function IntelligencePage() {
  const [analytics, setAnalytics] = useState<ReviewAnalytics | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedTab, setSelectedTab] = useState<'overview' | 'reviewers' | 'movies' | 'sentiment'>('overview')

  useEffect(() => {
    fetchAnalytics()
  }, [])

  const fetchAnalytics = async () => {
    try {
      setLoading(true)
      
      // 映画とレビューデータを取得
      const [moviesResult, reviewsResult] = await Promise.all([
        supabase.from('movies').select('*'),
        supabase.from('reviews').select('*')
      ])

      if (moviesResult.error || reviewsResult.error) {
        console.error('Error fetching data:', moviesResult.error || reviewsResult.error)
        return
      }

      const movies: Movie[] = moviesResult.data || []
      const reviews: Review[] = reviewsResult.data || []

      // 分析エンジンでデータを処理
      const engine = new ReviewAnalyticsEngine()
      const analyticsData = engine.generateFullAnalytics(movies, reviews)
      
      setAnalytics(analyticsData)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatSentimentLabel = (label: string) => {
    switch (label) {
      case 'positive': return 'ポジティブ'
      case 'negative': return 'ネガティブ'
      default: return 'ニュートラル'
    }
  }

  const getSentimentColor = (label: string) => {
    switch (label) {
      case 'positive': return 'var(--theme-secondary)'
      case 'negative': return 'var(--theme-primary)'
      default: return 'var(--theme-accent)'
    }
  }

  const getQualityBadge = (score: number) => {
    if (score >= 0.8) return { label: 'ELITE', color: 'var(--theme-secondary)' }
    if (score >= 0.6) return { label: 'EXPERT', color: 'var(--theme-accent)' }
    if (score >= 0.4) return { label: 'SKILLED', color: 'var(--theme-primary)' }
    return { label: 'NOVICE', color: 'var(--theme-text-secondary)' }
  }

  if (loading) {
    return (
      <div className="min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <div className="iron-card iron-card-animated rounded-xl p-8 max-w-md mx-auto">
              <div className="text-4xl mb-4 animate-pulse" style={{ color: 'var(--theme-secondary)' }}>
                🛡️
              </div>
              <p style={{ color: 'var(--theme-text)' }} className="text-lg">
                S.H.I.E.L.D. インテリジェンス分析中...
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!analytics) {
    return (
      <div className="min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <div className="iron-card rounded-xl p-8 max-w-md mx-auto">
              <div className="text-4xl mb-4" style={{ color: 'var(--theme-primary)' }}>⚠️</div>
              <p style={{ color: 'var(--theme-text)' }} className="text-lg mb-4">
                インテリジェンスデータの取得に失敗しました。
              </p>
              <button
                onClick={fetchAnalytics}
                className="iron-button text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300"
              >
                再スキャン実行
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const sentimentData = [
    { name: 'ポジティブ', value: analytics.sentimentDistribution.positive, color: 'var(--theme-secondary)' },
    { name: 'ニュートラル', value: analytics.sentimentDistribution.neutral, color: 'var(--theme-accent)' },
    { name: 'ネガティブ', value: analytics.sentimentDistribution.negative, color: 'var(--theme-primary)' }
  ]

  const qualityData = [
    { name: 'レビュー長', value: Math.min(100, analytics.qualityMetrics.averageReviewLength / 2) },
    { name: '専門性', value: analytics.qualityMetrics.expertiseLevel * 20 },
    { name: '客観性', value: analytics.qualityMetrics.objectivity }
  ]

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* ヘッダー */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2" style={{ color: 'var(--theme-secondary)' }}>
            🛡️ S.H.I.E.L.D. インテリジェンス・レポート
          </h1>
          <p style={{ color: 'var(--theme-text-secondary)' }} className="text-lg mb-4">
            Strategic Homeland Intelligence for Entertainment & Level-Assessment Division
          </p>
          <div className="flex justify-center">
            <Link
              href="/"
              className="text-sm hover:opacity-80 transition-opacity duration-300"
              style={{ color: 'var(--theme-accent)' }}
            >
              ← IRON CINEMA メインに戻る
            </Link>
          </div>
        </div>

        {/* タブナビゲーション */}
        <div className="mb-8">
          <div className="flex flex-wrap justify-center gap-2">
            {[
              { key: 'overview', label: '🎯 概要', desc: 'Overview' },
              { key: 'reviewers', label: '👥 エージェント', desc: 'Reviewers' },
              { key: 'movies', label: '🎬 ターゲット', desc: 'Movies' },
              { key: 'sentiment', label: '🧠 感情分析', desc: 'Sentiment' }
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setSelectedTab(tab.key as 'overview' | 'reviewers' | 'movies' | 'sentiment')}
                className={`px-4 py-3 rounded-lg font-semibold text-sm transition-all duration-300 ${
                  selectedTab === tab.key 
                    ? 'iron-button text-white' 
                    : 'iron-card hover:opacity-80'
                }`}
                style={selectedTab !== tab.key ? { color: 'var(--theme-text)' } : {}}
              >
                <div>{tab.label}</div>
                <div className="text-xs opacity-70">{tab.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* コンテンツエリア */}
        <div className="space-y-8">
          {selectedTab === 'overview' && (
            <>
              {/* 統計サマリー */}
              <div className="grid gap-6 md:grid-cols-3">
                <div className="iron-card rounded-xl p-6 text-center">
                  <div className="text-3xl font-bold mb-2" style={{ color: 'var(--theme-secondary)' }}>
                    {analytics.totalReviews}
                  </div>
                  <div style={{ color: 'var(--theme-text-secondary)' }}>総レビュー数</div>
                  <div className="text-sm opacity-70" style={{ color: 'var(--theme-text-secondary)' }}>
                    Total Reviews
                  </div>
                </div>
                
                <div className="iron-card rounded-xl p-6 text-center">
                  <div className="text-3xl font-bold mb-2" style={{ color: 'var(--theme-secondary)' }}>
                    {analytics.averageRating}/5
                  </div>
                  <div style={{ color: 'var(--theme-text-secondary)' }}>平均評価</div>
                  <div className="text-sm opacity-70" style={{ color: 'var(--theme-text-secondary)' }}>
                    Average Rating
                  </div>
                </div>
                
                <div className="iron-card rounded-xl p-6 text-center">
                  <div className="text-3xl font-bold mb-2" style={{ color: 'var(--theme-secondary)' }}>
                    {analytics.topReviewers.length}
                  </div>
                  <div style={{ color: 'var(--theme-text-secondary)' }}>アクティブエージェント</div>
                  <div className="text-sm opacity-70" style={{ color: 'var(--theme-text-secondary)' }}>
                    Active Agents
                  </div>
                </div>
              </div>

              {/* 感情分布とレビュー品質 */}
              <div className="grid gap-8 lg:grid-cols-2">
                <div className="iron-card rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-4" style={{ color: 'var(--theme-secondary)' }}>
                    感情分析分布
                  </h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={sentimentData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {sentimentData.map((entry, idx) => (
                          <Cell key={`cell-${idx}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value: number) => [`${(value * 100).toFixed(1)}%`, '割合']}
                        contentStyle={{
                          backgroundColor: 'var(--theme-surface)',
                          border: '1px solid var(--theme-border)',
                          borderRadius: '8px',
                          color: 'var(--theme-text)'
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="iron-card rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-4" style={{ color: 'var(--theme-secondary)' }}>
                    レビュー品質分析
                  </h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <RadarChart data={qualityData}>
                      <PolarGrid stroke="var(--theme-border)" />
                      <PolarAngleAxis dataKey="name" tick={{ fill: 'var(--theme-text-secondary)', fontSize: 12 }} />
                      <PolarRadiusAxis 
                        angle={0} 
                        domain={[0, 100]} 
                        tick={{ fill: 'var(--theme-text-secondary)', fontSize: 10 }} 
                      />
                      <Radar
                        name="品質スコア"
                        dataKey="value"
                        stroke="var(--theme-secondary)"
                        fill="var(--theme-secondary)"
                        fillOpacity={0.3}
                        strokeWidth={2}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* トレンドキーワード */}
              <div className="iron-card rounded-xl p-6">
                <h3 className="text-xl font-bold mb-4" style={{ color: 'var(--theme-secondary)' }}>
                  🔥 トレンドキーワード
                </h3>
                <div className="flex flex-wrap gap-3">
                  {analytics.trendingTopics.map((keyword, index) => (
                    <span
                      key={keyword}
                      className="px-4 py-2 rounded-full text-sm font-semibold"
                      style={{
                        backgroundColor: 'var(--theme-surface-light)',
                        color: 'var(--theme-secondary)',
                        border: '1px solid var(--theme-border)'
                      }}
                    >
                      #{keyword}
                    </span>
                  ))}
                </div>
              </div>
            </>
          )}

          {selectedTab === 'reviewers' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold" style={{ color: 'var(--theme-secondary)' }}>
                👥 エージェント（レビュアー）ランキング
              </h2>
              
              <div className="grid gap-4">
                {analytics.topReviewers.map((reviewer, index) => {
                  const badge = getQualityBadge(reviewer.reviewQuality)
                  return (
                    <div key={reviewer.name} className="iron-card rounded-xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <div className="text-2xl font-bold" style={{ color: 'var(--theme-accent)' }}>
                            #{index + 1}
                          </div>
                          <div>
                            <h3 className="text-lg font-bold" style={{ color: 'var(--theme-secondary)' }}>
                              {reviewer.name}
                            </h3>
                            <div className="flex items-center gap-2">
                              <span 
                                className="px-2 py-1 rounded text-xs font-bold"
                                style={{ 
                                  backgroundColor: badge.color,
                                  color: 'white'
                                }}
                              >
                                {badge.label}
                              </span>
                              <span style={{ color: 'var(--theme-text-secondary)' }} className="text-sm">
                                影響力: {(reviewer.influence * 100).toFixed(0)}%
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold" style={{ color: 'var(--theme-secondary)' }}>
                            {reviewer.averageRating}/5
                          </div>
                          <div style={{ color: 'var(--theme-text-secondary)' }} className="text-sm">
                            {reviewer.totalReviews}件のレビュー
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <div style={{ color: 'var(--theme-text-secondary)' }} className="text-sm mb-2">
                            専門分野:
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {reviewer.expertise.length > 0 ? 
                              reviewer.expertise.map(exp => (
                                <span 
                                  key={exp}
                                  className="px-2 py-1 rounded text-xs"
                                  style={{ 
                                    backgroundColor: 'var(--theme-surface-light)',
                                    color: 'var(--theme-accent)'
                                  }}
                                >
                                  {exp}
                                </span>
                              )) :
                              <span style={{ color: 'var(--theme-text-secondary)' }} className="text-sm">
                                一般
                              </span>
                            }
                          </div>
                        </div>
                        
                        <div>
                          <div style={{ color: 'var(--theme-text-secondary)' }} className="text-sm mb-2">
                            評価傾向:
                          </div>
                          <span 
                            className="px-2 py-1 rounded text-xs font-semibold"
                            style={{ 
                              backgroundColor: reviewer.bias.rating === 'lenient' ? 'var(--theme-secondary)' :
                                             reviewer.bias.rating === 'harsh' ? 'var(--theme-primary)' : 'var(--theme-accent)',
                              color: 'white'
                            }}
                          >
                            {reviewer.bias.rating === 'lenient' ? '寛容' :
                             reviewer.bias.rating === 'harsh' ? '厳格' : 'バランス型'}
                          </span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {selectedTab === 'movies' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold" style={{ color: 'var(--theme-secondary)' }}>
                🎬 映画インテリジェンス分析
              </h2>
              
              <div className="grid gap-6">
                {analytics.movieIntelligence.map((movie) => (
                  <div key={movie.movieId} className="iron-card rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold" style={{ color: 'var(--theme-secondary)' }}>
                        {movie.title}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span 
                          className="px-3 py-1 rounded-full text-sm font-bold"
                          style={{ 
                            backgroundColor: getSentimentColor(movie.overallSentiment.label),
                            color: 'white'
                          }}
                        >
                          {formatSentimentLabel(movie.overallSentiment.label)}
                        </span>
                        <span style={{ color: 'var(--theme-text-secondary)' }} className="text-sm">
                          信頼度: {(movie.overallSentiment.confidence * 100).toFixed(0)}%
                        </span>
                      </div>
                    </div>
                    
                    <div className="grid gap-4 md:grid-cols-4 mb-4">
                      <div className="text-center">
                        <div className="text-lg font-bold" style={{ color: 'var(--theme-accent)' }}>
                          {(movie.universalAppeal * 100).toFixed(0)}%
                        </div>
                        <div style={{ color: 'var(--theme-text-secondary)' }} className="text-xs">
                          普遍的魅力
                        </div>
                      </div>
                      
                      <div className="text-center">
                        <div className="text-lg font-bold" style={{ color: 'var(--theme-accent)' }}>
                          {(movie.technicalAchievement * 100).toFixed(0)}%
                        </div>
                        <div style={{ color: 'var(--theme-text-secondary)' }} className="text-xs">
                          技術的達成度
                        </div>
                      </div>
                      
                      <div className="text-center">
                        <div className="text-lg font-bold" style={{ color: 'var(--theme-accent)' }}>
                          {(movie.culturalImpact * 100).toFixed(0)}%
                        </div>
                        <div style={{ color: 'var(--theme-text-secondary)' }} className="text-xs">
                          文化的影響
                        </div>
                      </div>
                      
                      <div className="text-center">
                        <div className="text-lg font-bold" style={{ color: 'var(--theme-accent)' }}>
                          {(movie.controversy * 100).toFixed(0)}%
                        </div>
                        <div style={{ color: 'var(--theme-text-secondary)' }} className="text-xs">
                          論争度
                        </div>
                      </div>
                    </div>
                    
                    {movie.topKeywords.length > 0 && (
                      <div>
                        <div style={{ color: 'var(--theme-text-secondary)' }} className="text-sm mb-2">
                          関連キーワード:
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {movie.topKeywords.map(keyword => (
                            <span 
                              key={keyword}
                              className="px-2 py-1 rounded text-xs"
                              style={{ 
                                backgroundColor: 'var(--theme-surface-light)',
                                color: 'var(--theme-secondary)'
                              }}
                            >
                              {keyword}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'sentiment' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold" style={{ color: 'var(--theme-secondary)' }}>
                🧠 詳細感情分析
              </h2>
              
              <div className="grid gap-6 lg:grid-cols-2">
                <div className="iron-card rounded-xl p-6">
                  <h3 className="text-lg font-bold mb-4" style={{ color: 'var(--theme-secondary)' }}>
                    感情分布詳細
                  </h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={sentimentData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--theme-border)" />
                      <XAxis 
                        dataKey="name" 
                        tick={{ fill: 'var(--theme-text-secondary)', fontSize: 12 }}
                      />
                      <YAxis 
                        tick={{ fill: 'var(--theme-text-secondary)', fontSize: 12 }}
                        tickFormatter={(value) => `${(value * 100).toFixed(0)}%`}
                      />
                      <Tooltip 
                        formatter={(value: number) => [`${(value * 100).toFixed(1)}%`, '割合']}
                        contentStyle={{
                          backgroundColor: 'var(--theme-surface)',
                          border: '1px solid var(--theme-border)',
                          borderRadius: '8px',
                          color: 'var(--theme-text)'
                        }}
                      />
                      <Bar dataKey="value" fill="var(--theme-secondary)" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="iron-card rounded-xl p-6">
                  <h3 className="text-lg font-bold mb-4" style={{ color: 'var(--theme-secondary)' }}>
                    感情分析統計
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span style={{ color: 'var(--theme-text-secondary)' }}>
                        最も多い感情:
                      </span>
                      <span style={{ color: 'var(--theme-secondary)' }} className="font-bold">
                        {sentimentData.reduce((max, current) => 
                          current.value > max.value ? current : max
                        ).name}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span style={{ color: 'var(--theme-text-secondary)' }}>
                        ポジティブ率:
                      </span>
                      <span style={{ color: 'var(--theme-secondary)' }} className="font-bold">
                        {(analytics.sentimentDistribution.positive * 100).toFixed(1)}%
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span style={{ color: 'var(--theme-text-secondary)' }}>
                        レビュー品質:
                      </span>
                      <span style={{ color: 'var(--theme-secondary)' }} className="font-bold">
                        {(analytics.qualityMetrics.objectivity * 100).toFixed(0)}%
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span style={{ color: 'var(--theme-text-secondary)' }}>
                        平均レビュー長:
                      </span>
                      <span style={{ color: 'var(--theme-secondary)' }} className="font-bold">
                        {analytics.qualityMetrics.averageReviewLength}文字
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
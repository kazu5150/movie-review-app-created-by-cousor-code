'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { Movie, Review } from '@/types/movie'
import PosterModal from '@/components/PosterModal'

export default function MovieDetail() {
  const params = useParams()
  const router = useRouter()
  const [movie, setMovie] = useState<Movie | null>(null)
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [showPosterModal, setShowPosterModal] = useState(false)
  const [reviewForm, setReviewForm] = useState({
    reviewer_name: '',
    rating: 5,
    comment: ''
  })

  useEffect(() => {
    if (params.id) {
      fetchMovieAndReviews()
    }
  }, [params.id])

  // ページがフォーカスされた時にデータを再取得
  useEffect(() => {
    const handleFocus = () => {
      if (params.id) {
        fetchMovieAndReviews()
      }
    }

    window.addEventListener('focus', handleFocus)
    return () => window.removeEventListener('focus', handleFocus)
  }, [params.id])

  const fetchMovieAndReviews = async () => {
    try {
      const [movieResponse, reviewsResponse] = await Promise.all([
        supabase.from('movies').select('*').eq('id', params.id).single(),
        supabase.from('reviews').select('*').eq('movie_id', params.id).order('created_at', { ascending: false })
      ])

      if (movieResponse.error) {
        console.error('Error fetching movie:', movieResponse.error)
        router.push('/')
        return
      }

      setMovie(movieResponse.data)
      setReviews(reviewsResponse.data || [])
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const { error } = await supabase
        .from('reviews')
        .insert([{
          movie_id: params.id,
          reviewer_name: reviewForm.reviewer_name,
          rating: reviewForm.rating,
          comment: reviewForm.comment
        }])

      if (error) {
        console.error('Error adding review:', error)
        alert('⚠️ レポート送信に失敗しました')
      } else {
        setReviewForm({ reviewer_name: '', rating: 5, comment: '' })
        setShowReviewForm(false)
        fetchMovieAndReviews()
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const averageRating = reviews.length > 0 
    ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
    : 0

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

  if (!movie) {
    return (
      <div className="min-h-screen py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center">
            <div className="iron-card rounded-xl p-8 max-w-md mx-auto">
              <div className="text-red-400 text-4xl mb-4">⚠️</div>
              <p className="text-gray-300">データが見つかりません</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-6">
          <Link href="/" className="text-yellow-400 hover:text-yellow-300 font-semibold transition-colors duration-300 flex items-center gap-2">
            <span className="text-red-400">←</span> IRON CINEMA に戻る
          </Link>
        </div>

        <div className="iron-card rounded-xl p-8 mb-8">
          <div className="grid md:grid-cols-[250px_1fr] gap-8">
            {movie.poster_url && (
              <div className="relative group">
                <button
                  onClick={() => setShowPosterModal(true)}
                  className="block w-full transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 rounded-lg"
                  aria-label="ポスターを拡大表示"
                >
                  <img
                    src={movie.poster_url}
                    alt={movie.title}
                    className="w-full h-auto rounded-lg border-2 transition-all duration-300 cursor-pointer"
                    style={{ 
                      borderColor: 'var(--theme-border)',
                      filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))'
                    }}
                  />
                  
                  {/* ホバー時のオーバーレイ */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
                    <div className="text-white text-center">
                      <div className="text-4xl mb-2">🔍</div>
                      <div className="font-bold text-lg">拡大表示</div>
                      <div className="text-sm opacity-80">クリックで詳細表示</div>
                    </div>
                  </div>
                </button>
              </div>
            )}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-4xl font-bold iron-glow" style={{ color: 'var(--theme-secondary)' }}>
                  {movie.title}
                </h1>
                <Link
                  href={`/edit-movie/${movie.id}`}
                  className="px-4 py-2 bg-blue-600/20 border border-blue-500/30 text-blue-400 hover:bg-blue-600/30 hover:text-blue-300 rounded transition-colors duration-300 font-semibold"
                >
                  ✏️ 編集
                </Link>
              </div>
              <div className="space-y-3 mb-6">
                <p style={{ color: 'var(--theme-text-secondary)' }}>
                  <span className="font-bold" style={{ color: 'var(--theme-primary)' }}>🎬 監督:</span> {movie.director}
                </p>
                <p style={{ color: 'var(--theme-text-secondary)' }}>
                  <span className="font-bold" style={{ color: 'var(--theme-primary)' }}>📅 公開年:</span> {movie.year}
                </p>
                <p style={{ color: 'var(--theme-text-secondary)' }}>
                  <span className="font-bold" style={{ color: 'var(--theme-primary)' }}>🎭 ジャンル:</span> {movie.genre}
                </p>
                <p style={{ color: 'var(--theme-text-secondary)' }}>
                  <span className="font-bold" style={{ color: 'var(--theme-primary)' }}>⭐ 評価:</span> 
                  {reviews.length > 0 ? (
                    <span className="font-bold" style={{ color: 'var(--theme-secondary)' }}> {averageRating}/5.0 ({reviews.length}件のレビュー)</span>
                  ) : (
                    <span style={{ color: 'var(--theme-text-secondary)', opacity: 0.6 }}> データなし</span>
                  )}
                </p>
              </div>
              {movie.description && (
                <div>
                  <h3 className="font-bold mb-3 text-lg" style={{ color: 'var(--theme-secondary)' }}>
                    📖 データファイル
                  </h3>
                  <p className="leading-relaxed" style={{ color: 'var(--theme-text-secondary)' }}>
                    {movie.description}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="iron-card rounded-xl p-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-yellow-400 iron-glow">🛡️ 評価レポート</h2>
            <button
              onClick={() => setShowReviewForm(!showReviewForm)}
              className="iron-button text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300"
            >
              {showReviewForm ? '❌ キャンセル' : '✍️ 新規レポート作成'}
            </button>
          </div>

          {showReviewForm && (
            <form onSubmit={handleReviewSubmit} className="mb-8 p-6 bg-gray-800/50 rounded-lg border border-yellow-400/30">
              <div className="mb-6">
                <label className="block text-sm font-bold text-yellow-400 mb-2">
                  👤 エージェント名 *
                </label>
                <input
                  type="text"
                  value={reviewForm.reviewer_name}
                  onChange={(e) => setReviewForm({...reviewForm, reviewer_name: e.target.value})}
                  required
                  className="w-full px-4 py-3 bg-gray-800 border border-yellow-400/30 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300"
                  placeholder="例: エージェント・コールソン"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-bold text-yellow-400 mb-2">
                  ⚡ 脅威レベル評価 *
                </label>
                <select
                  value={reviewForm.rating}
                  onChange={(e) => setReviewForm({...reviewForm, rating: parseInt(e.target.value)})}
                  className="w-full px-4 py-3 bg-gray-800 border border-yellow-400/30 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300"
                >
                  <option value={5}>🔥 レベル5 - 最高評価</option>
                  <option value={4}>⚡ レベル4 - 高評価</option>
                  <option value={3}>🛡️ レベル3 - 普通</option>
                  <option value={2}>⚠️ レベル2 - 低評価</option>
                  <option value={1}>💀 レベル1 - 最低評価</option>
                </select>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-bold text-yellow-400 mb-2">
                  📋 ミッションレポート
                </label>
                <textarea
                  value={reviewForm.comment}
                  onChange={(e) => setReviewForm({...reviewForm, comment: e.target.value})}
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-800 border border-yellow-400/30 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300"
                  placeholder="詳細な分析レポートを入力してください..."
                />
              </div>

              <button
                type="submit"
                className="iron-button text-white px-8 py-3 rounded-lg font-bold transition-all duration-300"
              >
                🚀 レポート送信
              </button>
            </form>
          )}

          {reviews.length === 0 ? (
            <div className="text-center">
              <div className="text-yellow-400 text-4xl mb-4">📊</div>
              <p className="text-gray-300">レポートデータが見つかりません。<br />最初の分析レポートを作成してください！</p>
            </div>
          ) : (
            <div className="space-y-6">
              {reviews.map((review) => (
                <div key={review.id} className="bg-gray-800/50 rounded-lg p-6 border border-yellow-400/20">
                  <div className="flex items-center gap-4 mb-3">
                    <span className="font-bold text-yellow-400">👤 {review.reviewer_name}</span>
                    <span className="text-yellow-400">
                      {review.rating === 5 && '🔥 レベル5'}
                      {review.rating === 4 && '⚡ レベル4'}
                      {review.rating === 3 && '🛡️ レベル3'}
                      {review.rating === 2 && '⚠️ レベル2'}
                      {review.rating === 1 && '💀 レベル1'}
                    </span>
                    <span className="text-gray-400 text-sm">
                      📅 {new Date(review.created_at).toLocaleDateString('ja-JP')}
                    </span>
                  </div>
                  {review.comment && (
                    <p className="text-gray-300 leading-relaxed">{review.comment}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      {/* ポスター拡大モーダル */}
      {movie?.poster_url && (
        <PosterModal
          isOpen={showPosterModal}
          onClose={() => setShowPosterModal(false)}
          posterUrl={movie.poster_url}
          movieTitle={movie.title}
        />
      )}
    </div>
  )
}
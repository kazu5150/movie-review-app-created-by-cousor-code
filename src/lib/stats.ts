import { supabase } from './supabase'
import { Movie, Review } from '@/types/movie'

export interface MovieStats {
  totalMovies: number
  totalReviews: number
  averageRating: number
  genreDistribution: { name: string; value: number; color: string }[]
  yearDistribution: { year: number; count: number }[]
  ratingDistribution: { rating: number; count: number }[]
  topRatedMovies: (Movie & { avgRating: number; reviewCount: number })[]
}

export async function getMovieStats(): Promise<MovieStats> {
  try {
    // 映画とレビューのデータを取得
    const [moviesResponse, reviewsResponse] = await Promise.all([
      supabase.from('movies').select('*'),
      supabase.from('reviews').select('*')
    ])

    if (moviesResponse.error || reviewsResponse.error) {
      throw new Error('データ取得に失敗しました')
    }

    const movies: Movie[] = moviesResponse.data || []
    const reviews: Review[] = reviewsResponse.data || []

    // 基本統計
    const totalMovies = movies.length
    const totalReviews = reviews.length
    const averageRating = reviews.length > 0 
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
      : 0

    // ジャンル別分布
    const genreColors = {
      'アクション': '#dc2626',
      'コメディ': '#f59e0b',
      'ドラマ': '#059669',
      'ホラー': '#7c2d12',
      'SF': '#2563eb',
      'ロマンス': '#ec4899',
      'アニメ': '#8b5cf6',
      'ドキュメンタリー': '#6b7280',
      'その他': '#374151'
    }

    const genreCount = movies.reduce((acc, movie) => {
      acc[movie.genre] = (acc[movie.genre] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    const genreDistribution = Object.entries(genreCount).map(([name, value]) => ({
      name,
      value,
      color: genreColors[name as keyof typeof genreColors] || '#374151'
    }))

    // 年別分布
    const yearCount = movies.reduce((acc, movie) => {
      acc[movie.year] = (acc[movie.year] || 0) + 1
      return acc
    }, {} as Record<number, number>)

    const yearDistribution = Object.entries(yearCount)
      .map(([year, count]) => ({ year: parseInt(year), count }))
      .sort((a, b) => a.year - b.year)

    // 評価分布
    const ratingCount = reviews.reduce((acc, review) => {
      acc[review.rating] = (acc[review.rating] || 0) + 1
      return acc
    }, {} as Record<number, number>)

    const ratingDistribution = [1, 2, 3, 4, 5].map(rating => ({
      rating,
      count: ratingCount[rating] || 0
    }))

    // 高評価映画トップ5
    const movieRatings = movies.map(movie => {
      const movieReviews = reviews.filter(review => review.movie_id === movie.id)
      const avgRating = movieReviews.length > 0
        ? movieReviews.reduce((sum, review) => sum + review.rating, 0) / movieReviews.length
        : 0
      return {
        ...movie,
        avgRating,
        reviewCount: movieReviews.length
      }
    })

    const topRatedMovies = movieRatings
      .filter(movie => movie.reviewCount > 0)
      .sort((a, b) => b.avgRating - a.avgRating)
      .slice(0, 5)

    return {
      totalMovies,
      totalReviews,
      averageRating,
      genreDistribution,
      yearDistribution,
      ratingDistribution,
      topRatedMovies
    }
  } catch (error) {
    console.error('統計データの取得に失敗:', error)
    throw error
  }
}
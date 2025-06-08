'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Movie } from '@/types/movie'

export default function EditMoviePage() {
  const router = useRouter()
  const params = useParams()
  const movieId = params.id as string

  const [movie, setMovie] = useState<Movie | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    title: '',
    director: '',
    year: '',
    genre: '',
    description: '',
    poster_url: ''
  })

  useEffect(() => {
    const fetchMovie = async () => {
      if (!movieId) return

      try {
        setLoading(true)
        setError(null)
        
        const { data, error } = await supabase
          .from('movies')
          .select('*')
          .eq('id', movieId)
          .single()

        if (error) throw error

        setMovie(data)
        setFormData({
          title: data.title || '',
          director: data.director || '',
          year: data.year ? data.year.toString() : '',
          genre: data.genre || '',
          description: data.description || '',
          poster_url: data.poster_url || ''
        })
      } catch (error) {
        console.error('映画の取得に失敗しました:', error)
        setError('映画の取得に失敗しました')
      } finally {
        setLoading(false)
      }
    }

    fetchMovie()
  }, [movieId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('=== FORM SUBMIT STARTED ===')
    setSaving(true)
    setError(null)

    console.log('Form submission started with data:', formData)

    try {
      const updateData = {
        title: formData.title.trim(),
        director: formData.director.trim(),
        year: parseInt(formData.year),
        genre: formData.genre,
        description: formData.description.trim(),
        poster_url: formData.poster_url.trim() || null
      }

      console.log('Sending update data:', updateData)
      console.log('Movie ID:', movieId)

      // Supabase接続テスト
      console.log('Testing Supabase connection...')
      const testResult = await supabase.from('movies').select('count').limit(1)
      console.log('Supabase connection test:', testResult)

      console.log('Starting actual update...')
      const { data, error } = await supabase
        .from('movies')
        .update(updateData)
        .eq('id', movieId)
        .select()
      
      console.log('Update completed, processing response...')

      console.log('Supabase update response:', JSON.stringify({ data, error }, null, 2))

      // 更新後にデータベースから再度取得して確認
      const { data: updatedMovie, error: fetchError } = await supabase
        .from('movies')
        .select('*')
        .eq('id', movieId)
        .single()

      console.log('Verification fetch:', JSON.stringify({ updatedMovie, fetchError }, null, 2))

      if (error) {
        console.error('Supabase error:', error)
        throw error
      }

      console.log('Update successful, redirecting to:', `/movie/${movieId}`)
      alert('映画情報が正常に更新されました！')
      // 強制的にページを再読み込み
      window.location.href = `/movie/${movieId}`
    } catch (error) {
      console.error('映画の更新に失敗しました:', error)
      setError(`映画の更新に失敗しました: ${error instanceof Error ? error.message : '不明なエラー'}`)
    } finally {
      setSaving(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    console.log('Form field changed:', e.target.name, '=', e.target.value)
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-yellow-400 animate-pulse">⚡ データロード中...</div>
      </div>
    )
  }

  if (!movie) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-400">映画が見つかりません</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="iron-card rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-yellow-400 iron-glow">🎬 映画を編集</h1>
            <button
              onClick={() => router.back()}
              className="px-4 py-2 text-gray-300 hover:text-yellow-400 transition-colors duration-300"
            >
              戻る
            </button>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-600/20 border border-red-500/30 text-red-400 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-red-400 mb-1">
                タイトル *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-gray-800/50 border border-gray-600/30 rounded-md text-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400/50"
              />
            </div>

            <div>
              <label htmlFor="director" className="block text-sm font-medium text-red-400 mb-1">
                監督 *
              </label>
              <input
                type="text"
                id="director"
                name="director"
                value={formData.director}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-gray-800/50 border border-gray-600/30 rounded-md text-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400/50"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="year" className="block text-sm font-medium text-red-400 mb-1">
                  公開年 *
                </label>
                <input
                  type="number"
                  id="year"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  required
                  min="1900"
                  max="2030"
                  className="w-full px-3 py-2 bg-gray-800/50 border border-gray-600/30 rounded-md text-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400/50"
                />
              </div>

              <div>
                <label htmlFor="genre" className="block text-sm font-medium text-red-400 mb-1">
                  ジャンル *
                </label>
                <select
                  id="genre"
                  name="genre"
                  value={formData.genre}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 bg-gray-800/50 border border-gray-600/30 rounded-md text-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400/50"
                >
                  <option value="">選択してください</option>
                  <option value="アクション">アクション</option>
                  <option value="SF">SF</option>
                  <option value="アニメ">アニメ</option>
                  <option value="ドラマ">ドラマ</option>
                  <option value="コメディ">コメディ</option>
                  <option value="ホラー">ホラー</option>
                  <option value="ロマンス">ロマンス</option>
                  <option value="スリラー">スリラー</option>
                  <option value="ドキュメンタリー">ドキュメンタリー</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-red-400 mb-1">
                あらすじ
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full px-3 py-2 bg-gray-800/50 border border-gray-600/30 rounded-md text-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400/50 placeholder-gray-400"
                placeholder="映画のあらすじを入力してください"
              />
            </div>

            <div>
              <label htmlFor="poster_url" className="block text-sm font-medium text-red-400 mb-1">
                ポスター画像URL
              </label>
              <input
                type="url"
                id="poster_url"
                name="poster_url"
                value={formData.poster_url}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-800/50 border border-gray-600/30 rounded-md text-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400/50 placeholder-gray-400"
                placeholder="https://example.com/poster.jpg"
              />
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={saving}
                onClick={() => console.log('Update button clicked!')}
                className="flex-1 iron-button text-white py-2 px-4 rounded-md transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? '⚡ 更新中...' : '⚡ 更新する'}
              </button>
              <button
                type="button"
                onClick={() => router.back()}
                className="px-6 py-2 border border-gray-600/30 text-gray-300 rounded-md hover:bg-gray-700/30 hover:text-yellow-400 transition-colors duration-300"
              >
                キャンセル
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
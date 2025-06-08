'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

export default function AddMovie() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: '',
    director: '',
    year: '',
    genre: '',
    description: '',
    poster_url: ''
  })
  const [loading, setLoading] = useState(false)
  const [aiLoading, setAiLoading] = useState(false)
  const [searchTitle, setSearchTitle] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { error } = await supabase
        .from('movies')
        .insert([{
          title: formData.title,
          director: formData.director,
          year: parseInt(formData.year),
          genre: formData.genre,
          description: formData.description,
          poster_url: formData.poster_url || null
        }])

      if (error) {
        console.error('Error adding movie:', error)
        alert('映画の追加に失敗しました')
      } else {
        router.push('/')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('エラーが発生しました')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const fetchMovieInfo = async () => {
    if (!searchTitle.trim()) {
      alert('映画タイトルを入力してください')
      return
    }

    setAiLoading(true)
    try {
      const response = await fetch('/api/movie-info', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: searchTitle.trim() }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || '映画情報の取得に失敗しました')
      }

      setFormData({
        title: data.title,
        director: data.director,
        year: data.year.toString(),
        genre: data.genre,
        description: data.description,
        poster_url: data.poster_url || ''
      })

      setSearchTitle('')
      alert('🤖 J.A.R.V.I.S.による映画情報の取得が完了しました！')
    } catch (error) {
      console.error('Error fetching movie info:', error)
      alert(error instanceof Error ? error.message : '映画情報の取得中にエラーが発生しました')
    } finally {
      setAiLoading(false)
    }
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="mb-6">
          <Link href="/" className="text-yellow-400 hover:text-yellow-300 font-semibold transition-colors duration-300 flex items-center gap-2">
            <span className="text-red-400">←</span> IRON CINEMA に戻る
          </Link>
        </div>
        
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold iron-glow text-yellow-400 mb-2">
            🎬 新規データ登録
          </h1>
          <p className="text-gray-300">Arc Reactor Database への映画情報アップロード</p>
        </div>
        
        {/* AI映画情報取得セクション */}
        <div className="iron-card rounded-xl p-6 mb-6">
          <h2 className="text-xl font-bold text-yellow-400 mb-4 flex items-center gap-2">
            🤖 J.A.R.V.I.S. 映画データベース検索
          </h2>
          <p className="text-gray-300 text-sm mb-4">
            映画タイトルを入力するとAIが自動で詳細情報を取得します
          </p>
          <div className="flex gap-3">
            <input
              type="text"
              value={searchTitle}
              onChange={(e) => setSearchTitle(e.target.value)}
              placeholder="映画タイトルを入力..."
              className="flex-1 px-4 py-3 bg-gray-800 border border-yellow-400/30 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300"
              onKeyDown={(e) => e.key === 'Enter' && fetchMovieInfo()}
            />
            <button
              type="button"
              onClick={fetchMovieInfo}
              disabled={aiLoading || !searchTitle.trim()}
              className="iron-button text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {aiLoading ? '🔄 検索中...' : '🚀 検索'}
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="iron-card rounded-xl p-8">
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-semibold text-yellow-400 mb-2">
              🎯 映画タイトル *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-gray-800 border border-yellow-400/30 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300"
              placeholder="例: アイアンマン"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="director" className="block text-sm font-semibold text-yellow-400 mb-2">
              🎬 監督 *
            </label>
            <input
              type="text"
              id="director"
              name="director"
              value={formData.director}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-gray-800 border border-yellow-400/30 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300"
              placeholder="例: ジョン・ファヴロー"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="year" className="block text-sm font-semibold text-yellow-400 mb-2">
              📅 公開年 *
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
              className="w-full px-4 py-3 bg-gray-800 border border-yellow-400/30 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300"
              placeholder="2008"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="genre" className="block text-sm font-semibold text-yellow-400 mb-2">
              🎭 ジャンル *
            </label>
            <select
              id="genre"
              name="genre"
              value={formData.genre}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-gray-800 border border-yellow-400/30 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300"
            >
              <option value="">ジャンルを選択</option>
              <option value="アクション">アクション</option>
              <option value="コメディ">コメディ</option>
              <option value="ドラマ">ドラマ</option>
              <option value="ホラー">ホラー</option>
              <option value="SF">SF</option>
              <option value="ロマンス">ロマンス</option>
              <option value="アニメ">アニメ</option>
              <option value="ドキュメンタリー">ドキュメンタリー</option>
              <option value="その他">その他</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-semibold text-yellow-400 mb-2">
              📖 あらすじ・説明
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-3 bg-gray-800 border border-yellow-400/30 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300"
              placeholder="天才発明家トニー・スターク..."
            />
          </div>

          <div className="mb-6">
            <label htmlFor="poster_url" className="block text-sm font-semibold text-yellow-400 mb-2">
              🖼️ ポスターURL（任意）
            </label>
            <input
              type="url"
              id="poster_url"
              name="poster_url"
              value={formData.poster_url}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-800 border border-yellow-400/30 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300"
              placeholder="https://example.com/poster.jpg"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full iron-button text-white py-4 px-6 rounded-lg font-bold text-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? '⚡ アップロード中...' : '🚀 データベースに登録'}
          </button>
        </form>
      </div>
    </div>
  )
}
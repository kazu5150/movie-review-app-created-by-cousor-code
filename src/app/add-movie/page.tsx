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
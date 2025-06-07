'use client'

import { useState } from 'react'
import Link from 'next/link'
import { insertSampleData } from '@/lib/sampleData'

export default function AdminPage() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<{ moviesCount: number; reviewsCount: number } | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleInsertSampleData = async () => {
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const data = await insertSampleData()
      setResult(data)
    } catch (err) {
      console.error('Error inserting sample data:', err)
      setError('サンプルデータの挿入に失敗しました。既にデータが存在する可能性があります。')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-6">
          <Link href="/" className="text-yellow-400 hover:text-yellow-300 font-semibold transition-colors duration-300 flex items-center gap-2">
            <span className="text-red-400">←</span> IRON CINEMA に戻る
          </Link>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold iron-title text-yellow-400 mb-2">
            ⚙️ システム管理パネル
          </h1>
          <p className="text-gray-300 text-lg">Arc Reactor Database Management</p>
          <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-yellow-400 mx-auto mt-4 rounded-full iron-divider"></div>
        </div>

        <div className="iron-card rounded-xl p-8">
          <h2 className="text-2xl font-bold text-yellow-400 mb-6 flex items-center gap-2">
            🎬 サンプルデータ投入
          </h2>
          
          <div className="mb-6">
            <p className="text-gray-300 mb-4">
              マーベル映画を中心とした10本の映画と20件以上のレビューを一括投入します：
            </p>
            <ul className="text-gray-400 text-sm space-y-1 mb-6">
              <li>• アイアンマン シリーズ (2008-2013)</li>
              <li>• アベンジャーズ シリーズ (2012-2019)</li>
              <li>• スパイダーマン：ホームカミング (2017)</li>
              <li>• ブラックパンサー (2018)</li>
              <li>• ガーディアンズ・オブ・ギャラクシー (2014)</li>
              <li>• 君の名は。 (2016)</li>
              <li>• 千と千尋の神隠し (2001)</li>
            </ul>
          </div>

          {result && (
            <div className="mb-6 p-4 bg-green-900/30 border border-green-500/30 rounded-lg">
              <h3 className="text-green-400 font-bold mb-2">✅ 投入完了</h3>
              <p className="text-gray-300">
                映画: {result.moviesCount}件、レビュー: {result.reviewsCount}件のデータを追加しました！
              </p>
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 bg-red-900/30 border border-red-500/30 rounded-lg">
              <h3 className="text-red-400 font-bold mb-2">❌ エラー</h3>
              <p className="text-gray-300">{error}</p>
            </div>
          )}

          <button
            onClick={handleInsertSampleData}
            disabled={loading}
            className="iron-button text-white px-8 py-3 rounded-lg font-bold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? '⚡ データ投入中...' : '🚀 サンプルデータを投入'}
          </button>

          <div className="mt-8 p-4 bg-yellow-900/20 border border-yellow-400/30 rounded-lg">
            <h3 className="text-yellow-400 font-bold mb-2">⚠️ 注意事項</h3>
            <ul className="text-gray-300 text-sm space-y-1">
              <li>• このボタンは一度だけ実行してください</li>
              <li>• 既存のデータがある場合はエラーになる可能性があります</li>
              <li>• 投入後は統計ページでデータを確認できます</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/stats"
            className="iron-button text-white px-8 py-3 rounded-lg font-semibold text-lg transition-all duration-300 inline-block"
          >
            📊 統計ページで確認
          </Link>
        </div>
      </div>
    </div>
  )
}
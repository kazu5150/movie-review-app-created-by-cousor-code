import { NextRequest, NextResponse } from 'next/server'
import { getMovieRecommendations } from '@/lib/openai'

export async function POST(request: NextRequest) {
  try {
    const { theme } = await request.json()

    if (!theme || typeof theme !== 'string') {
      return NextResponse.json(
        { error: 'テーマの入力が必要です' },
        { status: 400 }
      )
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI API key is not configured' },
        { status: 500 }
      )
    }

    const recommendations = await getMovieRecommendations(theme.trim())

    if (!recommendations || recommendations.length === 0) {
      return NextResponse.json(
        { error: 'テーマに合った映画が見つかりませんでした' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      theme: theme.trim(),
      recommendations,
      count: recommendations.length
    })
  } catch (error) {
    console.error('Error in movie-recommendations API:', error)
    return NextResponse.json(
      { error: '映画推薦の取得中にエラーが発生しました' },
      { status: 500 }
    )
  }
}
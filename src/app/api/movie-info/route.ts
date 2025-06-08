import { NextRequest, NextResponse } from 'next/server'
import { getMovieInfoFromAI } from '@/lib/openai'

export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  try {
    const { title } = await request.json()

    if (!title || typeof title !== 'string') {
      return NextResponse.json(
        { error: '映画タイトルが必要です' },
        { status: 400 }
      )
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI API key is not configured' },
        { status: 500 }
      )
    }

    const movieInfo = await getMovieInfoFromAI(title.trim())

    if (!movieInfo) {
      return NextResponse.json(
        { error: '指定された映画が見つかりませんでした' },
        { status: 404 }
      )
    }

    return NextResponse.json(movieInfo)
  } catch (error) {
    console.error('Error in movie-info API:', error)
    return NextResponse.json(
      { error: '映画情報の取得中にエラーが発生しました' },
      { status: 500 }
    )
  }
}
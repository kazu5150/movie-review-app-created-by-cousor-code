import { NextRequest, NextResponse } from 'next/server'
import { generateSFImage } from '@/lib/openai'

export async function POST(request: NextRequest) {
  try {
    const { theme } = await request.json()
    
    if (!theme || typeof theme !== 'string') {
      return NextResponse.json(
        { error: 'テーマが入力されていません' },
        { status: 400 }
      )
    }

    if (theme.trim().length < 2) {
      return NextResponse.json(
        { error: 'テーマは2文字以上で入力してください' },
        { status: 400 }
      )
    }

    const result = await generateSFImage(theme.trim())
    
    return NextResponse.json({
      success: true,
      image: result,
      theme: theme.trim()
    })
  } catch (error) {
    console.error('Error in generate-image API:', error)
    
    const errorMessage = error instanceof Error ? error.message : '画像生成中にエラーが発生しました'
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    )
  }
}
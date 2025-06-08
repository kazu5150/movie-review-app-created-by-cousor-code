import { NextRequest, NextResponse } from 'next/server'
import { generateSFImage } from '@/lib/openai'

export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  try {
    console.log('Generate image API called')
    console.log('Environment check - OPENAI_API_KEY exists:', !!process.env.OPENAI_API_KEY)
    console.log('Environment check - OPENAI_API_KEY length:', process.env.OPENAI_API_KEY?.length || 0)
    console.log('Environment check - OPENAI_API_KEY prefix:', process.env.OPENAI_API_KEY?.substring(0, 7) || 'not set')
    console.log('Environment check - NODE_ENV:', process.env.NODE_ENV)
    console.log('Environment check - VERCEL_ENV:', process.env.VERCEL_ENV || 'not on vercel')
    
    const { theme } = await request.json()
    console.log('Theme received:', theme)
    
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

    console.log('Calling generateSFImage with theme:', theme.trim())
    const result = await generateSFImage(theme.trim())
    console.log('generateSFImage completed successfully')
    
    return NextResponse.json({
      success: true,
      image: result,
      theme: theme.trim()
    })
  } catch (error) {
    console.error('Error in generate-image API:', error)
    console.error('Error name:', error instanceof Error ? error.name : 'Unknown')
    console.error('Error message:', error instanceof Error ? error.message : 'No message')
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace')
    
    const errorMessage = error instanceof Error ? error.message : '画像生成中にエラーが発生しました'
    
    return NextResponse.json(
      { error: errorMessage, details: error instanceof Error ? error.name : 'Unknown error' },
      { status: 500 }
    )
  }
}
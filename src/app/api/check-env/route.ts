import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

export async function GET() {
  const apiKey = process.env.OPENAI_API_KEY
  
  return NextResponse.json({
    hasOpenAIKey: !!apiKey,
    keyLength: apiKey?.length || 0,
    keyPrefix: apiKey ? apiKey.substring(0, 7) + '...' : 'not set',
    nodeEnv: process.env.NODE_ENV,
    vercelEnv: process.env.VERCEL_ENV || 'not on vercel',
    timestamp: new Date().toISOString()
  })
}
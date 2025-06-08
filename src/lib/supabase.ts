import { createClient } from '@supabase/supabase-js'

// Environment variables with fallbacks for build time
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'

// Log warning if using fallback values
if (supabaseUrl === 'https://placeholder.supabase.co') {
  console.warn('Using placeholder Supabase URL - set NEXT_PUBLIC_SUPABASE_URL environment variable')
}

// Debug logging for environment variables (only log in development)
if (process.env.NODE_ENV === 'development') {
  console.log('Supabase URL:', supabaseUrl)
  console.log('Supabase Key exists:', !!supabaseAnonKey)
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
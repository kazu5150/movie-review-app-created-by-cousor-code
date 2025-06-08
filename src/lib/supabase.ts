import { createClient } from '@supabase/supabase-js'

// Environment variables with fallbacks for build time
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://twchqhebnmzvrwrqefqf.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR3Y2hxaGVibm16dnJ3cnFlZnFmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkyNjY3MDUsImV4cCI6MjA2NDg0MjcwNX0.2_GkQl6XDVBouyHccowDe64Mcd6IvvxSp0_C8h0t68g'

// Log warning if using fallback values
if (supabaseUrl === 'https://placeholder.supabase.co') {
  console.warn('Using placeholder Supabase URL - set NEXT_PUBLIC_SUPABASE_URL environment variable')
}

// Debug logging for environment variables (development only)
if (process.env.NODE_ENV === 'development') {
  console.log('Environment:', process.env.NODE_ENV)
  console.log('Supabase URL:', supabaseUrl)
  console.log('Supabase Key exists:', !!supabaseAnonKey)
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Test Supabase connection
export async function testSupabaseConnection() {
  try {
    console.log('Testing Supabase connection...')
    const { data, error } = await supabase
      .from('movies')
      .select('count', { count: 'exact', head: true })
    
    if (error) {
      console.error('Supabase connection error:', error)
      return { success: false, error: error.message }
    }
    
    console.log('Supabase connection successful, movies count:', data)
    return { success: true, count: data }
  } catch (error) {
    console.error('Supabase connection test failed:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}
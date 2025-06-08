// The Movie Database (TMDB) API integration for poster images
// Free API key required: https://www.themoviedb.org/settings/api

interface TMDBSearchResult {
  id: number
  title: string
  poster_path: string | null
  release_date: string
  overview: string
}

interface TMDBResponse {
  results: TMDBSearchResult[]
}

export async function getMoviePosterFromTMDB(title: string, year?: number): Promise<string | null> {
  // TMDB APIキーが設定されていない場合は無視
  if (!process.env.TMDB_API_KEY) {
    console.log('TMDB API key not configured, skipping poster fetch')
    return null
  }

  try {
    const searchQuery = encodeURIComponent(title)
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_API_KEY}&query=${searchQuery}&language=ja-JP`

    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`TMDB API error: ${response.status}`)
    }

    const data: TMDBResponse = await response.json()
    
    if (data.results.length === 0) {
      return null
    }

    // 年が指定されている場合、最も近い年の映画を選択
    let bestMatch = data.results[0]
    if (year && data.results.length > 1) {
      bestMatch = data.results.reduce((best, current) => {
        const bestYear = new Date(best.release_date).getFullYear()
        const currentYear = new Date(current.release_date).getFullYear()
        
        return Math.abs(currentYear - year) < Math.abs(bestYear - year) ? current : best
      })
    }

    if (bestMatch.poster_path) {
      // TMDBの画像URLを構築（w500サイズ）
      return `https://image.tmdb.org/t/p/w500${bestMatch.poster_path}`
    }

    return null
  } catch (error) {
    console.error('Error fetching poster from TMDB:', error)
    return null
  }
}

export async function enhanceMovieWithPoster(movie: {
  title: string
  year: number
  poster_url?: string | null
}): Promise<string | null> {
  // 既にポスターURLが設定されている場合はそれを使用
  if (movie.poster_url) {
    return movie.poster_url
  }

  // TMDBから取得を試行
  return await getMoviePosterFromTMDB(movie.title, movie.year)
}
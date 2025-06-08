import OpenAI from 'openai'
import { enhanceMovieWithPoster } from './tmdb'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export interface MovieInfo {
  title: string
  director: string
  year: number
  genre: string
  description: string
  poster_url?: string
}

export interface RecommendedMovie {
  title: string
  director: string
  year: number
  genre: string
  description: string
  poster_url?: string
  reason: string
  similarity_score: number
}

export async function getMovieRecommendations(theme: string): Promise<RecommendedMovie[]> {
  try {
    const prompt = `
ユーザーが入力したテーマ「${theme}」に基づいて、SF映画を5本推薦してください。
各映画について以下の情報をJSON配列形式で返してください。

テーマの解釈：
- 「${theme}」に関連する要素、感情、概念、技術などを考慮
- SF映画の中から最も適合する作品を選定
- 多様性を持たせ、異なる年代やサブジャンルから選ぶ

回答フォーマット：
[
  {
    "title": "映画タイトル（原題併記可）",
    "director": "監督名",
    "year": 公開年（数値）,
    "genre": "SF",
    "description": "100-150文字程度の映画概要",
    "poster_url": "https://example.com/poster.jpg（利用可能な場合）",
    "reason": "なぜこの映画がテーマに合うのかの理由（50-80文字）",
    "similarity_score": 0.85
  }
]

注意点：
- 実在するSF映画のみを推薦
- similarity_scoreは0.7-1.0の範囲でテーマとの関連度を表す
- reasonはテーマとの具体的な関連性を説明
- 日本のアニメ、ハリウッド、ヨーロッパなど多様な作品を含める
- poster_urlは一般的に利用可能な映画ポスター画像のURLを提供（見つからない場合はnull）
`

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'あなたはSF映画の専門家として、ユーザーのテーマに最適な映画を推薦します。必ずJSON配列形式で回答し、実在する映画のみを推薦してください。'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 1500
    })

    const content = response.choices[0]?.message?.content
    if (!content) {
      throw new Error('OpenAI response is empty')
    }

    try {
      const recommendations = JSON.parse(content)
      
      if (!Array.isArray(recommendations)) {
        throw new Error('Response is not an array')
      }

      // データ検証
      const validRecommendations = recommendations.filter(movie => 
        movie.title && movie.director && movie.year && movie.genre && 
        movie.description && movie.reason && movie.similarity_score
      )

      // ポスター画像をTMDBから取得して強化
      const enhancedRecommendations = await Promise.all(
        validRecommendations.map(async (movie) => {
          const movieData = {
            title: movie.title,
            director: movie.director,
            year: parseInt(movie.year),
            genre: movie.genre,
            description: movie.description,
            poster_url: movie.poster_url || undefined,
            reason: movie.reason,
            similarity_score: parseFloat(movie.similarity_score)
          }

          // TMDBからポスター画像を取得
          const posterUrl = await enhanceMovieWithPoster({
            title: movieData.title,
            year: movieData.year,
            poster_url: movieData.poster_url
          })

          return {
            ...movieData,
            poster_url: posterUrl || movieData.poster_url
          }
        })
      )

      return enhancedRecommendations
    } catch (parseError) {
      console.error('Failed to parse AI recommendations:', parseError)
      console.error('AI response content:', content)
      throw new Error('Invalid JSON response from AI')
    }
  } catch (error) {
    console.error('Error fetching movie recommendations from AI:', error)
    throw error
  }
}

export async function getMovieInfoFromAI(movieTitle: string): Promise<MovieInfo | null> {
  try {
    const prompt = `
映画タイトル「${movieTitle}」について、以下の情報を正確に調べて、JSON形式で回答してください。
実在しない映画の場合は、その旨を明記してください。

必要な情報:
- title: 正式な映画タイトル（原題も含む場合は併記）
- director: 監督名
- year: 公開年（数値）
- genre: ジャンル（1つのメインジャンル）
- description: 100-150文字程度の映画の概要・あらすじ
- poster_url: 一般的なポスター画像のURL（見つからない場合はnull）

回答例:
{
  "title": "アイアンマン",
  "director": "ジョン・フェイブロー", 
  "year": 2008,
  "genre": "アクション",
  "description": "武器商人トニー・スタークが誘拐事件をきっかけに、自ら開発したパワードスーツを身にまとい、アイアンマンとして悪と戦う姿を描いたマーベル・シネマティック・ユニバースの記念すべき第1作目。",
  "poster_url": null
}

実在しない映画の場合:
{
  "error": "指定された映画が見つかりませんでした"
}
`

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: '映画データベースの専門家として、正確な映画情報を提供してください。必ずJSON形式で回答し、実在しない映画については明確に「error」フィールドで伝えてください。'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.1,
      max_tokens: 500
    })

    const content = response.choices[0]?.message?.content
    if (!content) {
      throw new Error('OpenAI response is empty')
    }

    try {
      const movieData = JSON.parse(content)
      
      if (movieData.error) {
        return null
      }

      // データ検証
      if (!movieData.title || !movieData.director || !movieData.year || !movieData.genre || !movieData.description) {
        throw new Error('Incomplete movie data from AI')
      }

      // TMDBからポスター画像を取得
      const posterUrl = await enhanceMovieWithPoster({
        title: movieData.title,
        year: parseInt(movieData.year),
        poster_url: movieData.poster_url || undefined
      })

      return {
        title: movieData.title,
        director: movieData.director,
        year: parseInt(movieData.year),
        genre: movieData.genre,
        description: movieData.description,
        poster_url: posterUrl || movieData.poster_url || undefined
      }
    } catch (parseError) {
      console.error('Failed to parse AI response:', parseError)
      console.error('AI response content:', content)
      throw new Error('Invalid JSON response from AI')
    }
  } catch (error) {
    console.error('Error fetching movie info from AI:', error)
    throw error
  }
}
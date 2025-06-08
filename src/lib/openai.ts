import OpenAI from 'openai'

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

      return {
        title: movieData.title,
        director: movieData.director,
        year: parseInt(movieData.year),
        genre: movieData.genre,
        description: movieData.description,
        poster_url: movieData.poster_url || undefined
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
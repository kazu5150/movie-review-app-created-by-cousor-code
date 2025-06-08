import { Review, Movie } from '@/types/movie'

export interface SentimentAnalysis {
  score: number // -1 to 1 (-1 = very negative, 1 = very positive)
  label: 'positive' | 'negative' | 'neutral'
  confidence: number // 0 to 1
  emotions: {
    joy: number
    excitement: number
    disappointment: number
    confusion: number
  }
}

export interface ReviewerProfile {
  name: string
  totalReviews: number
  averageRating: number
  reviewQuality: number // 0 to 1
  expertise: string[]
  influence: number // 0 to 1
  bias: {
    genre: string | null
    rating: 'harsh' | 'lenient' | 'balanced'
  }
  activity: {
    firstReview: string
    lastReview: string
    averageReviewLength: number
  }
}

export interface MovieIntelligence {
  movieId: string
  title: string
  overallSentiment: SentimentAnalysis
  controversy: number // 0 to 1 (high variance in ratings)
  universalAppeal: number // 0 to 1
  technicalAchievement: number // 0 to 1
  culturalImpact: number // 0 to 1
  reviewQuality: number // average quality of all reviews
  topKeywords: string[]
  reviewerDiversity: number // 0 to 1
}

export interface ReviewAnalytics {
  totalReviews: number
  averageRating: number
  sentimentDistribution: {
    positive: number
    neutral: number
    negative: number
  }
  topReviewers: ReviewerProfile[]
  movieIntelligence: MovieIntelligence[]
  trendingTopics: string[]
  qualityMetrics: {
    averageReviewLength: number
    expertiseLevel: number
    objectivity: number
  }
}

// 感情分析用キーワード辞書
const sentimentKeywords = {
  positive: [
    '傑作', '素晴らしい', '最高', '完璧', '感動', '名作', '美しい', '感激',
    '面白い', '楽しい', '興奮', '魅力的', '印象的', '優秀', '見事', '圧倒的'
  ],
  negative: [
    'つまらない', 'ひどい', '最悪', '退屈', '失望', '駄作', 'がっかり',
    '理解できない', '混乱', 'イライラ', '無駄', '期待外れ', '困惑'
  ],
  emotions: {
    joy: ['感動', '感激', '嬉しい', '楽しい', '幸せ', '心温まる'],
    excitement: ['興奮', 'ワクワク', 'ドキドキ', '熱狂', 'スリル', '刺激的'],
    disappointment: ['失望', 'がっかり', '期待外れ', '残念', '物足りない'],
    confusion: ['困惑', '理解できない', '混乱', 'わからない', '意味不明']
  }
}

// 専門用語辞書
const expertiseKeywords = {
  technical: ['映像美', 'CG', 'VFX', '技術', '音響', '編集', 'カメラワーク'],
  narrative: ['脚本', 'ストーリー', '構成', 'プロット', '演出', 'キャラクター'],
  artistic: ['芸術', '美学', 'デザイン', '色彩', '構図', 'ビジュアル'],
  philosophical: ['哲学', '思想', 'メッセージ', '深遠', '本質', '意味'],
  scientific: ['物理', '化学', '生物', '科学', '理論', 'AI', 'ロボット']
}

export class ReviewAnalyticsEngine {
  
  // 感情分析を実行
  analyzeSentiment(comment: string): SentimentAnalysis {
    const text = comment.toLowerCase()
    let positiveScore = 0
    let negativeScore = 0
    
    // ポジティブキーワードをカウント
    sentimentKeywords.positive.forEach(keyword => {
      if (text.includes(keyword)) positiveScore += 1
    })
    
    // ネガティブキーワードをカウント
    sentimentKeywords.negative.forEach(keyword => {
      if (text.includes(keyword)) negativeScore += 1
    })
    
    // スコア計算
    const score = (positiveScore - negativeScore) / Math.max(1, positiveScore + negativeScore)
    
    // 感情分析
    const emotions = {
      joy: this.calculateEmotionScore(text, sentimentKeywords.emotions.joy),
      excitement: this.calculateEmotionScore(text, sentimentKeywords.emotions.excitement),
      disappointment: this.calculateEmotionScore(text, sentimentKeywords.emotions.disappointment),
      confusion: this.calculateEmotionScore(text, sentimentKeywords.emotions.confusion)
    }
    
    return {
      score: Math.max(-1, Math.min(1, score)),
      label: score > 0.2 ? 'positive' : score < -0.2 ? 'negative' : 'neutral',
      confidence: Math.min(1, (positiveScore + negativeScore) / 3),
      emotions
    }
  }
  
  private calculateEmotionScore(text: string, keywords: string[]): number {
    let score = 0
    keywords.forEach(keyword => {
      if (text.includes(keyword)) score += 1
    })
    return Math.min(1, score / keywords.length)
  }
  
  // レビュアープロファイルを生成
  generateReviewerProfile(reviews: Review[]): ReviewerProfile {
    if (reviews.length === 0) {
      throw new Error('No reviews provided')
    }
    
    const name = reviews[0].reviewer_name
    const totalReviews = reviews.length
    const averageRating = reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews
    const averageLength = reviews.reduce((sum, r) => sum + r.comment.length, 0) / totalReviews
    
    // 専門性分析
    const expertise = this.analyzeExpertise(reviews)
    
    // 影響力計算（レビューの長さと頻度に基づく）
    const influence = Math.min(1, (averageLength / 100) * (totalReviews / 10))
    
    // バイアス分析
    const bias = {
      genre: null, // 簡略化のため一旦null
      rating: averageRating > 4 ? 'lenient' as const : 
              averageRating < 2.5 ? 'harsh' as const : 'balanced' as const
    }
    
    // レビュー品質スコア
    const reviewQuality = Math.min(1, (averageLength / 50) * (expertise.length / 3))
    
    const sortedDates = reviews.map(r => r.created_at).sort()
    
    return {
      name,
      totalReviews,
      averageRating: Math.round(averageRating * 10) / 10,
      reviewQuality: Math.round(reviewQuality * 100) / 100,
      expertise,
      influence: Math.round(influence * 100) / 100,
      bias,
      activity: {
        firstReview: sortedDates[0],
        lastReview: sortedDates[sortedDates.length - 1],
        averageReviewLength: Math.round(averageLength)
      }
    }
  }
  
  private analyzeExpertise(reviews: Review[]): string[] {
    const expertise: string[] = []
    const allText = reviews.map(r => r.comment).join(' ').toLowerCase()
    
    Object.entries(expertiseKeywords).forEach(([category, keywords]) => {
      const score = keywords.reduce((sum, keyword) => {
        return sum + (allText.includes(keyword) ? 1 : 0)
      }, 0)
      
      if (score >= 2) { // 2つ以上のキーワードがあれば専門性ありとみなす
        expertise.push(category)
      }
    })
    
    return expertise
  }
  
  private calculateVariance(numbers: number[]): number {
    const mean = numbers.reduce((sum, n) => sum + n, 0) / numbers.length
    const squareDiffs = numbers.map(n => Math.pow(n - mean, 2))
    return squareDiffs.reduce((sum, sq) => sum + sq, 0) / numbers.length
  }
  
  // 映画インテリジェンス分析
  analyzeMovieIntelligence(movie: Movie, reviews: Review[]): MovieIntelligence {
    if (reviews.length === 0) {
      return this.createEmptyMovieIntelligence(movie)
    }
    
    // 全体的な感情分析
    const sentiments = reviews.map(r => this.analyzeSentiment(r.comment))
    const overallSentiment = this.aggregateSentiments(sentiments)
    
    // 論争度（評価のばらつき）
    const ratings = reviews.map(r => r.rating)
    const controversy = this.calculateVariance(ratings) / 4 // 0-1に正規化
    
    // 普遍的魅力（高評価の一貫性）
    const highRatings = ratings.filter(r => r >= 4).length
    const universalAppeal = highRatings / ratings.length
    
    // 技術的達成度（専門レビュアーの評価）
    const technicalReviews = reviews.filter(r => 
      r.comment.includes('技術') || r.comment.includes('映像') || r.comment.includes('音響')
    )
    const technicalAchievement = technicalReviews.length > 0 ? 
      technicalReviews.reduce((sum, r) => sum + r.rating, 0) / (technicalReviews.length * 5) : 0.5
    
    // 文化的影響（レビューの深さと言及頻度）
    const culturalImpact = Math.min(1, reviews.length / 20) // レビュー数に基づく簡易計算
    
    // レビュー品質の平均
    const reviewQuality = reviews.reduce((sum, r) => sum + r.comment.length, 0) / (reviews.length * 100)
    
    // トップキーワード抽出
    const topKeywords = this.extractTopKeywords(reviews)
    
    // レビュアーの多様性（一意のレビュアー数）
    const uniqueReviewers = new Set(reviews.map(r => r.reviewer_name)).size
    const reviewerDiversity = Math.min(1, uniqueReviewers / reviews.length)
    
    return {
      movieId: movie.id,
      title: movie.title,
      overallSentiment,
      controversy: Math.round(controversy * 100) / 100,
      universalAppeal: Math.round(universalAppeal * 100) / 100,
      technicalAchievement: Math.round(technicalAchievement * 100) / 100,
      culturalImpact: Math.round(culturalImpact * 100) / 100,
      reviewQuality: Math.round(reviewQuality * 100) / 100,
      topKeywords,
      reviewerDiversity: Math.round(reviewerDiversity * 100) / 100
    }
  }
  
  private aggregateSentiments(sentiments: SentimentAnalysis[]): SentimentAnalysis {
    const avgScore = sentiments.reduce((sum, s) => sum + s.score, 0) / sentiments.length
    const avgConfidence = sentiments.reduce((sum, s) => sum + s.confidence, 0) / sentiments.length
    
    const emotions = {
      joy: sentiments.reduce((sum, s) => sum + s.emotions.joy, 0) / sentiments.length,
      excitement: sentiments.reduce((sum, s) => sum + s.emotions.excitement, 0) / sentiments.length,
      disappointment: sentiments.reduce((sum, s) => sum + s.emotions.disappointment, 0) / sentiments.length,
      confusion: sentiments.reduce((sum, s) => sum + s.emotions.confusion, 0) / sentiments.length
    }
    
    return {
      score: Math.round(avgScore * 100) / 100,
      label: avgScore > 0.2 ? 'positive' : avgScore < -0.2 ? 'negative' : 'neutral',
      confidence: Math.round(avgConfidence * 100) / 100,
      emotions: {
        joy: Math.round(emotions.joy * 100) / 100,
        excitement: Math.round(emotions.excitement * 100) / 100,
        disappointment: Math.round(emotions.disappointment * 100) / 100,
        confusion: Math.round(emotions.confusion * 100) / 100
      }
    }
  }
  
  private createEmptyMovieIntelligence(movie: Movie): MovieIntelligence {
    return {
      movieId: movie.id,
      title: movie.title,
      overallSentiment: {
        score: 0,
        label: 'neutral',
        confidence: 0,
        emotions: { joy: 0, excitement: 0, disappointment: 0, confusion: 0 }
      },
      controversy: 0,
      universalAppeal: 0,
      technicalAchievement: 0,
      culturalImpact: 0,
      reviewQuality: 0,
      topKeywords: [],
      reviewerDiversity: 0
    }
  }
  
  private extractTopKeywords(reviews: Review[]): string[] {
    const allText = reviews.map(r => r.comment).join(' ')
    const allKeywords = [
      ...sentimentKeywords.positive,
      ...sentimentKeywords.negative,
      ...Object.values(expertiseKeywords).flat()
    ]
    
    const keywordCounts: { [key: string]: number } = {}
    
    allKeywords.forEach(keyword => {
      const count = (allText.match(new RegExp(keyword, 'g')) || []).length
      if (count > 0) {
        keywordCounts[keyword] = count
      }
    })
    
    return Object.entries(keywordCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([keyword]) => keyword)
  }
  
  // 完全なレビュー分析を実行
  generateFullAnalytics(movies: Movie[], allReviews: Review[]): ReviewAnalytics {
    const totalReviews = allReviews.length
    const averageRating = allReviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews
    
    // 感情分布
    const sentiments = allReviews.map(r => this.analyzeSentiment(r.comment))
    const sentimentDistribution = {
      positive: sentiments.filter(s => s.label === 'positive').length / totalReviews,
      neutral: sentiments.filter(s => s.label === 'neutral').length / totalReviews,
      negative: sentiments.filter(s => s.label === 'negative').length / totalReviews
    }
    
    // レビュアープロファイル
    const reviewerGroups = this.groupReviewsByReviewer(allReviews)
    const reviewerProfiles = reviewerGroups.map(reviews => this.generateReviewerProfile(reviews))
    const topReviewers = reviewerProfiles
      .sort((a, b) => b.influence - a.influence)
      .slice(0, 10)
    
    // 映画インテリジェンス
    const movieIntelligence = movies.map(movie => {
      const movieReviews = allReviews.filter(r => r.movie_id === movie.id)
      return this.analyzeMovieIntelligence(movie, movieReviews)
    })
    
    // トレンドトピック
    const trendingTopics = this.extractTopKeywords(allReviews)
    
    // 品質メトリクス
    const averageReviewLength = allReviews.reduce((sum, r) => sum + r.comment.length, 0) / totalReviews
    const expertiseLevel = reviewerProfiles.reduce((sum, p) => sum + p.expertise.length, 0) / reviewerProfiles.length
    const objectivity = 1 - (Math.abs(averageRating - 3) / 2) // 3から離れるほど主観的
    
    return {
      totalReviews,
      averageRating: Math.round(averageRating * 10) / 10,
      sentimentDistribution: {
        positive: Math.round(sentimentDistribution.positive * 100) / 100,
        neutral: Math.round(sentimentDistribution.neutral * 100) / 100,
        negative: Math.round(sentimentDistribution.negative * 100) / 100
      },
      topReviewers,
      movieIntelligence,
      trendingTopics,
      qualityMetrics: {
        averageReviewLength: Math.round(averageReviewLength),
        expertiseLevel: Math.round(expertiseLevel * 10) / 10,
        objectivity: Math.round(objectivity * 100) / 100
      }
    }
  }
  
  private groupReviewsByReviewer(reviews: Review[]): Review[][] {
    const groups: { [key: string]: Review[] } = {}
    
    reviews.forEach(review => {
      if (!groups[review.reviewer_name]) {
        groups[review.reviewer_name] = []
      }
      groups[review.reviewer_name].push(review)
    })
    
    return Object.values(groups)
  }
}
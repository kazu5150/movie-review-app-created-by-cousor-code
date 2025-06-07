export interface Movie {
  id: string
  title: string
  director: string
  year: number
  genre: string
  description: string
  poster_url?: string
  created_at: string
}

export interface Review {
  id: string
  movie_id: string
  reviewer_name: string
  rating: number
  comment: string
  created_at: string
}
# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

## Architecture

This is a Next.js 15 App Router movie review application using Supabase as the backend database.

**Tech Stack:**
- Next.js 15 with App Router
- TypeScript with strict mode
- Supabase for database and authentication
- Tailwind CSS v4 for styling
- Recharts for data visualization

**Database Schema:**
- `movies` table: stores movie information (title, director, year, genre, description, poster_url)
- `reviews` table: stores user reviews linked to movies (reviewer_name, rating 1-5, comment)
- Both tables use UUID primary keys and have RLS policies allowing public read/write access

**Key Architecture Patterns:**
- Server Components by default (App Router)
- Centralized Supabase client in `src/lib/supabase.ts`
- Type definitions in `src/types/movie.ts` for Movie and Review interfaces
- Path aliases configured with `@/*` pointing to `src/*`

**Required Environment Variables:**
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

**Routes:**
- `/` - Home page with movie listings
- `/add-movie` - Add new movies
- `/movie/[id]` - Individual movie details and reviews
- `/admin` - Admin dashboard
- `/stats` - Statistics and analytics

**Sample Data:**
Use `sample-data.sql` to populate the database with sample movies (MCU, anime, classic SF films).
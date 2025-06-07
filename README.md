# 映画レビューサイト

シンプルな映画レビューサイトです。Next.js App Router と Supabase を使用しています。

## セットアップ

1. Supabaseプロジェクトを作成
2. `.env.local` ファイルに以下を設定:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

3. Supabaseで以下のSQLを実行してテーブルを作成:

```sql
-- 映画テーブル
CREATE TABLE movies (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  director VARCHAR(255) NOT NULL,
  year INTEGER NOT NULL,
  genre VARCHAR(100) NOT NULL,
  description TEXT,
  poster_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- レビューテーブル
CREATE TABLE reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  movie_id UUID REFERENCES movies(id) ON DELETE CASCADE,
  reviewer_name VARCHAR(100) NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5) NOT NULL,
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Row Level Security (RLS) を有効化
ALTER TABLE movies ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- 読み取り権限を全員に付与
CREATE POLICY "Allow public read access on movies" ON movies FOR SELECT USING (true);
CREATE POLICY "Allow public read access on reviews" ON reviews FOR SELECT USING (true);

-- 書き込み権限を全員に付与
CREATE POLICY "Allow public insert access on movies" ON movies FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public insert access on reviews" ON reviews FOR INSERT WITH CHECK (true);
```

## 開発

```bash
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてください。

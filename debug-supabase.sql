-- Supabaseデバッグ用SQL
-- 以下をSupabaseダッシュボードで実行してください

-- 1. テーブル確認
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('movies', 'reviews');

-- 2. moviesテーブルの構造確認
\d movies;

-- 3. RLS設定確認
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE tablename IN ('movies', 'reviews');

-- 4. ポリシー確認
SELECT tablename, policyname, cmd, qual, with_check 
FROM pg_policies 
WHERE tablename IN ('movies', 'reviews');

-- 5. 簡単なテスト（読み込み）
SELECT COUNT(*) FROM movies;

-- 6. テスト用の映画データを挿入してみる
INSERT INTO movies (title, director, year, genre, description) 
VALUES ('テスト映画', 'テスト監督', 2024, 'テスト', 'これはテストです');

-- 7. 挿入されたデータを確認
SELECT * FROM movies WHERE title = 'テスト映画';

-- 8. 更新テスト
UPDATE movies 
SET description = 'これは更新テストです' 
WHERE title = 'テスト映画';

-- 9. 更新結果を確認
SELECT * FROM movies WHERE title = 'テスト映画';
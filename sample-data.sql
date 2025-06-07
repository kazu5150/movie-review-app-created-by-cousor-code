-- 映画レビューアプリ用サンプルデータ
-- Supabaseのダッシュボードで以下のSQLを実行してください

-- 映画データの挿入
INSERT INTO movies (title, director, year, genre, description, poster_url) VALUES

-- MCU映画
('アイアンマン', 'ジョン・フェイヴロー', 2008, 'アクション', '天才発明家トニー・スタークが最新テクノロジーを駆使したパワードスーツ「アイアンマン」となり、世界を救うヒーローへと変身する物語。MCUの記念すべき第1作目。', 'https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_SX300.jpg'),

('アイアンマン2', 'ジョン・フェイヴロー', 2010, 'アクション', 'トニー・スタークが再びアイアンマンスーツを身にまとい、新たな敵ウィップラッシュと対峙する。ブラック・ウィドウも初登場。', 'https://m.media-amazon.com/images/M/MV5BMTM0MDgwNjMyMl5BMl5BanBnXkFtZTcwNTg3NzAzMw@@._V1_SX300.jpg'),

('アベンジャーズ', 'ジョス・ウェドン', 2012, 'アクション', '地球最強のヒーローたちが一堂に会し、ロキの侵略から世界を守る。アイアンマン、キャプテン・アメリカ、ソーらが初共演。', 'https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg'),

('アベンジャーズ/エンドゲーム', 'アンソニー・ルッソ、ジョー・ルッソ', 2019, 'アクション', 'サノスに敗北した後、残されたアベンジャーズが最後の戦いに挑む。トニー・スタークの感動的な結末。', 'https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_SX300.jpg'),

-- クラシックSF
('惑星ソラリス', 'アンドレイ・タルコフスキー', 1972, 'SF', '心理学者ケルヴィンが謎の惑星ソラリスへ向かい、人間の記憶と意識の本質に迫る哲学的SF映画の傑作。', 'https://m.media-amazon.com/images/M/MV5BZmY0NWQ1YTQtYzA2Ni00MzkyLWIwNTMtNzg1NTM4NGNkY2I2XkEyXkFqcGdeQXVyNTI4MjkwNjA@._V1_SX300.jpg'),

('ブレードランナー', 'リドリー・スコット', 1982, 'SF', '2019年のロサンゼルスを舞台に、人造人間レプリカントを追うブレードランナーの物語。フィリップ・K・ディックの名作を映像化したSF映画の金字塔。', 'https://m.media-amazon.com/images/M/MV5BNzQzMzJhZTEtOWM4NS00MTdhLTg0YjgtMjM4MDRkZjUwZDBlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg'),

('2001年宇宙の旅', 'スタンリー・キューブリック', 1968, 'SF', '人類の進化と宇宙探査をテーマにした哲学的SF映画。HAL 9000の反乱と神秘的なモノリスの謎が印象的。', 'https://m.media-amazon.com/images/M/MV5BMmNlYzRiNDctZWNhMi00MzI4LThkZTctMTUzMmZkMmFmNThmXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg'),

('エイリアン', 'リドリー・スコット', 1979, 'SF', '宇宙船ノストロモ号で発生したエイリアンとの死闘を描いたSFホラーの傑作。「宇宙では、あなたの悲鳴は誰にも聞こえない」', 'https://m.media-amazon.com/images/M/MV5BOGQzZTBjMjQtOTVmMS00NGE5LWEyYmMtOGQ1ZGZjNmRkYjFhXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_SX300.jpg'),

-- 現代SF
('アライバル', 'ドゥニ・ヴィルヌーヴ', 2016, 'SF', '地球に飛来した異星人との言語を通したコミュニケーションを描く知的SF。時間の概念を覆す革新的な作品。', 'https://m.media-amazon.com/images/M/MV5BMTExMzU0ODcxNDheQTJeQWpwZ15BbWU4MDE1OTI4MzAy._V1_SX300.jpg'),

('インターステラー', 'クリストファー・ノーラン', 2014, 'SF', '地球環境の悪化により人類滅亡の危機が迫る中、宇宙へ旅立つ父と娘の愛を描いた壮大なSF叙事詩。時空を超えた愛の物語。', 'https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg'),

('エクス・マキナ', 'アレックス・ガーランド', 2014, 'SF', 'AI研究者と美しいアンドロイドの心理戦を描く、人工知能の本質に迫るスリリングなSF。', 'https://m.media-amazon.com/images/M/MV5BMTUxNzc0OTIxMV5BMl5BanBnXkFtZTgwNDI3NzU2NDE@._V1_SX300.jpg'),

('ガタカ', 'アンドリュー・ニコル', 1997, 'SF', '遺伝子操作が当たり前の近未来で、遺伝子劣等者の青年が宇宙飛行士を目指す感動的なSF。', 'https://m.media-amazon.com/images/M/MV5BNDQxOTM3MjctMzBjOS00ZDZkLWE1ZWItNGE5M2QyMDA4NWIzXkEyXkFqcGdeQXVyNTI4MjkwNjA@._V1_SX300.jpg'),

('マトリックス', 'ウォシャウスキー姉妹', 1999, 'SF', '現実と仮想現実の境界を描いた革新的なSF映画。「赤い薬と青い薬」の選択が印象的な哲学的作品。', 'https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L15BbWU4MDU4MDU2NDM@._V1_SX300.jpg'),

-- 日本のアニメ/SF
('AKIRA', '大友克洋', 1988, 'アニメ', '2019年のネオ東京を舞台に、超能力に目覚めた少年たちの物語。世界に影響を与えた日本アニメSFの金字塔。', 'https://m.media-amazon.com/images/M/MV5BM2ZiZTk1ODgtMTZkNS00NTYxLWE5NTgtZWNjY2JhMjY2NDVhXkEyXkFqcGdeQXVyMTE2NzA0Ng@@._V1_SX300.jpg'),

('ゴースト・イン・ザ・シェル', '押井守', 1995, 'アニメ', '攻殻機動隊の劇場版。サイバーパンクの世界観で、人間のアイデンティティとは何かを問いかける哲学的アニメ作品。', 'https://m.media-amazon.com/images/M/MV5BNzQzMzJhZTEtOWM4NS00MTdhLTg0YjgtMjM4MDRkZjUwZDBlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg'),

('君の名は。', '新海誠', 2016, 'アニメ', '都会に住む少年と田舎に住む少女が夢の中で入れ替わる現象を通じて出会う、美しい映像と音楽が印象的な恋愛ファンタジー。', 'https://m.media-amazon.com/images/M/MV5BODRmZDVmNzUtZDA4ZC00NjhkLWI2M2UtN2M0ZDIzNDcxYThjL15BbWU4MDU4MDgxNTgx._V1_SX300.jpg'),

('千と千尋の神隠し', '宮崎駿', 2001, 'アニメ', '10歳の少女千尋が神々の世界に迷い込み、豚に変えられた両親を救うため働く、宮崎駿監督の代表作。', 'https://m.media-amazon.com/images/M/MV5BMjlmZmI5MDctNDE2YS00YWE0LWE5ZWItZDBhYWQ0NTcxNWRhXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg'),

-- 最新SF
('テネット', 'クリストファー・ノーラン', 2020, 'SF', '時間の逆行を使ったスパイアクション。複雑な時間概念と迫力のアクションが話題を呼んだノーラン作品。', 'https://m.media-amazon.com/images/M/MV5BYzg0NGM2NjAtNmIxOC00MDJmLTg5ZmYtYzM0MTE4NWE2NzlhXkEyXkFqcGdeQXVyMTA4NjE0NjEy._V1_SX300.jpg'),

('DUNE/デューン 砂の惑星', 'ドゥニ・ヴィルヌーヴ', 2021, 'SF', 'フランク・ハーバートの不朽の名作SF小説を映像化。砂の惑星アラキスを舞台にした壮大な宇宙叙事詩。', 'https://m.media-amazon.com/images/M/MV5BN2FjNmEyNWMtYzM0ZS00NjIyLTg5YzYtYThlMGVjNzE1OGViXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg');
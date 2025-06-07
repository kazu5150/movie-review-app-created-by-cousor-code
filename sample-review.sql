-- 映画レビューサンプルデータ
-- 注意: 映画を先に追加してから、実際のUUIDに置き換えて実行してください

-- 手順:
-- 1. sample-data.sqlで映画データを追加
-- 2. SELECT id, title FROM movies ORDER BY title; でUUIDを確認
-- 3. 下記のPLACEHOLDER_UUIDを実際のUUIDに置き換え
-- 4. このSQLを実行

-- アイアンマンのレビュー
INSERT INTO reviews (movie_id, reviewer_name, rating, comment) VALUES
((SELECT id FROM movies WHERE title = 'アイアンマン'), 'MCUファン 田中', 5, 'MCUの始まりにふさわしい完璧な作品。トニー・スタークのキャラクターが魅力的。'),
((SELECT id FROM movies WHERE title = 'アイアンマン'), '映画評論家 山田', 4, 'アクションシーンが迫力満点。ヒーローの成長物語として秀逸。'),
((SELECT id FROM movies WHERE title = 'アイアンマン'), 'コミック原作ファン 佐藤', 5, '原作の魅力を忠実に映像化。ロバート・ダウニー・Jrが完璧。');

-- アイアンマン2のレビュー
INSERT INTO reviews (movie_id, reviewer_name, rating, comment) VALUES
((SELECT id FROM movies WHERE title = 'アイアンマン2'), 'MCUファン 鈴木', 4, '1作目には劣るが、ブラック・ウィドウの初登場が印象的。'),
((SELECT id FROM movies WHERE title = 'アイアンマン2'), 'アクション映画好き 高橋', 3, 'アクションは良いが、ストーリーがやや散漫な印象。'),
((SELECT id FROM movies WHERE title = 'アイアンマン2'), 'SF好き 伊藤', 4, 'MCU拡張への布石として重要な作品。再評価されるべき。');

-- アベンジャーズのレビュー
INSERT INTO reviews (movie_id, reviewer_name, rating, comment) VALUES
((SELECT id FROM movies WHERE title = 'アベンジャーズ'), 'ヒーロー映画ファン 松本', 5, 'ヒーローたちの共演が夢のよう。ジョス・ウェドンの演出が見事。'),
((SELECT id FROM movies WHERE title = 'アベンジャーズ'), '映画愛好家 吉田', 5, 'チームワークの重要性を描いた傑作。何度見ても飽きない。'),
((SELECT id FROM movies WHERE title = 'アベンジャーズ'), '親子で観た 加藤', 4, '子供と一緒に楽しめた。家族で見るのにおすすめ。');

-- アベンジャーズ/エンドゲームのレビュー
INSERT INTO reviews (movie_id, reviewer_name, rating, comment) VALUES
((SELECT id FROM movies WHERE title = 'アベンジャーズ/エンドゲーム'), 'MCU完走者 清水', 5, '11年間の集大成として完璧。トニー・スタークの最期に涙。'),
((SELECT id FROM movies WHERE title = 'アベンジャーズ/エンドゲーム'), '映画評論家 岡田', 5, '3時間があっという間。感動的なクライマックス。'),
((SELECT id FROM movies WHERE title = 'アベンジャーズ/エンドゲーム'), 'エモーショナル派 森田', 5, '感情的になりすぎて劇場で泣いてしまった。最高の終わり方。');

-- 惑星ソラリスのレビュー
INSERT INTO reviews (movie_id, reviewer_name, rating, comment) VALUES
((SELECT id FROM movies WHERE title = '惑星ソラリス'), '映画評論家 原田', 5, 'タルコフスキーの哲学的映像詩。時間をかけて観る価値のある深遠な作品。'),
((SELECT id FROM movies WHERE title = '惑星ソラリス'), 'SF愛好家 藤田', 4, '難解だが美しい映像と音楽が印象的。一度では理解しきれない深さ。'),
((SELECT id FROM movies WHERE title = '惑星ソラリス'), '学生 岩田', 3, '哲学的すぎて途中で眠くなった。でも映像美は認める。');

-- ブレードランナーのレビュー
INSERT INTO reviews (movie_id, reviewer_name, rating, comment) VALUES
((SELECT id FROM movies WHERE title = 'ブレードランナー'), 'SF評論家 新井', 5, 'SF映画の金字塔。人間とは何かを問いかける哲学的傑作。'),
((SELECT id FROM movies WHERE title = 'ブレードランナー'), '映画愛好家 木下', 4, '映像美と世界観が素晴らしい。何度見ても新しい発見がある。'),
((SELECT id FROM movies WHERE title = 'ブレードランナー'), 'サイバーパンク好き 西田', 5, 'サイバーパンクジャンルの原点。今見ても色褪せない完成度。');

-- 2001年宇宙の旅のレビュー
INSERT INTO reviews (movie_id, reviewer_name, rating, comment) VALUES
((SELECT id FROM movies WHERE title = '2001年宇宙の旅'), 'キューブリック研究者 小川', 5, 'SF映画の金字塔。50年以上経った今でも色褪せない先見性。'),
((SELECT id FROM movies WHERE title = '2001年宇宙の旅'), '哲学者 村上', 5, '人類の進化をテーマにした哲学的傑作。HAL 9000が印象的。'),
((SELECT id FROM movies WHERE title = '2001年宇宙の旅'), '一般観客 長谷川', 2, '難解すぎて理解できなかった。でも映像は美しい。');

-- エイリアンのレビュー
INSERT INTO reviews (movie_id, reviewer_name, rating, comment) VALUES
((SELECT id FROM movies WHERE title = 'エイリアン'), 'ホラー映画評論家 木村', 5, 'SFホラーの完璧なお手本。宇宙船という密室での恐怖が見事。'),
((SELECT id FROM movies WHERE title = 'エイリアン'), 'リドリー・スコット信者 斎藤', 5, 'スコット監督の代表作。エイリアンデザインも秀逸。'),
((SELECT id FROM movies WHERE title = 'エイリアン'), 'ホラー苦手 青木', 3, '怖すぎて最後まで見るのが辛かった。でも名作なのは理解できる。');

-- アライバルのレビュー
INSERT INTO reviews (movie_id, reviewer_name, rating, comment) VALUES
((SELECT id FROM movies WHERE title = 'アライバル'), '言語学者 野口', 5, '言語が思考を形作る過程を見事に描いた傑作。サピア=ウォーフ仮説のSF表現。'),
((SELECT id FROM movies WHERE title = 'アライバル'), 'SF映画ファン 井上', 5, 'ヴィルヌーヴ監督の演出が秀逸。エイミー・アダムスの演技も素晴らしい。'),
((SELECT id FROM movies WHERE title = 'アライバル'), '一般観客 橋本', 4, '最初は難しかったけどだんだん引き込まれた。時間概念が覆される体験。');

-- インターステラーのレビュー
INSERT INTO reviews (movie_id, reviewer_name, rating, comment) VALUES
((SELECT id FROM movies WHERE title = 'インターステラー'), '物理学者 坂本', 5, '科学的考証がしっかりしている。ブラックホールの描写が美しい。'),
((SELECT id FROM movies WHERE title = 'インターステラー'), '父親 宮本', 5, '父と娘の愛が宇宙規模で描かれる感動作。涙なしには見られない。'),
((SELECT id FROM movies WHERE title = 'インターステラー'), 'SF好き 佐々木', 4, 'ノーラン監督らしい複雑な構成だが、感情的にも訴えかける作品。');

-- エクス・マキナのレビュー
INSERT INTO reviews (movie_id, reviewer_name, rating, comment) VALUES
((SELECT id FROM movies WHERE title = 'エクス・マキナ'), 'AI研究者 田口', 5, 'AIの本質を鋭く突いたスリラー。チューリングテストの問題点を見事に描く。'),
((SELECT id FROM movies WHERE title = 'エクス・マキナ'), 'スリラー好き 山本', 4, '心理戦が秀逸。最後まで誰が敵なのかわからないスリル。'),
((SELECT id FROM movies WHERE title = 'エクス・マキナ'), '大学生 川口', 4, '美しい映像と緊張感ある展開。AIについて考えさせられる。');

-- ガタカのレビュー
INSERT INTO reviews (movie_id, reviewer_name, rating, comment) VALUES
((SELECT id FROM movies WHERE title = 'ガタカ'), '倫理学者 石田', 5, '遺伝子差別をテーマにした社会派SF。現在の技術発展を予見した先見性。'),
((SELECT id FROM movies WHERE title = 'ガタカ'), 'SF愛好家 大野', 5, 'イーサン・ホークの演技が光る。希望を失わない主人公に感動。'),
((SELECT id FROM movies WHERE title = 'ガタカ'), '医学生 中島', 4, '遺伝子技術の倫理問題について考えさせられる作品。');

-- マトリックスのレビュー
INSERT INTO reviews (movie_id, reviewer_name, rating, comment) VALUES
((SELECT id FROM movies WHERE title = 'マトリックス'), '哲学好き 小林', 5, '現実とは何かを問いかける革新的SF。赤い薬と青い薬の選択が印象的。'),
((SELECT id FROM movies WHERE title = 'マトリックス'), 'アクション映画ファン 渡辺', 5, 'バレットタイムなど革新的映像技術。アクションシーンが最高。'),
((SELECT id FROM movies WHERE title = 'マトリックス'), 'プログラマー 中村', 4, 'コンピューターの世界観がリアル。技術者として共感できる部分が多い。');

-- AKIRAのレビュー
INSERT INTO reviews (movie_id, reviewer_name, rating, comment) VALUES
((SELECT id FROM movies WHERE title = 'AKIRA'), 'アニメ評論家 石井', 5, '日本アニメの最高峰。30年経っても色褪せない革新的映像表現。'),
((SELECT id FROM movies WHERE title = 'AKIRA'), '海外ファン ジョン', 5, '世界中のクリエイターに影響を与えた伝説的作品。バイクシーンは圧巻。'),
((SELECT id FROM movies WHERE title = 'AKIRA'), 'アニメ初心者 小川', 3, '絵は凄いけど話が難しい。バイクシーンはかっこよかった。');

-- ゴースト・イン・ザ・シェルのレビュー
INSERT INTO reviews (movie_id, reviewer_name, rating, comment) VALUES
((SELECT id FROM movies WHERE title = 'ゴースト・イン・ザ・シェル'), 'サイバーパンク愛好家 村上', 5, '攻殻機動隊の哲学的テーマを見事に映像化。押井守監督の傑作。'),
((SELECT id FROM movies WHERE title = 'ゴースト・イン・ザ・シェル'), 'アニメファン 長谷川', 4, '美しい映像と深いテーマ。大人向けのアニメ作品。'),
((SELECT id FROM movies WHERE title = 'ゴースト・イン・ザ・シェル'), 'SF好き 木村', 4, '人間のアイデンティティについて考えさせられる作品。');

-- 君の名は。のレビュー
INSERT INTO reviews (movie_id, reviewer_name, rating, comment) VALUES
((SELECT id FROM movies WHERE title = '君の名は。'), '映画評論家 斎藤', 5, '美しい映像と音楽が心に響く傑作。新海誠監督の代表作として文句なし。'),
((SELECT id FROM movies WHERE title = '君の名は。'), 'アニメファン 青木', 4, '恋愛要素とSF要素のバランスが絶妙。何度も見たくなる作品。'),
((SELECT id FROM movies WHERE title = '君の名は。'), '高校生 野口', 5, '同世代として共感できる部分が多い。涙が止まらなかった。');

-- 千と千尋の神隠しのレビュー
INSERT INTO reviews (movie_id, reviewer_name, rating, comment) VALUES
((SELECT id FROM movies WHERE title = '千と千尋の神隠し'), 'ジブリファン 井上', 5, '宮崎駿監督の最高傑作。子供から大人まで楽しめる普遍的な物語。'),
((SELECT id FROM movies WHERE title = '千と千尋の神隠し'), '家族連れ 橋本', 5, '子供と一緒に見て感動した。何度でも見たい名作。'),
((SELECT id FROM movies WHERE title = '千と千尋の神隠し'), 'アニメーター 坂本', 5, '手描きアニメーションの究極形。技術的にも芸術的にも完璧。');

-- テネットのレビュー
INSERT INTO reviews (movie_id, reviewer_name, rating, comment) VALUES
((SELECT id FROM movies WHERE title = 'テネット'), 'ノーラン信者 宮本', 5, 'ノーラン監督の集大成。時間逆行のアイデアが革新的。何度も見たくなる。'),
((SELECT id FROM movies WHERE title = 'テネット'), 'アクション好き 佐々木', 4, 'アクションは凄いけど話が複雑すぎる。でも映像技術は文句なし。'),
((SELECT id FROM movies WHERE title = 'テネット'), '困惑した観客 田口', 2, '正直よくわからなかった。映像技術だけは素晴らしい。');

-- DUNE/デューン 砂の惑星のレビュー
INSERT INTO reviews (movie_id, reviewer_name, rating, comment) VALUES
((SELECT id FROM movies WHERE title = 'DUNE/デューン 砂の惑星'), '原作ファン 山本', 5, '映像化不可能と言われた原作を見事に映像化。続編が待ち遠しい。'),
((SELECT id FROM movies WHERE title = 'DUNE/デューン 砂の惑星'), '映像技術者 川口', 5, '砂漠の映像が圧巻。音響設計も素晴らしく、IMAXで観るべき。'),
((SELECT id FROM movies WHERE title = 'DUNE/デューン 砂の惑星'), '初見観客 石田', 3, '世界観は壮大だが話が途中で終わる感じ。続編前提の構成。');
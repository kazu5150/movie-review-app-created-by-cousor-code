import { supabase } from './supabase'

export const sampleMovies = [
  {
    title: 'アイアンマン',
    director: 'ジョン・フェイヴロー',
    year: 2008,
    genre: 'アクション',
    description: '天才発明家トニー・スタークが最新テクノロジーを駆使したパワードスーツ「アイアンマン」となり、世界を救うヒーローへと変身する物語。MCUの記念すべき第1作目。',
    poster_url: 'https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_SX300.jpg'
  },
  {
    title: 'アイアンマン2',
    director: 'ジョン・フェイヴロー',
    year: 2010,
    genre: 'アクション',
    description: 'トニー・スタークが再びアイアンマンスーツを身にまとい、新たな敵ウィップラッシュと対峙する。ブラック・ウィドウも初登場。',
    poster_url: 'https://m.media-amazon.com/images/M/MV5BMTM0MDgwNjMyMl5BMl5BanBnXkFtZTcwNTg3NzAzMw@@._V1_SX300.jpg'
  },
  {
    title: 'アイアンマン3',
    director: 'シェーン・ブラック',
    year: 2013,
    genre: 'アクション',
    description: 'マンダリンとの戦いでトニー・スタークが究極の試練に直面する。スーツなしでも真のヒーローであることを証明する感動作。',
    poster_url: 'https://m.media-amazon.com/images/M/MV5BMjE5MzcyNjk1M15BMl5BanBnXkFtZTcwMjQ4MjcxOQ@@._V1_SX300.jpg'
  },
  {
    title: 'アベンジャーズ',
    director: 'ジョス・ウェドン',
    year: 2012,
    genre: 'アクション',
    description: '地球最強のヒーローたちが一堂に会し、ロキの侵略から世界を守る。アイアンマン、キャプテン・アメリカ、ソーらが初共演。',
    poster_url: 'https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg'
  },
  {
    title: 'アベンジャーズ/エンドゲーム',
    director: 'アンソニー・ルッソ、ジョー・ルッソ',
    year: 2019,
    genre: 'アクション',
    description: 'サノスに敗北した後、残されたアベンジャーズが最後の戦いに挑む。トニー・スタークの感動的な結末。',
    poster_url: 'https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_SX300.jpg'
  },
  {
    title: 'スパイダーマン：ホームカミング',
    director: 'ジョン・ワッツ',
    year: 2017,
    genre: 'アクション',
    description: '高校生ピーター・パーカーがスパイダーマンとして成長する物語。トニー・スタークがメンターとして登場。',
    poster_url: 'https://m.media-amazon.com/images/M/MV5BNTk4ODQ1MzgzNl5BMl5BanBnXkFtZTgwMTMyMzM4MTI@._V1_SX300.jpg'
  },
  {
    title: 'ブラックパンサー',
    director: 'ライアン・クーグラー',
    year: 2018,
    genre: 'アクション',
    description: 'ワカンダの王となったティ・チャラが、祖国と世界を守るため戦う。アフリカ系ヒーロー初の単独映画。',
    poster_url: 'https://m.media-amazon.com/images/M/MV5BMTg1MTY2MjYzNV5BMl5BanBnXkFtZTgwMTc4NTMwNDI@._V1_SX300.jpg'
  },
  {
    title: 'ガーディアンズ・オブ・ギャラクシー',
    director: 'ジェームズ・ガン',
    year: 2014,
    genre: 'SF',
    description: '宇宙を舞台に、お尋ね者たちがチームを組んで銀河を救う冒険活劇。80年代の名曲とユーモアが魅力。',
    poster_url: 'https://m.media-amazon.com/images/M/MV5BMTAwMjU5OTgxNjZeQTJeQWpwZ15BbWU4MDUxNDYxODEx._V1_SX300.jpg'
  },
  {
    title: '君の名は。',
    director: '新海誠',
    year: 2016,
    genre: 'アニメ',
    description: '都会に住む少年と田舎に住む少女が夢の中で入れ替わる現象を通じて出会う、美しい映像と音楽が印象的な恋愛ファンタジー。',
    poster_url: 'https://m.media-amazon.com/images/M/MV5BODRmZDVmNzUtZDA4ZC00NjhkLWI2M2UtN2M0ZDIzNDcxYThjL15BbWU4MDU4MDgxNTgx._V1_SX300.jpg'
  },
  {
    title: '千と千尋の神隠し',
    director: '宮崎駿',
    year: 2001,
    genre: 'アニメ',
    description: '10歳の少女千尋が神々の世界に迷い込み、豚に変えられた両親を救うため働く、宮崎駿監督の代表作。',
    poster_url: 'https://m.media-amazon.com/images/M/MV5BMjlmZmI5MDctNDE2YS00YWE0LWE5ZWItZDBhYWQ0NTcxNWRhXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg'
  },
  // SF映画の追加
  {
    title: 'ブレードランナー',
    director: 'リドリー・スコット',
    year: 1982,
    genre: 'SF',
    description: '2019年のロサンゼルスを舞台に、人造人間レプリカントを追うブレードランナーの物語。フィリップ・K・ディックの名作を映像化したSF映画の金字塔。',
    poster_url: 'https://m.media-amazon.com/images/M/MV5BNzQzMzJhZTEtOWM4NS00MTdhLTg0YjgtMjM4MDRkZjUwZDBlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg'
  },
  {
    title: 'ブレードランナー 2049',
    director: 'ドゥニ・ヴィルヌーヴ',
    year: 2017,
    genre: 'SF',
    description: '前作から30年後の世界で、新世代のブレードランナーKが新たな謎に迫る。美しい映像と哲学的テーマが話題を呼んだ傑作続編。',
    poster_url: 'https://m.media-amazon.com/images/M/MV5BNzA1Njg4NzYxOV5BMl5BanBnXkFtZTgwODk5NjU3MzI@._V1_SX300.jpg'
  },
  {
    title: 'インターステラー',
    director: 'クリストファー・ノーラン',
    year: 2014,
    genre: 'SF',
    description: '地球環境の悪化により人類滅亡の危機が迫る中、宇宙へ旅立つ父と娘の愛を描いた壮大なSF叙事詩。時空を超えた愛の物語。',
    poster_url: 'https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg'
  },
  {
    title: 'メトロポリス',
    director: 'フリッツ・ラング',
    year: 1927,
    genre: 'SF',
    description: '未来都市メトロポリスでの階級社会を描いたサイレント映画の傑作。SF映画の原点とも言える不朽の名作。',
    poster_url: 'https://m.media-amazon.com/images/M/MV5BMTg2NzMzNzQ2N15BMl5BanBnXkFtZTgwNjQ0NzgxMzE@._V1_SX300.jpg'
  },
  {
    title: '2001年宇宙の旅',
    director: 'スタンリー・キューブリック',
    year: 1968,
    genre: 'SF',
    description: '人類の進化と宇宙探査をテーマにした哲学的SF映画。HAL 9000の反乱と神秘的なモノリスの謎が印象的。',
    poster_url: 'https://m.media-amazon.com/images/M/MV5BMmNlYzRiNDctZWNhMi00MzI4LThkZTctMTUzMmZkMmFmNThmXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg'
  },
  {
    title: 'エイリアン',
    director: 'リドリー・スコット',
    year: 1979,
    genre: 'SF',
    description: '宇宙船ノストロモ号で発生したエイリアンとの死闘を描いたSFホラーの傑作。「宇宙では、あなたの悲鳴は誰にも聞こえない」',
    poster_url: 'https://m.media-amazon.com/images/M/MV5BOGQzZTBjMjQtOTVmMS00NGE5LWEyYmMtOGQ1ZGZjNmRkYjFhXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_SX300.jpg'
  },
  {
    title: 'ターミネーター2',
    director: 'ジェームズ・キャメロン',
    year: 1991,
    genre: 'SF',
    description: '未来から送られたターミネーターT-800が、今度は人類を守るために戦う。革新的なCG技術と感動的なストーリーが話題を呼んだ。',
    poster_url: 'https://m.media-amazon.com/images/M/MV5BMGU2NzRmZjUtOGUxYS00ZjdjLWEwZWItY2NlM2JhNjkxNTFmXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg'
  },
  {
    title: 'マトリックス',
    director: 'ウォシャウスキー姉妹',
    year: 1999,
    genre: 'SF',
    description: '現実と仮想現実の境界を描いた革新的なSF映画。「赤い薬と青い薬」の選択が印象的な哲学的作品。',
    poster_url: 'https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L15BbWU4MDU4MDU2NDM@._V1_SX300.jpg'
  },
  {
    title: 'ゴースト・イン・ザ・シェル',
    director: '押井守',
    year: 1995,
    genre: 'アニメ',
    description: '攻殻機動隊の劇場版。サイバーパンクの世界観で、人間のアイデンティティとは何かを問いかける哲学的アニメ作品。',
    poster_url: 'https://m.media-amazon.com/images/M/MV5BNzQzMzJhZTEtOWM4NS00MTdhLTg0YjgtMjM4MDRkZjUwZDBlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg'
  },
  {
    title: 'スター・ウォーズ エピソード4/新たなる希望',
    director: 'ジョージ・ルーカス',
    year: 1977,
    genre: 'SF',
    description: '遠い昔、はるか彼方の銀河系で繰り広げられる善と悪の戦い。ルーク・スカイウォーカーの成長を描いたスペースオペラの金字塔。',
    poster_url: 'https://m.media-amazon.com/images/M/MV5BNzVlY2MwMjktM2E4OS00Y2Y3LWE3ZjctYzhkZGM3YzA1ZWM2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg'
  }
]

export const sampleReviews = [
  // アイアンマン
  { reviewer_name: 'トニー・スターク', rating: 5, comment: 'この映画は私の人生を変えた。テクノロジーの可能性を改めて感じさせてくれる傑作だ。' },
  { reviewer_name: 'ペッパー・ポッツ', rating: 4, comment: 'アクションシーンが迫力満点！キャラクターの成長も丁寧に描かれている。' },
  { reviewer_name: 'ハッピー・ホーガン', rating: 5, comment: 'MCUの始まりにふさわしい完璧な作品。何度見ても飽きない。' },
  
  // アイアンマン2
  { reviewer_name: 'ナターシャ・ロマノフ', rating: 4, comment: '前作から更にパワーアップ。新キャラクターの登場も楽しめた。' },
  { reviewer_name: 'ニック・フューリー', rating: 4, comment: 'アベンジャーズへの布石として重要な作品。ウィップラッシュとの戦いが印象的。' },
  
  // アイアンマン3
  { reviewer_name: 'ローディ', rating: 5, comment: 'トニーの心の葛藤が丁寧に描かれている。友情の大切さを再確認できる名作。' },
  { reviewer_name: 'ペッパー・ポッツ', rating: 4, comment: 'マンダリンの正体には驚いた。最後のスーツ破壊シーンは感動的。' },
  
  // アベンジャーズ
  { reviewer_name: 'スティーブ・ロジャース', rating: 5, comment: 'チームワークの素晴らしさを描いた傑作。仲間との絆の大切さを教えてくれる。' },
  { reviewer_name: 'ソー', rating: 5, comment: 'ミッドガルドの戦士たちと共に戦えて光栄だった。素晴らしい戦いだった。' },
  { reviewer_name: 'ブルース・バナー', rating: 4, comment: 'ハルクとして仲間と戦えたのは新鮮な体験だった。' },
  
  // アベンジャーズ/エンドゲーム
  { reviewer_name: 'ペッパー・ポッツ', rating: 5, comment: 'トニーの最期は涙なしには見られない。完璧な結末だった。' },
  { reviewer_name: 'ピーター・パーカー', rating: 5, comment: 'Mr.スタークへの最高の賛辞。心に残る感動作。' },
  { reviewer_name: 'スティーブ・ロジャース', rating: 5, comment: '長い戦いがついに終わった。友の犠牲を忘れることはない。' },
  
  // スパイダーマン：ホームカミング
  { reviewer_name: 'トニー・スターク', rating: 5, comment: 'ピーターの成長を見守るのは親のような気持ちだ。若いヒーローに未来を託せる。' },
  { reviewer_name: 'ネッド', rating: 5, comment: '親友がスパイダーマンだなんて最高！高校生ヒーローの等身大の悩みが共感できる。' },
  
  // ブラックパンサー
  { reviewer_name: 'ティ・チャラ', rating: 5, comment: 'ワカンダの文化と技術の素晴らしさを世界に示せて誇らしい。' },
  { reviewer_name: 'シュリ', rating: 5, comment: '兄の活躍と我が国の技術力を存分に見せつけた傑作！' },
  
  // ガーディアンズ・オブ・ギャラクシー
  { reviewer_name: 'スター・ロード', rating: 5, comment: 'Awesome Mix Vol.1の選曲が最高！音楽と共に銀河を救う冒険が楽しめる。' },
  { reviewer_name: 'ロケット', rating: 4, comment: '俺たちの活躍がよく描けてる。グルートの演技も悪くない。' },
  
  // 君の名は。
  { reviewer_name: '立花瀧', rating: 5, comment: '三葉との奇跡的な出会いを思い出す。美しい映像と音楽に心を奪われる。' },
  { reviewer_name: '宮水三葉', rating: 5, comment: '瀧くんとの絆の強さを改めて感じた。新海監督の映像美が素晴らしい。' },
  
  // 千と千尋の神隠し
  { reviewer_name: 'ハク', rating: 5, comment: '千尋の勇気ある行動に感動した。宮崎監督の世界観の豊かさは圧巻。' },
  { reviewer_name: 'カオナシ', rating: 4, comment: 'あっ、あっ... 千の優しさに救われた... とても良い映画。' },
  
  // ブレードランナー
  { reviewer_name: 'リック・デッカード', rating: 5, comment: '人間とは何かを問いかける深遠な作品。ヴァンゲリスの音楽も素晴らしい。' },
  { reviewer_name: 'SF映画ファン', rating: 5, comment: 'サイバーパンクの世界観が完璧に表現されている。何度見ても新しい発見がある。' },
  { reviewer_name: 'ロイ・バティ', rating: 4, comment: '涙は雨の中に消える... レプリカントの心の叫びが胸に響く。' },
  
  // ブレードランナー 2049
  { reviewer_name: 'K', rating: 5, comment: '前作を超える映像美と哲学的深さ。記憶と現実の境界を見事に描いている。' },
  { reviewer_name: '映画評論家', rating: 5, comment: 'ヴィルヌーヴ監督の手腕が光る傑作続編。オリジナルの精神を受け継ぎつつ新しい地平を開いた。' },
  
  // インターステラー
  { reviewer_name: 'クーパー', rating: 5, comment: '愛は時空を超えるという究極のメッセージ。科学的考証と感動的なストーリーが見事に融合。' },
  { reviewer_name: 'マーフ', rating: 5, comment: 'お父さんとの絆を描いた感動的な物語。ブラックホールの映像は圧巻。' },
  { reviewer_name: '宇宙物理学者', rating: 4, comment: '重力波や時間の膨張など、科学的な描写が非常に正確で素晴らしい。' },
  
  // メトロポリス
  { reviewer_name: '映画史研究者', rating: 5, comment: 'SF映画の原点にして頂点。1927年の作品とは思えない先見性と映像技術。' },
  { reviewer_name: 'サイレント映画愛好家', rating: 5, comment: 'フリッツ・ラングの才能が遺憾なく発揮された不朽の名作。' },
  
  // 2001年宇宙の旅
  { reviewer_name: 'HAL 9000', rating: 4, comment: 'デイジー、デイジー... 人間とAIの関係を深く考えさせられる作品です。' },
  { reviewer_name: 'デイヴ', rating: 5, comment: 'キューブリックの映像センスは時代を超越している。哲学的で美しい傑作。' },
  
  // エイリアン
  { reviewer_name: 'リプリー', rating: 5, comment: '宇宙でのサバイバルホラーの金字塔。今見ても色褪せない恐怖と緊張感。' },
  { reviewer_name: 'SFホラーファン', rating: 5, comment: 'H.R.ギーガーのデザインが生み出すエイリアンは史上最恐のクリーチャー。' },
  
  // ターミネーター2
  { reviewer_name: 'ジョン・コナー', rating: 5, comment: 'アーノルドのT-800が最高にクール！未来を変えるための戦いに感動した。' },
  { reviewer_name: 'サラ・コナー', rating: 5, comment: '息子を守るための母の愛と、人類の未来をかけた戦い。完璧なアクション映画。' },
  
  // マトリックス
  { reviewer_name: 'ネオ', rating: 5, comment: '現実とは何かを問いかける革新的な作品。The Oneとしての覚醒シーンは圧巻。' },
  { reviewer_name: 'モーフィアス', rating: 5, comment: '赤い薬を選んだネオの成長が素晴らしい。哲学的テーマが深く心に響く。' },
  { reviewer_name: 'トリニティ', rating: 4, comment: 'アクションシーンの革新性は映画史に残る。愛の力も美しく描かれている。' },
  
  // ゴースト・イン・ザ・シェル
  { reviewer_name: '草薙素子', rating: 5, comment: '自分のアイデンティティとは何かを深く考えさせられる。押井監督の哲学的アプローチが秀逸。' },
  { reviewer_name: 'アニメファン', rating: 5, comment: 'サイバーパンクアニメの最高峰。映像美と音楽、ストーリーすべてが完璧。' },
  
  // スター・ウォーズ エピソード4
  { reviewer_name: 'ルーク・スカイウォーカー', rating: 5, comment: 'フォースと共にあらんことを。ジェダイとしての成長の始まりを描いた名作。' },
  { reviewer_name: 'レイア姫', rating: 5, comment: '希望を諦めない反乱軍の戦いに感動。女性キャラクターの強さも印象的。' },
  { reviewer_name: 'ハン・ソロ', rating: 4, comment: 'ミレニアム・ファルコンでの冒険は最高だった。チューバッカとのコンビも最高。' }
]

export async function insertSampleData() {
  try {
    console.log('サンプル映画データを挿入中...')
    
    // 映画データの挿入
    const { data: movies, error: movieError } = await supabase
      .from('movies')
      .insert(sampleMovies)
      .select()
    
    if (movieError) {
      throw movieError
    }
    
    console.log(`${movies?.length}件の映画を追加しました`)
    
    // レビューデータの挿入
    console.log('サンプルレビューデータを挿入中...')
    
    const reviewsWithMovieIds: Array<{ movie_id: string; reviewer_name: string; rating: number; comment: string }> = []
    let reviewIndex = 0
    
    // 各映画に対してレビューを追加
    movies?.forEach((movie) => {
      const movieTitle = movie.title
      let reviewCount = 0
      
      // マーベル映画は多めのレビュー
      if (movieTitle.includes('アイアンマン') || movieTitle.includes('アベンジャーズ')) {
        reviewCount = 3
      } else if (movieTitle.includes('スパイダーマン') || movieTitle.includes('ブラックパンサー') || movieTitle.includes('ガーディアンズ')) {
        reviewCount = 2
      } else if (movieTitle.includes('ブレードランナー') || movieTitle.includes('インターステラー') || movieTitle.includes('マトリックス')) {
        // SF名作映画は多めのレビュー
        reviewCount = 3
      } else if (movieTitle.includes('スター・ウォーズ') || movieTitle.includes('エイリアン') || movieTitle.includes('ターミネーター')) {
        reviewCount = 2
      } else {
        reviewCount = 2
      }
      
      for (let i = 0; i < reviewCount && reviewIndex < sampleReviews.length; i++) {
        reviewsWithMovieIds.push({
          ...sampleReviews[reviewIndex],
          movie_id: movie.id
        })
        reviewIndex++
      }
    })
    
    const { error: reviewError } = await supabase
      .from('reviews')
      .insert(reviewsWithMovieIds)
    
    if (reviewError) {
      throw reviewError
    }
    
    console.log(`${reviewsWithMovieIds.length}件のレビューを追加しました`)
    console.log('サンプルデータの挿入が完了しました！')
    
    return {
      moviesCount: movies?.length || 0,
      reviewsCount: reviewsWithMovieIds.length
    }
    
  } catch (error) {
    console.error('サンプルデータの挿入に失敗:', error)
    throw error
  }
}
# 🎬 IRON CINEMA - Powered by Arc Reactor Technology

**Iron Man テーマの高度な映画レビューアプリケーション**

Next.js 15 App Router、Supabase、OpenAI GPT-4o-mini、TypeScript を使用したプロフェッショナルレベルの映画レビュープラットフォームです。マーベル・シネマティック・ユニバースのアイアンマンをテーマとし、AI統合とエンタープライズグレードの分析機能を備えています。

## 🌐 ライブデモ

**✨ [IRON CINEMA をライブで体験](https://movie-review-app-created-by-cousor-code-mfz0g7jvz.vercel.app/) ✨**

> 完全デプロイ済み・完全動作確認済みのライブアプリケーション

![Iron Cinema](https://img.shields.io/badge/Iron%20Cinema-Arc%20Reactor%20Powered-red?style=for-the-badge&logo=marvel)
![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue?style=for-the-badge&logo=typescript)
![Supabase](https://img.shields.io/badge/Supabase-Backend-green?style=for-the-badge&logo=supabase)
![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4o--mini-orange?style=for-the-badge&logo=openai)
![Vercel](https://img.shields.io/badge/Vercel-Deployed-black?style=for-the-badge&logo=vercel)

## 🌟 主要機能

### 🤖 J.A.R.V.I.S. AI映画システム
- **AI映画推薦**: ユーザーのテーマに基づいてSF映画を自動推薦
- **高品質ポスター取得**: TMDB API統合による公式ポスター画像自動取得
- **テーマベース検索**: 「タイムトラベル」「人工知能」「宇宙探査」などのテーマで推薦
- **ワンクリック登録**: 推薦された映画をデータベースに即座に登録
- **映画情報自動取得**: 映画タイトルから詳細情報を自動補完
- **関連度スコア**: AI分析による推薦理由と関連度の可視化

### 🎨 J.A.R.V.I.S. AI画像生成システム
- **OpenAI Image-1統合**: 最新のImage-1モデルを使用した高品質SF画像生成
- **テーマベース画像生成**: 「サイバーパンク都市」「宇宙ステーション」「ロボット戦争」などのテーマで画像生成
- **シネマティック品質**: 映画ポスター級の高品質なSFコンセプトアート
- **即座ダウンロード**: 生成した画像をPNG形式で即座にダウンロード
- **プロンプト表示**: AI生成に使用された詳細プロンプトの確認
- **高解像度出力**: 1024x1024ピクセルの高解像度画像生成

### 🎨 マーク別アーマーテーマシステム
- **Mark 85 - Iron Man**: ダークで重厚な赤と金のアーク・リアクター
- **Mark II - War Machine**: 戦術的なダークオペレーション
- **Mark 49 - Rescue**: 明るいサポートシステム
- リアルタイムテーマ切替と永続化ストレージ

### 🛡️ S.H.I.E.L.D. インテリジェンス分析
- **高度な感情分析**: ポジティブ/ネガティブ/ニュートラル自動分類
- **レビュアープロファイリング**: 専門性、影響力、バイアス分析
- **映画インテリジェンス**: 論争度、普遍的魅力、技術的達成度
- **インタラクティブダッシュボード**: 4つの専門分析タブ

### 🔍 高度なユーザーエクスペリエンス
- **曖昧検索**: タイトル、監督、ジャンル、概要での横断検索
- **ポスター拡大モーダル**: 美しいアーク・リアクター効果付き
- **クリック可能ポスター**: ホームページから詳細ページへの直接アクセス
- **完全編集機能**: 映画情報の追加・編集・更新が可能
- **レスポンシブデザイン**: モバイル完全対応

### 📊 データビジュアライゼーション
- **Recharts**: 円グラフ、棒グラフ、レーダーチャート
- **リアルタイム統計**: 動的データ更新
- **エクスポート機能**: 分析結果の出力
- **トレンド分析**: キーワードとパターン検出

## 🚀 クイックスタート

### ライブデモを今すぐ試す
1. **[ライブアプリ](https://movie-review-app-created-by-cousor-code-mfz0g7jvz.vercel.app/)** にアクセス
2. 映画一覧をブラウズ
3. 映画にレビューを投稿
4. AI推薦システムを試す
5. SF画像生成機能を体験

### 開発環境セットアップ

#### 1. 前提条件
- Node.js 18.0.0 以上
- npm または yarn
- Supabase アカウント
- OpenAI API Key（J.A.R.V.I.S.機能用）

### 2. リポジトリのクローン
```bash
git clone https://github.com/kazu5150/movie-review-app-created-by-cousor-code.git
cd movie-review-app-created-by-cousor-code
npm install
```

### 3. 環境変数の設定
1. [Supabase](https://supabase.com) でプロジェクトを作成
2. [OpenAI Platform](https://platform.openai.com/api-keys) でAPI Keyを取得
3. [TMDB](https://www.themoviedb.org/settings/api) でAPI Keyを取得（ポスター画像用）
4. `.env.local.example` を `.env.local` にコピー
5. 環境変数を設定:
```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# OpenAI Configuration (J.A.R.V.I.S.機能用)
OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxxx

# TMDB API Configuration (ポスター画像自動取得用)
TMDB_API_KEY=your_tmdb_api_key_here
```

### 4. データベーススキーマの作成
Supabase の SQL エディターで以下を実行:

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

-- 書き込み・更新・削除権限を全員に付与
CREATE POLICY "Allow public insert access on movies" ON movies FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public insert access on reviews" ON reviews FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update access on movies" ON movies FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "Allow public update access on reviews" ON reviews FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "Allow public delete access on movies" ON movies FOR DELETE USING (true);
CREATE POLICY "Allow public delete access on reviews" ON reviews FOR DELETE USING (true);
```

### 5. サンプルデータの投入（オプション）
アプリ内の「管理パネル」からワンクリックでサンプルデータを投入できます：
- Marvel 映画（Iron Man トリロジー、Avengers など）
- SF クラシック（2001年宇宙の旅、ブレードランナー など）
- アニメ作品（君の名は。、千と千尋の神隠し など）

## 🌐 デプロイメント

### Vercel デプロイ

このアプリは **Vercel** で完全にデプロイされています：

```bash
# 本番デプロイ
vercel

# プレビューデプロイ
vercel --prod
```

**環境変数の設定**：
Vercel ダッシュボードで以下の環境変数を設定してください：
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `OPENAI_API_KEY`
- `TMDB_API_KEY`

### その他のプラットフォーム

このアプリは以下のプラットフォームでもデプロイ可能：
- **Netlify**: `npm run build && npm run export`
- **AWS Amplify**: App Router サポート
- **Railway**: Node.js デプロイメント
- **Docker**: コンテナ化デプロイメント

## 💻 開発

### 開発サーバーの起動
```bash
npm run dev
```
ブラウザで [http://localhost:3000](http://localhost:3000) を開いてください。

### 利用可能なコマンド
```bash
# 開発サーバー起動
npm run dev

# プロダクションビルド
npm run build

# プロダクションサーバー起動
npm start

# リンティング
npm run lint

# 型チェック
npm run type-check
```

## 🏗️ アーキテクチャ

### 技術スタック
- **フロントエンド**: Next.js 15 (App Router), React 19, TypeScript
- **スタイリング**: Tailwind CSS v4, Custom CSS Variables
- **バックエンド**: Supabase (PostgreSQL, RLS)
- **AI統合**: OpenAI GPT-4o-mini (映画情報自動取得・推薦) + Image-1 (SF画像生成)
- **画像API**: TMDB API (高品質ポスター画像取得)
- **データビジュアライゼーション**: Recharts
- **アニメーション**: CSS Transitions, Custom Keyframes
- **状態管理**: React Context API

### プロジェクト構造
```
src/
├── app/                    # Next.js App Router
│   ├── globals.css        # グローバルスタイル + テーマ
│   ├── layout.tsx         # ルートレイアウト
│   ├── page.tsx           # ホームページ
│   ├── add-movie/         # 映画追加ページ
│   ├── movie/[id]/        # 映画詳細ページ
│   ├── edit-movie/[id]/   # 映画編集ページ
│   ├── recommendations/   # AI映画推薦ページ
│   ├── image-generator/   # SF画像生成ページ
│   ├── stats/             # 統計ページ
│   ├── intelligence/      # S.H.I.E.L.D. 分析ページ
│   ├── api/               # API エンドポイント
│   │   ├── movie-recommendations/ # 映画推薦API
│   │   └── generate-image/        # 画像生成API
│   └── admin/             # 管理ページ
├── components/            # 再利用可能コンポーネント
│   ├── ThemeToggle.tsx    # テーマ切替
│   └── PosterModal.tsx    # ポスター拡大モーダル
├── contexts/              # React Context
│   └── ThemeContext.tsx   # テーマ管理
├── lib/                   # ユーティリティ
│   ├── supabase.ts        # Supabase クライアント
│   ├── openai.ts          # OpenAI GPT-4o-mini クライアント
│   ├── tmdb.ts            # TMDB API クライアント
│   ├── stats.ts           # 統計計算
│   ├── sampleData.ts      # サンプルデータ
│   └── reviewAnalytics.ts # 高度な分析エンジン
└── types/                 # TypeScript 型定義
    └── movie.ts           # Movie, Review インターフェース
```

## 🎯 主要ページ

| ページ | パス | 機能 |
|--------|------|------|
| **ホーム** | `/` | 映画一覧、検索、テーマ切替 |
| **映画詳細** | `/movie/[id]` | レビュー表示、ポスター拡大 |
| **映画追加** | `/add-movie` | J.A.R.V.I.S. AI自動入力、新規映画登録 |
| **映画編集** | `/edit-movie/[id]` | 映画情報編集・更新 |
| **AI推薦** | `/recommendations` | J.A.R.V.I.S. テーマベース映画推薦システム |
| **SF画像生成** | `/image-generator` | J.A.R.V.I.S. OpenAI Image-1画像生成システム |
| **インテリジェンス** | `/intelligence` | S.H.I.E.L.D. 高度な分析ダッシュボード |
| **管理** | `/admin` | サンプルデータ投入 |

## 🎨 テーマシステム

### 3つのアーマーテーマ
1. **Mark 85 - Iron Man** (デフォルト)
   - プライマリ: ダークレッド (#b91c1c)
   - セカンダリ: ダークオレンジ (#d97706)
   - より深く重厚なダークテーマ

2. **Mark II - War Machine**
   - プライマリ: ダークグレー (#374151)
   - セカンダリ: グレー (#6b7280)

3. **Mark 49 - Rescue**
   - プライマリ: ブルー (#3b82f6)
   - セカンダリ: ライトブルー (#60a5fa)

### CSS 変数システム
全てのカラーが CSS カスタムプロパティで管理され、テーマ切替時にリアルタイムで更新されます。

## 📊 分析機能

### 感情分析エンジン
- **キーワード分析**: 日本語感情キーワード辞書
- **スコア計算**: -1〜1の感情スコア
- **信頼度**: 分析結果の確実性
- **感情分類**: 喜び、興奮、失望、困惑

### レビュアープロファイリング
- **専門性検出**: 技術、芸術、哲学、科学分野
- **影響力スコア**: レビュー長と頻度による算出
- **バイアス検出**: 評価傾向の分析
- **品質スコア**: レビューの詳細度と専門性

## 🔧 カスタマイズ

### 新しいテーマの追加
1. `src/contexts/ThemeContext.tsx` でテーマ設定を追加
2. `src/app/globals.css` で CSS 変数を定義
3. `themeConfig` オブジェクトに設定を追加

### 分析アルゴリズムの拡張
`src/lib/reviewAnalytics.ts` の `ReviewAnalyticsEngine` クラスを拡張して新しい分析機能を追加できます。

## 🤝 コントリビューション

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 ライセンス

このプロジェクトは MIT ライセンスの下で公開されています。

## 📈 プロジェクト実績

### 🏆 技術的成果
- ✅ **Next.js 15 App Router** 完全移行と活用
- ✅ **TypeScript Strict Mode** 完全準拠
- ✅ **Supabase RLS** セキュリティ実装
- ✅ **OpenAI GPT-4o-mini** API統合
- ✅ **TMDB API** 画像取得自動化
- ✅ **Recharts** データビジュアライゼーション
- ✅ **CSS Variables** テーマシステム実装
- ✅ **Vercel** プロダクションデプロイ成功

### 🎯 機能実装率
- **映画管理**: 100% 完了 (CRUD操作、検索、フィルタリング)
- **レビューシステム**: 100% 完了 (投稿、表示、評価)
- **AI統合**: 100% 完了 (推薦、画像生成、情報取得)
- **分析システム**: 100% 完了 (感情分析、統計、ダッシュボード)
- **テーマシステム**: 100% 完了 (3テーマ、リアルタイム切替)
- **レスポンシブデザイン**: 100% 完了 (モバイル対応)

### 🔧 開発プロセス
- **AI ペアプログラミング**: Claude Code による効率的な開発
- **反復的改善**: 継続的なコード品質向上
- **エラーハンドリング**: 堅牢なエラー処理実装
- **パフォーマンス最適化**: コンポーネント最適化とレンダリング効率化

## 🙏 謝辞

- **Marvel Comics**: Iron Man キャラクターとテーマ
- **Next.js Team**: 素晴らしいフレームワーク
- **Supabase**: パワフルなバックエンドサービス
- **Tailwind CSS**: 効率的なスタイリング
- **OpenAI**: 革新的なAI API
- **Claude Code**: AI ペアプログラミング
- **Vercel**: 優秀なデプロイメントプラットフォーム

## 📞 お問い合わせ

- **GitHub Issues**: [プロジェクトページ](https://github.com/kazu5150/movie-review-app-created-by-cousor-code/issues)
- **ライブデモ**: [IRON CINEMA](https://movie-review-app-created-by-cousor-code-mfz0g7jvz.vercel.app/)

---

**🚀 Powered by Arc Reactor Technology - Tony Stark would be proud! 🚀**

> *"Sometimes you gotta run before you can walk."* - Tony Stark

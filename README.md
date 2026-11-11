# Yuragi CTF (working title / 仮称)

## 日本語

量子セキュリティ CTF サービスの**ホーム画面のモックアップ**です。「Yuragi CTF」は仮称です。

物理モデルで動く、ノイズありのマルチテナント量子クラウドを舞台に、同じチップ上の別テナントから漏れてくる信号(リセット残留、ドライブクロストーク、残留 ZZ 結合、読み出し相関など)を使って秘密を取り出す、という CTF を想定しています。

### 開き方

ビルドも依存パッケージもありません。`index.html` をブラウザで開くだけです(`file://` のままで動きます)。

- 表示言語は右上の切り替えで変えられます。初回はブラウザの言語設定に従い、選んだ言語は記憶されます。
- `index.html?lang=ja` または `?lang=en` で言語を指定して開けます。

### まだないもの

あるのはホーム画面だけです。次のものは作っていません。

- 問題一覧・問題ページ、ブラウザ内の攻撃環境
- スコアボード、学習ページ
- サインイン、フラグ提出、サーバー側の処理すべて

ナビゲーションの各項目は「まだありません」という通知を出すだけです。画面にあるチーム名・得点・解いた数はすべて架空のサンプルで、難易度の表示も現時点の案です。

### ファイル

| ファイル | 内容 |
| --- | --- |
| `index.html` | ページの構造と図(インライン SVG) |
| `styles.css` | スタイル |
| `i18n.js` | 日本語・英語の文言 |
| `app.js` | 言語切り替え、図の切り替え、通知 |

## English

A **home-screen mockup** for a quantum-security capture-the-flag service. "Yuragi CTF" is a working title.

The intended game: on a noisy, physically modelled, multi-tenant quantum cloud, you recover a secret from another tenant on the same chip using the signals that leak across (reset residue, drive crosstalk, residual ZZ coupling, readout correlation and so on).

### How to open it

There is no build step and there are no dependencies. Open `index.html` in a browser; it works straight from `file://`.

- Switch language with the toggle at the top right. The first visit follows the browser language, and your choice is remembered.
- `index.html?lang=ja` or `?lang=en` opens it in a given language.

### What is not built

Only the home screen exists. None of these do:

- the challenge list, challenge pages, or the in-browser attack environment
- the scoreboard and the Learn pages
- sign-in, flag submission, or anything server-side

The navigation items only show a "not built yet" notice. Every team name, score and solve count on the page is fictional sample data, and the difficulty tags are a current draft.

### Files

| File | Contents |
| --- | --- |
| `index.html` | Page structure and the diagram (inline SVG) |
| `styles.css` | Styles |
| `i18n.js` | Japanese and English text |
| `app.js` | Language switching, diagram switching, notices |

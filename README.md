# gulpImplementationTest
チーム内でgulpを導入するための練習用リポジトリ

## Gulpの説明
CSSやJavaScriptのファイル圧縮やファイル結合、Sassのコンパイル、ファイル変更時のブラウザリロードetc..

これらの作業をタスクとして記述しておくと、自動化で処理を行ってくれるものを「タスクランナー」と呼びます。

一時期はGruntを使うのが一般的でしたが、最近はGulpという別のタスクランナーが使われることが増えてきました。

今回はこちらを使って、作業の自動化について説明します。

## 環境設定

### Node.jsのインストール

npmコマンドを使える状態にしておく必要があるので、Node.jsをインストールしましょう。
※既にインストールが済んでいる人は飛ばして構いません。

[Node.js](https://nodejs.org/)

今回は「v0.12.0」を使用していきます。

※該当バージョンのnodeバージョンが入っていない場合はインストール
```bash
nvm install v0.12.0
```

### Gulpのインストール
```bash
npm install -g gulp
```

## 導入したgulpプラグイン一覧
- browser-sync
- gulp-autoprefixer
- gulp-concat
- gulp-minify-css
- gulp-notify
- gulp-plumber
- gulp-rename
- gulp-sass
- run-sequence

## 各プラグインの説明

### browser-sync

[browser-sync](http://www.browsersync.io/)

ローカルにサーバーを構築するために使用します。
今回は、ファイルの更新時にブラウザをリロードする機能もタスクに追加しています。

### gulp-autoprefixer

[gulp-autoprefixer](https://www.npmjs.com/package/gulp-autoprefixer)

必要なベンダープレフィックスを自動で付与するプラグイン。

対応を行わなければならないブラウザとバージョンを明示しておくことで、必要なベンダープレフィックスを都度追記してくれます。
以下が使用したコード例。

コンパイル前のSassファイル
```sass
.circle
  background: #0000EE
  width: 60px
  height: 60px
  border-radius: 30px
  transition-duration: 1.0s
```

コンパイル後のCSSファイル
```css
.circle {
  background: #0000EE;
  width: 60px;
  height: 60px;
  border-radius: 30px;
  -webkit-transition-duration: 1.0s;
          transition-duration: 1.0s; }
```

### gulp-concat、gulp-rename

- [gulp-concat](https://www.npmjs.com/package/gulp-concat)

- [gulp-rename](https://www.npmjs.com/package/gulp-rename)

「gulp-concat」はファイルの結合を、「gulp-rename」はファイル名の変更を行うプラグイン。

今回のサンプルでは、sample01.cssとsample02.cssを結合し、all.cssという名前の1つのCSSファイルを作成するために上記のプラグインを使用しています。

### gulp-minify-css

[gulp-minify-css](https://www.npmjs.com/package/gulp-minify-css)

CSSの圧縮を行うプラグイン。

### gulp-plumber

[gulp-plumber](https://www.npmjs.com/package/gulp-plumber)

gulp-plumberはタスク実行時にエラーが起きた場合に途中で処理を止めないようにするためのプラグイン。

今回のサンプルではsassファイルを監視し、ファイルに変更があったタイミングで自動でコンパイルを行うようにしています。
しかし、一度タスクが失敗してしまうとファイルの監視状態も解除されてしまいます。gulp-plumberでタスクの中断を防いでいます。

### gulp-notify

[gulp-notify](https://www.npmjs.com/package/gulp-notify)

タスク完了時、エラー発生時の通知をデスクトップに出すためのプラグイン。

### gulp-sass

[gulp-sass](https://www.npmjs.com/package/gulp-sass)

GulpでSassファイルをコンパイルするためのプラグイン。

### run-sequence

[run-sequence](https://www.npmjs.com/package/run-sequence)

記述したタスクの実行順序を制御するプラグイン。

## 参考にした資料
- [Gulp.js入門](http://liginc.co.jp/web/tutorial/117900#sec04)
- [現場で使えるgulp入門](https://app.codegrid.net/entry/gulp-1)

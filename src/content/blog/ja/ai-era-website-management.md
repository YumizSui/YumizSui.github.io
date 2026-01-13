---
title: "AI時代の持続可能な研究者webサイトの運用を考える"
pubDate: "2026-01-13"
lang: "ja"
tags: ["tech", "blog"]
---

## TL;DR
アカデミアでこの先生きのこるには研究活動のvisibilityを高めることが大切ということで、一丁前にwebサイトを運用していたわけですが、Google SitesからGitHub Pagesに移行しました。

## 背景

もともと別にこだわりはなかったのでずっと[Google Sites](https://sites.google.com/view/yumizsui)で使ってました（同年代の研究者を眺めてても大体そうしてそう）。

![移行前のウェブサイトの例](/blog/ai-era-website-management/google-sites-example.png)

*図1: 移行前のGoogle Sitesで作成したウェブサイト*

ただ、こういうのを論文公開や学会発表のたびに毎回手打ちするのだんだん面倒になってきた。
そこで、今ならローカル環境でAIコーディングに任せれば、Google Sitesで管理するコストを下回るのでは？と思って移行した。

結果として半日でベース作れたのでついでにブログにしてみた。

## 技術選定

Geminiに相談した結果、Astro + Tailwind CSSという構成に落ち着いた。
選定理由としては、情報が豊富（AIに書かせやすい）、Markdownで書ける、多言語対応が容易、なら何でも良かったため。

CS専攻としてあるまじき話だが、正直なところ、AstroやTailwind CSSやらは全く理解してない。
昔からプログラミング言語そのものには興味がなくて、むしろ何をやるか、それを実現するならどういう技術が楽かの方を気にする質だった。高専時代の優秀な友人らとは割と真逆のスタンスっぽい。
個人的には最近のAIの進化でその辺の制約から解放されつつあり楽だなーと思っている。

開発は、メインはClaude Code使いつつ、細部をCursorで調整。
最初はもとのGoogle Siteのhtmlを直接解析させて移行させようと思ったが、うまく読んでくれなかったのでページの内容をコピペしてmarkdown化させることで事なきを得た。

ポイントというか、気に入ってるのは研究成果とかをJSONファイルで管理することにしたところ。

例えば、論文情報は以下のようなJSON形式で管理してる。

```json
{
  "authors": "Furui K, and Ohue M.",
  "title": "ALLM-Ab: Active Learning-driven antibody optimization using fine-tuned protein Language Models.",
  "journal": "J. Chem. Inf. Model.",
  "details": "65.21, 11543-11557, 2025.",
  "doi": "10.1021/acs.jcim.5c01577",
  "showInEnglish": true
}
```

Curriculum Vitaeも同じようなノリで、以下のようにして英語版のページへの切り替えも自動でできるようにした。

```json
"grants": [
  {
    "period": "2025/10-2028/3",
    "name": "ACT-X 「生命と情報」",
    "nameEn": "ACT-X [Life and Information]",
    "grantNumber": "JPMJAX25LB",
    "organization": "国立研究開発法人科学技術振興機構（JST）",
    "organizationEn": "Japan Science and Technology Agency (JST)",
    "project": "研究課題「多点変異体タンパク質の高精度な結合自由エネルギー予測技術の開発」",
    "projectEn": "Highly Accurate Free Energy Prediction for Multi-Point Mutation",
    "url": "https://www.jst.go.jp/kisoken/act-x/project/111F009/111F009_2025.html",
    "showInEnglish": true
  }
]
```

## おわり

一度データ構造を作ってしまえば他の場所でも使い回せるので、LatexのCurriculum Vitaeも同じようなノリで作れるので良い。
面倒なことはAIに任せてサステナビリティを高めていきましょう。


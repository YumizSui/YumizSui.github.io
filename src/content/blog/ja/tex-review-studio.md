---
title: "LaTeXにコメントを付けるVS Code拡張を作成しました"
pubDate: "2026-11-06"
lang: "ja"
tags: ["tech", "blog"]
image: "tex-review-studio/review-editor.png"
---

OverleafやWordのように、手元のVS CodeやCursorでもLaTeXの原稿にコメントを付け、AIに修正を依頼するための[拡張機能](https://marketplace.visualstudio.com/items?itemName=yumizsui.tex-review)を作りました。

文章を選んでコメントを付けると、その横に表示されます。TeXとPDFを並べて見ながら直せますし、AIにコメントを読ませて修正を頼むこともできます。

<img src="/blog/tex-review-studio/review-workflow.gif" alt="コメントを付けて修正する操作デモ" width="960">

[Marketplace](https://marketplace.visualstudio.com/items?itemName=yumizsui.tex-review)で公開しているので、`TeX Review Studio` で検索してインストールできます。ソースコードや使い方は[GitHub](https://github.com/YumizSui/tex-review)に載せています。

ちなみに、この記事もこの拡張機能でコメントを付けながら書きました。

---
title: "Sustainable Researcher Website Management in the AI Era"
pubDate: "2026-01-13"
lang: "en"
tags: ["tech", "blog"]
---

*Disclaimer: This article was translated from the original Japanese version using LLM.*

## TL;DR

To survive in academia, it's important to increase the visibility of research activities, so I've been maintaining a website. I migrated from Google Sites to GitHub Pages.

## Background

I had been using Google Sites for my website because I didn't need anything fancy (most researchers in my generation seem to do the same).

![Example of the previous website](/blog/ai-era-website-management/google-sites-example.png)

*Figure 1: Website created with Google Sites before migration*

However, manually updating publication lists and conference presentations every time became increasingly tedious.
I thought that with AI coding tools available locally now, maintaining a custom website could be less work than managing Google Sites. So I migrated.

The result? I built the base in half a day, so I decided to add a blog while I was at it.

## Technology Selection

After consulting with Gemini, I settled on Astro + Tailwind CSS.
The selection criteria were: rich documentation (easy for AI to work with), Markdown support, and easy multilingual support. Anything meeting these requirements would have been fine.

To be honest, it's embarrassing for a CS major to admit, but I don't really understand Astro or Tailwind CSS at all.
I've never been interested in programming languages themselves; I care more about what I want to achieve and which technologies make it easiest. This seems to be the opposite stance from my talented friends from technical college days.
Personally, I feel that the recent evolution of AI is freeing me from those constraints, making things much easier.

For development, I mainly used Claude Code and fine-tuned details with Cursor.
Initially, I tried to analyze the HTML from the original Google Sites directly, but it didn't read well, so I ended up copying the page content and converting it to Markdown.

The key point—or rather, what I'm particularly satisfied with—is managing research results and such in JSON files.

For example, publication information is managed in the following JSON format:

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

Taking the same approach, the Curriculum Vitae is managed similarly, and I've set it up so that switching to the English version of the page is automated, like this:

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

## Conclusion

Once I create a data structure, I can reuse it elsewhere, so I can build a LaTeX-based Curriculum Vitae in the same way. It's great.
Let's delegate the tedious work to AI and improve our sustainability.

---
title: Decoupled components
date: 2018-12-22
author: "Mathieu Ledru"
cover: images/cover.png
coverSeo: images/cover.png
coverAuthor: rawpixel
coverOriginalUrl: https://unsplash.com/photos/C05KN4h8WKw?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText
tags: ["blog"]
---

🚀 We finally split the project into severals components.

This means that the code will be easier to maintain and all components can now evolve separately.

So the core of uniflow is now stored in a separate library. The app get a dependency on it. And all clients are now served as standalone.

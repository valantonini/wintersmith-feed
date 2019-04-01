# wintersmith-feed

[![Build Status](https://travis-ci.org/valantonini/wintersmith-feed.svg?branch=master)](https://travis-ci.org/valantonini/wintersmith-feed)
![npm](https://img.shields.io/npm/v/wintersmith-feed.svg)
![npm](https://img.shields.io/npm/dt/wintersmith-feed.svg)

An rss feed generator for [Wintersmith](https://wintersmith.io "Wintersmith")

Requires wintersmith-contents

```bash
npm install wintersmith-contents --save
npm install wintersmith-feed --save
```

```JSON
  "plugins": [
    "wintersmith-contents",
    "wintersmith-feed"
  ]
```
articles location can be configured in config.json

```JSON
  "feed": {
    "articles": "posts"
  }
```

don't forget the meta tag in the layout for autodiscovery

```pug
link(rel='alternate', type='application/rss+xml', title='RSS Feed for my blog', href='/feed.xml')
```

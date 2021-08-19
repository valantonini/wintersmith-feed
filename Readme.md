# wintersmith-feed

[![Build Status](https://travis-ci.org/valantonini/wintersmith-feed.svg?branch=master)](https://travis-ci.org/valantonini/wintersmith-feed)
![npm](https://img.shields.io/npm/v/wintersmith-feed.svg)
![npm](https://img.shields.io/npm/dt/wintersmith-feed.svg)

An rss feed generator for [Wintersmith](https://wintersmith.io "Wintersmith")

Requires wintersmith-contents and typogr

```bash
npm install wintersmith-contents --save
npm install typogr --save
npm install wintersmith-feed --save
```

```JSON
{
  "plugins": [
    "wintersmith-contents",
    "wintersmith-feed"
  ]
}
```

add to the _require_ section in wintersmith's configuration file
```json
{
  "require": {
    "typogr": "typogr"
  }
}
```


articles location can be configured in config.json. by default, it will use locals.name and locals.description for title
and description respectively. Those can be overridden in the feed config.

```JSON
{
  "feed": {
    "articles": "posts",
    "title": "my blog",
    "description": "software engineer"
  }
}
```

don't forget the meta tag in your layout for autodiscovery

```pug
link(rel='alternate', type='application/rss+xml', title='RSS Feed for my blog', href='/feed.xml')
```

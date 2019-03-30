# wintersmith-feed
An rss feed generator for [Wintersmith](https://wintersmith.io "Wintersmith")

Requires wintersmith-contents

```bash
npm install wintersmith-contents --save
```

Add the feed.js and templates to the plugins folder.

```JSON
  "plugins": [
    "wintersmith-contents",
    "./plugins/feed.js"
  ]
```
articles location can be configured in config.json
```JSON
  "feed": {
    "articles": "posts"
  }
```

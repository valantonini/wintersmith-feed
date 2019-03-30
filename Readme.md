# wintersmith-feed
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

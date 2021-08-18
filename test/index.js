const vows = require('vows');
const assert = require('assert');
const path = require('path');
const fs = require('fs');
const fastXmlParser = require('fast-xml-parser');
const wintersmith = require('wintersmith');
const site = "app";
vows
    .describe('configuration tests')
    .addBatch({
        'wintersmith environment with default configuration': {
            topic: () => {
                const configuration = {
                    "locals": {
                        "url": "http://mysite"
                    },
                    "feed": {
                        "articles": "posts"
                    },
                    "plugins": [
                        path.join(__dirname, '../src/index.js'),
                        "wintersmith-contents"
                    ]
                };
                return wintersmith(configuration, path.join(__dirname, site));
            },
            'loaded ok': function (env) {
                return assert.instanceOf(env, wintersmith.Environment);
            },
            'contents': {
                topic: function (env) {
                    env.build(path.join(__dirname, 'app/build'), this.callback);
                },
                'contains the right fields': function (env) {
                    const data = fs.readFileSync(path.join(__dirname, 'app/build/feed.xml'), 'utf-8');
                    const jsonObj = fastXmlParser.parse(data);
                    assert.strictEqual(jsonObj.rss.channel.title, "");
                    assert.strictEqual(jsonObj.rss.channel.link, "http://mysite");
                    assert.strictEqual(jsonObj.rss.channel.description, "");
                    return true;
                }
            }
        }
    })
    .addBatch({
        'wintersmith environment with local configuration': {
            topic: () => {
                const configuration = {
                    "locals": {
                        "url": "http://mysite",
                        "name": "my blog",
                        "description": "my description"
                    },
                    "feed": {
                        "articles": "posts"
                    },
                    "plugins": [
                        "../../src/index.js",
                        "wintersmith-contents"
                    ]
                };

                return wintersmith(configuration, path.join(__dirname, site));
            },
            'loaded ok': function (env) {
                return assert.instanceOf(env, wintersmith.Environment);
            },
            'contents': {
                topic: function (env) {
                    env.build(path.join(__dirname, 'app/build'), this.callback);
                },
                'contains the right fields': function (env) {
                    const data = fs.readFileSync(path.join(__dirname, 'app/build/feed.xml'), 'utf-8');
                    const jsonObj = fastXmlParser.parse(data);
                    assert.strictEqual(jsonObj.rss.channel.title, "my blog");
                    assert.strictEqual(jsonObj.rss.channel.link, "http://mysite");
                    assert.strictEqual(jsonObj.rss.channel.description, "my description");
                }

            }
        }
    })
    .addBatch({
        'wintersmith environment with explicit configuration': {
            topic: () => {
                const configuration = {
                    "locals": {
                        "url": "http://mysite",
                        "name": "my blog",
                        "description": "my description"
                    },
                    "feed": {
                        "articles": "posts",
                        "title": "overridden title",
                        "description": "overridden description"
                    },
                    "plugins": [
                        "../../src/index.js",
                        "wintersmith-contents"
                    ]
                };

                return wintersmith(configuration, path.join(__dirname, site));
            },
            'loaded ok': function (env) {
                return assert.instanceOf(env, wintersmith.Environment);
            },
            'contents': {
                topic: function (env) {
                    env.build(path.join(__dirname, 'app/build'), this.callback);
                },
                'contains the right fields': function (env) {
                    const data = fs.readFileSync(path.join(__dirname, 'app/build/feed.xml'), 'utf-8');
                    const jsonObj = fastXmlParser.parse(data);
                    assert.strictEqual(jsonObj.rss.channel.title, "overridden title");
                    assert.strictEqual(jsonObj.rss.channel.link, "http://mysite");
                    assert.strictEqual(jsonObj.rss.channel.description, "overridden description");
                }

            }
        }
    }).export(module);

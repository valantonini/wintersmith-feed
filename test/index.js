const vows = require('vows');
const assert = require('assert');
const path = require('path');
const fs = require('fs');
const fastXmlParser = require('fast-xml-parser');
const wintersmith = require('wintersmith');

vows
    .describe('configuration tests')
    .addBatch({
        'wintersmith environment with default configuration': {
            topic: () =>  {
                const config = path.join(__dirname, 'app/defaultConfig.json');
                return wintersmith(config);
            },
            'loaded ok': function(env) {
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
        'wintersmith environment with explicit configuration': {
            topic: () =>  {
                const config = path.join(__dirname, 'app/explicitConfig.json');
                return wintersmith(config);
            },
            'loaded ok': function(env) {
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
    }).export(module);

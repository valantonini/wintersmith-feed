const pug = require('pug')

function index(env, callback) {
  const defaults = {
    articles: 'articles', // directory containing contents to paginate
    title: env.locals.name || "",
    description: env.locals.description || "",
  };

  const options = Object.assign(defaults, env.config.feed || {});

  class Feed extends env.plugins.Page {
    getFilename() {
      return 'feed.xml'
    }

    getView() {
      return (env, locals, contents, templates, callback) => {

        if (!locals.url) {
          return callback(new Error('locals.url must be defined.'))
        }

        const template = pug.compileFile(`${__dirname}/templates/feed.pug`)

        const entries = env.helpers.contents
          .list(contents[options.articles])
          .filter((entry) => (
            entry instanceof env.plugins.MarkdownPage && !entry.metadata.noindex
          ))
          .sort((a, b) => b.metadata.date - a.metadata.date);

        const context = Object.assign({
          entries: entries,
          title: options.title,
          description: options.description
        }, locals, options);

        callback(null, Buffer.from(template(context)))
      }
    }
  }

  env.registerGenerator('feed', (contents, callback) => {
    callback(null, {
      'feed.xml': new Feed()
    })
  })

  callback()
}

module.exports = index

/* eslint-env node */
const path = require('path');
const fs = require('mz/fs');
const _ = require('underscore');

const def = (value, defaultValue) => typeof value !== 'undefined' ? value : defaultValue;

module.exports = function(options) {
  if(options == null)
    options = { };

  if(options.views == null)
    throw new Error('options.views is not set');

  const root             = path.resolve(options.views);
  const extension        = def(options.extension, '.html');
  const templateSettings = def(options.settings, undefined);
  const cache            = Boolean(def(options.cache, true));
  const globals          = def(options.globals, null);
  const ignoreState      = Boolean(def(options.ignoreState, false));
  const layout           = def(options.layout, null);

  const cachedTemplates  = new Map();

  async function compileTemplate(name) {
    if(cache && cachedTemplates.has(name))
      return cachedTemplates.get(name);

    const filename = path.resolve(root, name + extension);
    const contents = await fs.readFile(filename, 'utf8');
    const func = _.template(contents, templateSettings);

    if(cache)
      cachedTemplates.set(name, func);

    return func;
  }

  async function render(name, params, options) {
    const ctx = this;
    if(options == null)
      options = { };

    const data = Object.assign({ },
      globals != null ? globals : null,
      !ignoreState ? ctx.state : null,
      params
    );

    const layoutName = def(options.layout, layout);
    const templateFunc = await compileTemplate(name);

    if(!ctx.type)
      ctx.type = 'html';
    let body = templateFunc(data);

    if(layoutName != null) {
      const layoutFunc = await compileTemplate(layoutName);
      data.body = body;
      body = layoutFunc(data);
    }

    ctx.body = body;
  }

  return async function(ctx, next) {
    ctx.render = render;
    return next();
  };
};

# koa-underscore-templates

[![npm][npm-version-badge]][npm-link]
![node][node-version-badge]
[![travis][travis-badge]][travis-link]

Render [underscore.js](http://underscorejs.org/) templates with Koa.

Works with Koa 2.x or newer.

## Getting started

Add this package as a middleware for your application:

```js
const koaUnderscoreTemplates = require('koa-underscore-templates');

app.use(koaUnderscoreTemplates({
  views: __dirname + '/views',
}));
```

Then call `ctx.render` to render the page:

```js
app.use(async (ctx) => {
  await ctx.render('index.html');
});
```

## Documentation

### Middleware

The middleware takes the following options:

* **`views` (required)**  
  Path that the template names will be resolved relative to.


* **`extension` (optional, default: `.html`)**  
  If non-null, then this will be appended to the file name. For instance, `extension: .html` would make `ctx.render("index.html")` render the file `index.html`.


* **`settings` (optional)**  
  Settings that will be passed directly to `_.templates`.


* **`cache` (optional, default: `true`)**
  If `true`, templates will be cached, so changes to templates may require a restart.
  If `false`, templates will be recompiled every time a change occurs.


* **`globals` (optional)**
  If given, the properties of this object will be available to all templates.


* **`ignoreState` (optional, default: `false`)**
  If `true`, then properties of `ctx.state` will not be available to templates.


* **`layout` (optional)**  
  Set the layout template. The `body` variable is available in the layouts.


### `ctx.render( templateName, [ data, [ options ] ] )`

Render a template. Works asynchronously, so you must handle the returned promise.

If `ctx.type` has not been set, it will be automatically set to `html`.

Takes the following options:
* **`layout` (optional)**
  If set, overrides the middleware `layout` option.

[npm-version-badge]: https://img.shields.io/npm/v/koa-underscore-templates.svg?style=flat-square
[npm-link]: https://www.npmjs.com/package/koa-underscore-templates
[node-version-badge]: https://img.shields.io/node/v/koa-underscore-templates.svg?style=flat-square
[travis-badge]: https://img.shields.io/travis/frxstrem/koa-underscore-templates.svg?style=flat-square
[travis-link]: https://travis-ci.org/frxstrem/koa-underscore-templates

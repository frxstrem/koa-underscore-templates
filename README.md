# koa-underscore-templates

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

Takes the following options:
* **`layout` (optional)**
  If set, overrides the middleware `layout` option.

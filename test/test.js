/* eslint-env node */
/* eslint-env mocha */
const assert = require('chai').assert;

const compose = require('koa-compose');
const co = require('co');
const views = require('..');

it('should work', co.wrap(function* () {
  // set up middlewares
  const fn = compose([
    views(__dirname + '/views'),

    co.wrap(function* (ctx, next) {
      yield ctx.render('hello', { name: 'Person' });
    }),
  ]);

  // call middlewares
  const ctx = { };
  yield fn(ctx);

  assert.equal(ctx.type, 'html');
  assert.equal(ctx.body, 'Hello, Person!');
}));

it('should not override ctx.type when already set', co.wrap(function* () {
  // set up middlewares
  const fn = compose([
    views(__dirname + '/views'),

    co.wrap(function* (ctx, next) {
      yield ctx.render('hello', { name: 'Person' });
    }),
  ]);

  // call middlewares
  const ctx = { type: 'text' };
  yield fn(ctx);

  assert.equal(ctx.type, 'text');
  assert.equal(ctx.body, 'Hello, Person!');
}));

it('should work with global layouts', co.wrap(function* () {
  // set up middlewares
  const fn = compose([
    views(__dirname + '/views', { layout: 'layout' }),

    co.wrap(function* (ctx, next) {
      yield ctx.render('body');
    }),
  ]);

  // call middlewares
  const ctx = { };
  yield fn(ctx);

  assert.equal(ctx.type, 'html');
  assert.equal(ctx.body, 'This is layout\n\nThis is body\n\nThis is layout');
}));

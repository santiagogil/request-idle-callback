var tape = require('tape')
var ri = require('./index.js')

tape('Request Idle Callback', function (t) {
  t.plan(1)
  global.requestIdleCallback = function (cb) {return cb.toString()}
  t.equal(ri.requestIdleCallback(function (){}), 'function (){}', 'It must call window.requestIdleCallback if present')
})

tape('Request Idle Callback Shim', function (t) {
  t.plan(3)
  global.requestIdleCallback = null
  ri.requestIdleCallback(function (deadline) {
    t.equal(typeof deadline.timeRemaining, 'function', 'deadline.timeRemaining must be a function')
    t.equal(typeof deadline.timeRemaining(), 'number', 'deadline.timeRemaining must return a number')
    t.equal(typeof deadline.didTimeout, 'boolean', 'deadline.didTimeout must be a boolean')
  })
})

tape('Cancel Idle Callback', function (t) {
  t.plan(1)
  global.cancelIdleCallback = function (id) {return id}
  t.equal(ri.cancelIdleCallback(1), 1, 'It must call window.cancelIdleCallback if present')
})

tape('Cancel Idle Callback Shim', function (t) {
  clearTimeout = function (id) {return id}
  t.plan(1)
  t.equal(ri.cancelIdleCallback(1), 1, 'cancelIdleCallback must call clearTimeout with the specified id')
})

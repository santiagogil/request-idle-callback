var requestIdleCallback =
  function (cb) {
  if (global.requestIdleCallback) return global.requestIdleCallback(cb)
    var start = Date.now();
    return setTimeout(function () {
      cb({
        didTimeout: false,
        timeRemaining: function () {
          return Math.max(0, 50 - (Date.now() - start));
        }
      });
    }, 1);
  }

var cancelIdleCallback =
  function (id) {
  if (global.cancelIdleCallback) return global.cancelIdleCallback(id)
    return clearTimeout(id);
  }

exports.requestIdleCallback = requestIdleCallback
exports.cancelIdleCallback = cancelIdleCallback

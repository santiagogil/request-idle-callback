# Request Idle Callback Shim

For more information refer to [Using requestIdleCallback](https://developers.google.com/web/updates/2015/08/using-requestidlecallback)

## Install
`npm install request-idle-callback`

## Example

``` js
var ric = require('request-idle-callback')
// Executes myNonEssentialWork duting idle time on each frame or fallbacks to using setTimeout to run at most 50ms per frame
ric.requestIdleCallback(myNonEssentialWork);

function myNonEssentialWork (deadline) {
  while (deadline.timeRemaining() > 0)
    doWorkIfNeeded();
}
```

## API

### requestIdleCallback(callback(deadline))

`deadline` is an object containing: 

* `deadline.didTimeout` boolean indicating if it is still time to deadline.
* `deadline.timeRemaining` function that returns remaining time.

### cancelIdleCallback(id)

Removes callback from the queue or calls clearTimeout.

## Tests
`node tests.js`

## Licencia
MIT

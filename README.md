# safari-location [![experimental](http://badges.github.io/stability-badges/dist/experimental.svg)](http://github.com/badges/stability-badges)

Approximates the current location of Safari on your system.

Based on [`chrome-location`](https://github.com/hughsk/chrome-location).

## Usage

```js
var safariLocation = require('safari-location');
// Use a callback
safariLocation(function(l) {
  console.log(l);
});
// Use the returned Promise
safariLocation.then(function(l) {
  console.log(l);
});
```

### CLI Usage

`stdout` path to Safari (or `null`):
```bash
> safari-location
# /Applications/Safari.app/Contents/MacOS/Safari
```

Open Safari (you'll need to use quotes if Safari's path has spaces in it):

```bash
> "`safari-location`"
```

## License

MIT. See [LICENSE.md](http://github.com/davidtheclark/safari-location/blob/master/LICENSE.md) for details.

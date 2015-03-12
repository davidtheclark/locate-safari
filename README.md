# locate-safari [![experimental](http://badges.github.io/stability-badges/dist/experimental.svg)](http://github.com/badges/stability-badges)

Finds Safari on your system.

Based on [`chrome-location`](https://github.com/hughsk/chrome-location).

## Usage

```js
var locateSafari = require('locate-safari');
// Use a callback
locateSafari(function(l) {
  console.log(l);
});
// Use the returned Promise
locateSafari.then(function(l) {
  console.log(l);
});
```

### CLI Usage

`stdout` path to Safari (or `null`):
```bash
> locate-safari
# /Applications/Safari.app/Contents/MacOS/Safari
```

Open Safari (you'll need to use quotes if Safari's path has spaces in it):

```bash
> "`locate-safari`"
```

## License

MIT. See [LICENSE.md](http://github.com/davidtheclark/locate-safari/blob/master/LICENSE.md) for details.

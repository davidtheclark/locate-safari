# safari-location [![experimental](http://badges.github.io/stability-badges/dist/experimental.svg)](http://github.com/badges/stability-badges)

Approximates the current location of Safari on your system.

Based on [`chrome-location`](https://github.com/hughsk/chrome-location).

## Usage

### `location = require('safari-location')`

Returns the path to Safari as a string.

### CLI Usage

`stdout` path to Safari:
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

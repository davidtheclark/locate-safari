#!/usr/bin/env node

var locateSafari = require('./');

locateSafari().then(function(r) {
  console.log(r);
});

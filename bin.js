#!/usr/bin/env node

var safariLocation = require('./');

safariLocation().then(function(r) {
  console.log(r);
});

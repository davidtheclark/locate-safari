var fs = require('fs');
var exec = require('child_process').exec;
var Promise = require('es6-promise').Promise;
var userhome = require('userhome');
var queue = require('queue-async');

module.exports = function(cb) {
  return new Promise(function(resolve) {
    var finisher = cb || resolve;

    if (process.platform === 'darwin') {
      getOSXPath(finisher);
    } else if (process.platform === 'win32') {
      getWinPath(finisher);
    } else {
      finisher(null);
    }
  });
}

function getOSXPath(finisher) {
  var toExec = '/Contents/MacOS/Safari';
  var regPath = '/Applications/Safari.app' + toExec;
  var altPath = userhome(regPath.slice(1));
  var mdFindCmd = 'mdfind \'kMDItemDisplayName == "Safari" && kMDItemKind == Application\'';

  queue(1)
    .defer(tryLocation, regPath, finisher)
    .defer(tryLocation, altPath, finisher)
    .defer(tryMd);

  function tryMd(next) {
    exec(mdFindCmd, function(err, stdout) {
      if (err || !stdout) next();
      else finisher(stdout.trim() + toExec);
    })
  }
}

function getWinPath(finisher) {
  var toExec = '\\Safari\\Safari.exe';
  var prefixes = [
    process.env.PROGRAMFILES,
    process.env['PROGRAMFILES(X86)']
  ];

  var q = queue(1);
  prefixes.forEach(function(pfx) {
    q.defer(tryLocation, pfx + toExec, finisher);
  });
  q.awaitAll(function() { finisher(null); });
}

function tryLocation(p, success, next) {
  fs.exists(p, function(exists) {
    if (exists) success(p);
    else next();
  });
}

var fs = require('fs');
var exec = require('child_process').exec;
var Promise = require('es6-promise').Promise;
var userhome = require('userhome');
var queue = require('queue-async');

var osx = process.platform === 'darwin';
var win = process.platform === 'win32'

module.exports = function(cb) {
  return new Promise(function(resolve) {
    var finisher = cb || function(r) {
      resolve(r);
    };

    if (osx) {
      getOSXPath(finisher);
    } else if (win) {
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
    .defer(tryLocation, regPath)
    .defer(tryLocation, altPath)
    .defer(tryMd);

  function tryLocation(p, cb) {
    fs.exists(p, function(exists) {
      if (exists) finisher(p);
      else cb();
    });
  }

  function tryMd(cb) {
    exec(mdFindCmd, function(err, stdout) {
      if (err || !stdout) cb();
      else finisher(stdout.trim() + toExec);
    })
  }
}

function getWinPath(finisher) {
  var winPath = process.env['PROGRAMFILES(X86)'] + '\\Safari\\Safari.exe';

  fs.exists(winPath, function(exists) {
    finisher(exists ? winPath : null);
  });
}

var fs = require('fs');
var osx = process.platform === 'darwin';
var win = process.platform === 'win32'

if (osx) {
  module.exports = getOSXPath();
} else if (win) {
  module.exports = getWinPath();
}

module.exports = module.exports || null;

function getOSXPath() {
  var osxSuffix = '/Contents/MacOS/Safari';
  var regPath = '/Applications/Safari.app' + osxSuffix;
  var altPath = require('userhome')(regPath.slice(1));
  var mdFindCmd = 'mdfind \'kMDItemDisplayName == "Safari" && kMDItemKind == Application\'';

  if (fs.existsSync(regPath)) {
    return regPath;
  }

  if (fs.existsSync(altPath)) {
    return altPath;
  }

  var foundPath = require('child_process').execSync(mdFindCmd, { encoding: 'utf8' });
  return (foundPath)
    ? foundPath.trim() + osxSuffix
    : null;
}

function getWinPath() {
  var winPath = process.env['PROGRAMFILES(X86)'] + '\\Safari\\Safari.exe';

  return fs.existsSync(winPath)
    ? winPath
    : null;
}

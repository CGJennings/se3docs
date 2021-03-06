//
// linkcheck.js
//
// A Node.js script to check for broken document links,
// orphan documents that nothing links to, and other
// common issues.
//

const path = require('path');
const fs = require('fs');

const SOURCE_DIR = path.resolve(__dirname, "..", "docs");

// get a list of all the Markdown source files
let sources = fs.readdirSync(SOURCE_DIR).filter((f, i, a) => f.endsWith('.md'));

// make a copy to track orphans (files not linked to by any document)
let orphans = sources.slice();

let totalProblems = 0;

/** reportProblem(filename, message) */
let reportProblem = (function () {
  let lastErrorFile;
  return function (filename, message) {
    if (filename !== lastErrorFile) {
      lastErrorFile = filename;
      console.log(`\n${filename}:`);
    }
    console.log(`  ${message}`);
    ++totalProblems;
  }
})();

function removeOrphan(filename) {
  let i = orphans.indexOf(filename);
  if (i >= 0) orphans.splice(i, 1);
}


function checkForPlaceholder(filename, text) {
  if (text.trim().length === 0) {
    reportProblem(filename, 'empty placeholder');
  }
}

function checkForBrokenLinks(filename, text) {
  let linkRegex = /\]\(([-\w\d]+\.md)/g;
  let match;
  do {
    match = linkRegex.exec(text);
    if (match) {
      let target = match[1];
      if (sources.indexOf(target) < 0) {
        reportProblem(filename, `broken link to ${target}`);
      } else {
        removeOrphan(target);
      }
    }
  } while (match);
}

function checkForWindowsPaths(filename, text) {
  let pathRegex = /\]\([^)]*\\/g;
  if (pathRegex.exec(text)) {
    reportProblem(filename, 'detected Windows-style path (\\) in link or reference');
  }
}

function checkForAbsoluteDocPaths(filename, text) {
  let pathRegex = /https?:\/\/cgjennings.github.io\/se3docs\//g;
  if (pathRegex.exec(text)) {
    reportProblem(filename, 'detected absolute se3docs link; shorten to a relative path (e.g., assets/javadoc/...)');
  }
}

// For each source file:
//   - find all the links in the text
//   - check that the link target exists
//   - cross the link target off the orphans list
for (let filename of sources) {
  let text = fs.readFileSync(path.resolve(SOURCE_DIR, filename), { encoding: 'utf8' });
  checkForPlaceholder(filename, text);
  checkForBrokenLinks(filename, text);
  checkForWindowsPaths(filename, text);
  checkForAbsoluteDocPaths(filename, text);
}

removeOrphan("index.md");
orphans.forEach((f, i, a) => reportProblem(f, 'not linked to by any file'));

console.log(`\n${totalProblems} problem(s) found\n`)
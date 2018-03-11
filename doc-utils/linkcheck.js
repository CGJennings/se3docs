//
// linkcheck.js
//
// A Node.js script to check for broken document links
// and orphan documents that nothing links to.
//

const path = require('path');
const fs = require('fs');

const SOURCE_DIR = path.resolve(__dirname, "..", "docs");

// get a list of all the Markdown source files
let sources = fs.readdirSync(SOURCE_DIR).filter( (f,i,a) => f.endsWith('.md') );

// make a copy to track orphans (files not linked to by any document)
let orphans = sources.slice();

/** reportProblem(filename, message) */
let reportProblem = (function() {
  let lastErrorFile;
  return function(filename, message) {
    if(filename !== lastErrorFile ) {
      lastErrorFile = filename;
      console.log(`${filename}:`);
    }
    console.log(`  ${message}`);
  }
})();

// For each source file:
//   - find all the links in the text
//   - check that the link target exists
//   - cross the link target off the orphans list
for(let filename of sources) {
  let text = fs.readFileSync( path.resolve(SOURCE_DIR, filename), {encoding: 'utf8'} );
  let linkRegex = /\]\(([-\w\d]+\.md)\)/g;
  let link;

  if(text.trim().length === 0) {
    reportProblem( filename, 'empty placeholder');
  }

  do {
    link = linkRegex.exec(text);
    if(link) {
      let target = link[1];
      if(sources.indexOf(target) < 0 ) {
        reportProblem(filename, `broken link to ${target}`);
      } else {
        let i = orphans.indexOf(target);
        if(i >= 0) orphans.splice(i, 1);
      }
    }
  } while(link);
}

orphans.forEach( (f,i,a) => reportProblem(f, 'not linked to by any file') );
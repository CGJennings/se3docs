//
// makenav.js
//
// A Node.js script that builds a JSON file with the serial
// navigation order for all pages. This is the order that
// the pages should be read in when using the prev/next
// links at the bottom of each page.
//

const path = require('path');
const fs = require('fs');

const SOURCE_DIR = path.resolve(__dirname, "..", "docs");

let nav = {
  title: [],
  file: []
};

let order = [];

let indices = ["um-index.md", "dm-index.md", "tm-index.md"];

for( let index of indices ) {
  let text = fs.readFileSync( path.resolve(SOURCE_DIR, index), {encoding: 'utf8'} );
  let linkRegex = /\[([^\]]+)\]\(([-\w\d]+\.md)/g;
  let match;

  do {
    match = linkRegex.exec(text);
    if(match && match[2].endsWith(".md") && match[2] !== "index.md") {
      nav.title[nav.title.length] = match[1].replace(/\*/g, "");
      nav.file[nav.file.length] = match[2].substring(0, match[2].length - ".md".length);
    }
  } while(match);
}

const outfile = path.resolve(SOURCE_DIR, "assets", "js", "nav.json");
fs.writeFileSync(outfile, JSON.stringify(nav), {encoding: "utf8"})

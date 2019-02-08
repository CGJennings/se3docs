"use strict";

// generate a table of contents

let headings = document.querySelectorAll("h2[id],h3[id],h4[id]");

if(headings.length > 1) {
    let level = 1;
    let html = "";

    for(let i=0; i<headings.length; ++i) {
        let nextLevel = headings[i].tagName.substring(1);
        while(level < nextLevel) {
            html += "<ul>";
            ++level;
        }
        while(level > nextLevel) {
            html += "</ul>";
            --level;
        }
        let target = headings[i].id;
        let title = headings[i].textContent
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
        html += "<li><a href='#" + target + "'>" + title + "</a></li>";
    }
    while(level > 1) {
        html += "</ul>";
        --level;
    }

    let tocElement = document.getElementById("toc");
    if(tocElement != null) {
        tocElement.className = "toc";
        tocElement.innerHTML = "<strong>Table of contents</strong>" + html;
    }
}

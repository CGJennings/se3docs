"use strict";

let current = location.pathname;
current = current.substring(current.lastIndexOf('/')+1)
if(current === "") current = "index.html";

// change header colour to match manual
if(current.startsWith("um-") || current.startsWith("dm-") || current.startsWith("tm-") ) {
  document.getElementById("header").classList.add(current.substring(0,2));
}

fetch("assets/js/nav.json")
.then((response) => response.json())
.then((nav) => {
  function link(title, file) {
    let div = document.createElement("div");
    if( title !== undefined ) {
      let a = document.createElement("a");
      a.href = file;
      a.textContent = title;
      a.style.flex = "1";
      let fi
      div.appendChild(a);
    }
    navDiv.appendChild(div);
  }
  
  if(!current.endsWith(".html")) return;
  current = current.substring(0, current.length - ".html".length);

  let navDiv = document.getElementById("foot-nav");

  let currIndex = nav.file.indexOf(current);
  if(currIndex < 0) return;

  let prevIndex = currIndex - 1;
  if(prevIndex >= 0 ) {
    link( nav.title[prevIndex], nav.file[prevIndex]+".html");
  } else {
    link();
  }

  let nextIndex = currIndex + 1;
  if(nextIndex < nav.file.length ) {
    link( nav.title[nextIndex], nav.file[nextIndex]+".html");
  } else {
    link();
  }
});
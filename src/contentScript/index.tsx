import React from "react";
import { createRoot } from "react-dom/client";
import ContentScript from "./contentScript";
import AddPost from "./AddPost";

function init() {
    const appContainer = document.createElement('div')
    document.body.appendChild(appContainer)
    if (!appContainer) {
        throw new Error("Can not find AppContainer");
    }
    const root = createRoot(appContainer)
    console.log(appContainer)
    root.render(<ContentScript />);
}

function socialdashPost() {
    const header = document.querySelector('.css-175oi2r.r-1pi2tsx.r-1wtj0ep.r-1rnoaur.r-o96wvk.r-1pn2ns4');
    if (header) {
        // Found the header element with role="banner"


    
        // Insert the new div as the second child of the parent div
     

        const appContainer = document.createElement('div')
        if (header.children.length >= 2) {
            header.insertBefore(appContainer, header.children[1]);
        } else {
            header.appendChild(appContainer);
        }
        const root = createRoot(appContainer)
        console.log(appContainer)
        root.render(<AddPost/>);
        console.log("header");
    } else {
        // Header element not found
        console.log('Header element with role="banner" not found');
    }
}


init();
setTimeout(()=>{
    socialdashPost()
},3000)
;
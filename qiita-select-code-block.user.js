// ==UserScript==
// @name           Qiita: Select code block
// @description    コードの右上のアイコンをクリックすると選択される
// @version        1.1
// @match          http://qiita.com/*
// @namespace      http://qiita.com/vzvu3k6k/
// @license        Public Domain
// ==/UserScript==

var style = document.createElement("style");
style.textContent = 
    '.code-frame .__select-code {' +
    '   display: none;' +
    '}' +
    '.code-frame:hover .__select-code {' +
    '   display: block;' +
    '   background: none repeat scroll 0 0 #EEEEEE;' +
    '   border-bottom: 1px solid #CCCCCC;' +
    '   border-left: 1px solid #CCCCCC;' +
    '   border-radius: 0 3px 0 3px;' +
    '   cursor: pointer;' +
    '   padding: 3px;' +
    '   float: right;' +
    '}';
document.head.appendChild(style);

document.addEventListener("DOMNodeInserted", function(e){
    var node = e.target;
    if(node.nodeType == Node.ELEMENT_NODE && node.classList.contains("code-frame"))
        if(!node.querySelector(".__select-code"))
            addSelectButton(e.target);
});

Array.prototype.forEach.call(document.querySelectorAll(".code-frame"), addSelectButton);

function addSelectButton(elmCodeFrame){
    var elmSelectButton = document.createElement("div");
    elmSelectButton.setAttribute("class", "__select-code");
    elmSelectButton.addEventListener("click", function(){
        select(elmCodeFrame.querySelector("pre"));
    });
    elmSelectButton.insertAdjacentHTML("afterbegin", '<i class="icon-paper-clip"/>');
    elmCodeFrame.insertBefore(elmSelectButton, elmCodeFrame.firstChild);
}

function select(elm){
    var select = window.getSelection();
    select.removeAllRanges();
    var range = document.createRange();
    range.selectNodeContents(elm);
    select.addRange(range);
}

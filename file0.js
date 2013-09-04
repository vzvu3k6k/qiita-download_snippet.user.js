// ==UserScript==
// @name           Qiita: Select code block
// @description    コード部分のコンテキストメニューに「コードを選択」を追加
// @version        1.0
// @match          http://qiita.com/*
// @namespace      http://qiita.com/vzvu3k6k/
// @license        Public Domain
// ==/UserScript==

location.href = "javascript:(" + function(){
    $(function(){
        var elmActiveCodeFrame; /* .code-frame */

        var menu = $('<menu type="context" id="__selectcode">')
            .append($('<menuitem label="コードを選択" id="__do-selectcode" />')
                    .on("click", function(){
                        select(elmActiveCodeFrame.querySelector("pre"));
                    }));

        $("body").on("contextmenu", ".code-frame", function(e){
            var ct = e.currentTarget;
            elmActiveCodeFrame = ct;
            $(ct).attr("contextmenu", "__selectcode");
        }).append(menu);

        function select(elm){
            var select = window.getSelection();
            select.removeAllRanges();
            var range = document.createRange();
            range.selectNodeContents(elm);
            select.addRange(range);
        }
    });
} + ")()";
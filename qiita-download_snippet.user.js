// ==UserScript==
// @name           Qiita: Add Buttons to Download a Snippet
// @description    スニペットの右上にダウンロードボタンを追加する
// @version        1.0
// @match          http://qiita.com/*
// @namespace      http://qiita.com/vzvu3k6k/
// @license        CC0-1.0
// ==/UserScript==

const buttonClassName = '__download-snippet'

{ const style = document.createElement('style')
  style.textContent = `
    .code-frame .${buttonClassName} {
      color       : #000;
      display     : block;
      float       : right;
      margin-left : -100px;
      padding     : 3px 6px;
    }
  `
  document.head.appendChild(style)
}

document.addEventListener('DOMNodeInserted', function (event) {
  const node = event.target
  if (node.nodeType === window.Node.ELEMENT_NODE &&
      node.classList.contains('code-frame') &&
      !node.querySelector(`.${buttonClassName}`)) {
    addDownloadButton(event.target)
  }
})

Array.from(document.querySelectorAll('.code-frame'), addDownloadButton)

function addDownloadButton (codeFrame) {
  const downloadButton = document.createElement('a')
  downloadButton.setAttribute('class', buttonClassName)
  { const body = codeFrame.querySelector('.highlight').textContent
    const href = `data:charset=utf-8,${encodeURIComponent(body)}`
    downloadButton.setAttribute('href', href)
  }
  { const codeLang = codeFrame.querySelector('.code-lang')
    const fileName = codeLang ? codeLang.textContent : null
    downloadButton.setAttribute('download', fileName || '')
    downloadButton.setAttribute('aria-label', fileName ? `Download ${fileName}` : 'Download a snippet')
  }

  { const icon = document.createElement('i')
    icon.setAttribute('class', 'fa fa-download')
    icon.setAttribute('aria-hidden', 'true')
    downloadButton.appendChild(icon)
  }

  codeFrame.insertBefore(downloadButton, codeFrame.firstChild)
}

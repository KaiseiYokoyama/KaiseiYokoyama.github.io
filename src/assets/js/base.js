document.addEventListener("DOMContentLoaded", () => {
    M.AutoInit();

    // citationをクリップボードにコピーするボタン
    document.querySelectorAll('#papers .citation-item')
        .forEach((itemElem) => {
            const citation = itemElem.innerText;

            const icon = document.createElement('i');
            icon.classList.add('material-icons');
            icon.innerText = 'content_copy';

            const copyButton = document.createElement('a');
            copyButton.classList.add('btn-flat', 'copy-citation');
            copyButton.onclick = () => {
                navigator.clipboard.writeText(citation)
                    .then(M.toast({html: 'Citation Copied!'}))
            }

            copyButton.appendChild(icon);
            itemElem.appendChild(copyButton);
        })
});

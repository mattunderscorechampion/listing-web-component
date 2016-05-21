
(function() {
    if (!document.registerElement) {
        return;
    }

    var CodeBlockProto = Object.create(HTMLElement.prototype);

    CodeBlockProto.createdCallback = function() {
        var dataSrc = this.getAttribute('data-src');
        var gistElement = this;

        var request = new XMLHttpRequest();
        request.onreadystatechange = function () {
            var httpResponse = this;
            var DONE = httpResponse.DONE || 4;
            if (httpResponse.readyState === DONE) {
                var shadow = gistElement.createShadowRoot();
                var style = document.createElement('style');
                style.innerHTML = '.hljs-comment,.hljs-quote{color:#8e908c}.hljs-variable,.hljs-template-variable,.hljs-tag,.hljs-name,.hljs-selector-id,.hljs-selector-class,.hljs-regexp,.hljs-deletion{color:#c82829}.hljs-number,.hljs-built_in,.hljs-builtin-name,.hljs-literal,.hljs-type,.hljs-params,.hljs-meta,.hljs-link{color:#f5871f}.hljs-attribute{color:#eab700}.hljs-string,.hljs-symbol,.hljs-bullet,.hljs-addition{color:#718c00}.hljs-title,.hljs-section{color:#4271ae}.hljs-keyword,.hljs-selector-tag{color:#8959a8}.hljs{display:block;overflow-x:auto;background:white;color:#4d4d4c;padding:0.5em}.hljs-emphasis{font-style:italic}.hljs-strong{font-weight:bold}';
                shadow.appendChild(style);
                var pre = document.createElement('pre');
                pre.style = 'text-align: left; font-size: 10pt; border: 1px solid grey';
                var code = document.createElement('code');
                code.innerHTML = httpResponse.responseText;
                pre.appendChild(code);
                hljs.highlightBlock(code);
                shadow.appendChild(pre);
            }
        };
        request.open('GET', dataSrc, true);
        request.send(null);
    };

    document.registerElement('x-code-block', {
        prototype: CodeBlockProto
    });
})();


(function() {
    {% include "normalise-data-src.js" %}

    if (!document.registerElement) {
        return;
    }

    var CodeBlockProto = Object.create(HTMLElement.prototype);
    CodeBlockProto.createdCallback = function() {
        var dataSrc = normaliseDataSrc(this.getAttribute('data-src'));
        var dataCaption = this.getAttribute('data-caption');
        var hostedByGithub = dataSrc && dataSrc.startsWith('https://gist.githubusercontent.com/');
        var gistElement = this;

        var shadow = gistElement.createShadowRoot();
        var loading = document.createElement('pre');
        var loadingCode = document.createElement('code');
        loading.appendChild(loadingCode);
        loading.style = 'text-align: left; font-size: 10pt; border: 1px solid grey';
        if (gistElement.textContent && gistElement.textContent.trim()) {
            loadingCode.textContent = gistElement.textContent.trim();
            hljs.highlightBlock(loadingCode);
        } else {
            loadingCode.textContent = 'Loading';
        }
        if (dataCaption) {
            var loadingCaption = document.createElement('div');
            loadingCaption.style = 'border-top: 1px solid grey; text-align: center;';
            loadingCaption.textContent = dataCaption;
            loading.appendChild(loadingCaption);
        }
        var style = document.createElement('style');
        style.textContent = '.hljs-comment,.hljs-quote{color:#8e908c}.hljs-variable,.hljs-template-variable,.hljs-tag,.hljs-name,.hljs-selector-id,.hljs-selector-class,.hljs-regexp,.hljs-deletion{color:#c82829}.hljs-number,.hljs-built_in,.hljs-builtin-name,.hljs-literal,.hljs-type,.hljs-params,.hljs-meta,.hljs-link{color:#f5871f}.hljs-attribute{color:#eab700}.hljs-string,.hljs-symbol,.hljs-bullet,.hljs-addition{color:#718c00}.hljs-title,.hljs-section{color:#4271ae}.hljs-keyword,.hljs-selector-tag{color:#8959a8}.hljs{display:block;overflow-x:auto;background:white;color:#4d4d4c;padding:0.5em}.hljs-emphasis{font-style:italic}.hljs-strong{font-weight:bold}';
        shadow.appendChild(style);
        shadow.appendChild(loading);

        if (dataSrc) {
            var request = new XMLHttpRequest();
            request.onreadystatechange = function () {
                var httpResponse = this;
                var DONE = httpResponse.DONE || 4;
                if (httpResponse.readyState === DONE) {
                    var pre = document.createElement('pre');
                    pre.style = 'text-align: left; font-size: 10pt; border: 1px solid grey';
                    var code = document.createElement('code');
                    code.textContent = httpResponse.responseText;
                    hljs.highlightBlock(code);
                    pre.appendChild(code);
                    if (dataCaption) {
                        var caption = document.createElement('div');
                        caption.style = 'border-top: 1px solid grey; text-align: center;';
                        caption.textContent = dataCaption;
                        pre.appendChild(caption);
                    }
                    if (hostedByGithub) {
                        var githubShout = document.createElement('div');
                        githubShout.style = 'border-top: 1px solid grey; text-align: center;';
                        githubShout.textContent = 'Hosted by GitHub';
                        pre.appendChild(githubShout);
                    }

                    while (shadow.firstChild) {
                        shadow.removeChild(shadow.firstChild);
                    }
                    var style = document.createElement('style');
                    style.textContent = '.hljs-comment,.hljs-quote{color:#8e908c}.hljs-variable,.hljs-template-variable,.hljs-tag,.hljs-name,.hljs-selector-id,.hljs-selector-class,.hljs-regexp,.hljs-deletion{color:#c82829}.hljs-number,.hljs-built_in,.hljs-builtin-name,.hljs-literal,.hljs-type,.hljs-params,.hljs-meta,.hljs-link{color:#f5871f}.hljs-attribute{color:#eab700}.hljs-string,.hljs-symbol,.hljs-bullet,.hljs-addition{color:#718c00}.hljs-title,.hljs-section{color:#4271ae}.hljs-keyword,.hljs-selector-tag{color:#8959a8}.hljs{display:block;overflow-x:auto;background:white;color:#4d4d4c;padding:0.5em}.hljs-emphasis{font-style:italic}.hljs-strong{font-weight:bold}';
                    shadow.appendChild(style);
                    shadow.appendChild(pre);
                }
            };
            request.onerror = function () {
                var pre = document.createElement('pre');
                pre.style = 'text-align: left; font-size: 10pt; border: 1px solid grey';
                var code = document.createElement('code');
                code.textContent = 'There was an error loading the page';
                pre.appendChild(code);
                if (dataCaption) {
                    var caption = document.createElement('div');
                    caption.style = 'border-top: 1px solid grey; text-align: center;';
                    caption.textContent = dataCaption;
                    pre.appendChild(caption);
                }
                if (hostedByGithub) {
                    var githubShout = document.createElement('div');
                    githubShout.style = 'border-top: 1px solid grey; text-align: center;';
                    githubShout.textContent = 'Hosted by GitHub';
                    pre.appendChild(githubShout);
                }

                while (shadow.firstChild) {
                    shadow.removeChild(shadow.firstChild);
                }
                shadow.appendChild(pre);
            };

            request.open('GET', dataSrc, true);
            request.send(null);
        }
    };

    document.registerElement('x-listing', {
        prototype: CodeBlockProto
    });
})();

(function() {
    {% include "normalise-data-src.js" %}

    var importDoc;
    if (document._currentScript) {
        importDoc = document._currentScript.ownerDocument;
    } else {
        importDoc = document.currentScript.ownerDocument;
    }
    var template = importDoc.querySelector('#x-listing-template');

    var CodeBlockProto = Object.create(HTMLElement.prototype);
    CodeBlockProto.createdCallback = function() {
        var dataSrc = normaliseDataSrc(this.getAttribute('data-src'));
        var dataCaption = this.getAttribute('data-caption');
        var hostedByGithub = dataSrc && dataSrc.startsWith('https://gist.githubusercontent.com/');
        var gistElement = this;

        var shadow = gistElement.createShadowRoot();
        var clone = template.content.cloneNode(true);
        if (gistElement.textContent && gistElement.textContent.trim()) {
            var initialCode = clone.childNodes[3].childNodes[0];
            initialCode.textContent = gistElement.textContent.trim();
            hljs.highlightBlock(initialCode);
        }
        if (dataCaption) {
            var caption = clone.querySelector('[data-name=caption]');
            caption.textContent = dataCaption;
            caption.style.display = 'block';
        }
        shadow.appendChild(document.importNode(clone, true));

        if (dataSrc) {
            var request = new XMLHttpRequest();
            request.onreadystatechange = function () {
                var httpResponse = this;
                var DONE = httpResponse.DONE || 4;
                if (httpResponse.readyState === DONE) {
                    var loadedClone = template.content.cloneNode(true);

                    var code = loadedClone.childNodes[3].childNodes[0];
                    code.textContent = httpResponse.responseText;
                    hljs.highlightBlock(code);
                    if (dataCaption) {
                        var caption = loadedClone.querySelector('[data-name=caption]');
                        caption.textContent = dataCaption;
                        caption.style.display = 'block';
                    }
                    if (hostedByGithub) {
                        var githubShout = loadedClone.querySelector('[data-name=githubShout]');
                        githubShout.style.display = 'block';
                    }

                    while (shadow.firstChild) {
                        shadow.removeChild(shadow.firstChild);
                    }
                    shadow.appendChild(document.importNode(loadedClone, true));
                }
            };
            request.onerror = function(error) {
                var loadedClone = template.content.cloneNode(true);

                var code = loadedClone.childNodes[3].childNodes[0];
                code.textContent = 'There was an error loading the page';

                if (dataCaption) {
                    var caption = loadedClone.querySelector('[data-name=caption]');
                    caption.textContent = dataCaption;
                    caption.style.display = 'block';
                }
                if (hostedByGithub) {
                    var githubShout = loadedClone.querySelector('[data-name=githubShout]');
                    githubShout.style.display = 'block';
                }

                while (shadow.firstChild) {
                    shadow.removeChild(shadow.firstChild);
                }
                shadow.appendChild(document.importNode(loadedClone, true));
            }

            request.open('GET', dataSrc, true);
            request.send(null);
        }
    };

    document.registerElement('x-listing', {
        prototype: CodeBlockProto
    });
})();

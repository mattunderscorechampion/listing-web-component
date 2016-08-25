
# Listing Web Component

The Listing Web Component provides a web component that allows code listings to
be easily embedded into your website.
I started development on this after discovering that I was
[unable to embed Gists in XHTML pages](https://www.mattunderscore.com/article/42).

It provides a custom element that loads a resource, applies highlight.js and
displays it as a code listing.

Currently it is hard coded to use the 'tomorrow' highlight.js theme.

The `src/code-block.js` contains a script that uses
[custom elements](http://w3c.github.io/webcomponents/spec/custom/) and the
[shadow DOM](http://w3c.github.io/webcomponents/spec/shadow/).
A script for highlight.js needs to be explicitly included.
The CSS has been inlined into the script and does not need to be added.

The `src/code-block.html` contains an
[HTML import](http://w3c.github.io/webcomponents/spec/imports/) that uses
[custom elements](http://w3c.github.io/webcomponents/spec/custom/), the
[shadow DOM](http://w3c.github.io/webcomponents/spec/shadow/) and
[HTML templates](https://html.spec.whatwg.org/multipage/scripting.html#the-template-element).

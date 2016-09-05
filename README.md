
# Listing Web Component

The Listing Web Component provides a web component that allows code listings to
be easily embedded into your website.
I started development on this after discovering that I was
[unable to embed Gists in XHTML pages](https://www.mattunderscore.com/article/42).

The component provides a custom element that loads a resource, applies
[highlight.js](https://highlightjs.org/) and displays it as a code listing.
Currently it is hard coded to use the 'tomorrow' highlight.js theme.

To build the web component run `npm run build`.

The `target/dist/listing-script.js` contains a script that uses
[custom elements](http://w3c.github.io/webcomponents/spec/custom/) and the
[shadow DOM](http://w3c.github.io/webcomponents/spec/shadow/).
A script for highlight.js needs to be explicitly included.
The CSS has been inlined into the script and does not need to be added.

The `target/dist/listing-import.html` contains an
[HTML import](http://w3c.github.io/webcomponents/spec/imports/) that uses
[custom elements](http://w3c.github.io/webcomponents/spec/custom/), the
[shadow DOM](http://w3c.github.io/webcomponents/spec/shadow/) and
[HTML templates](https://html.spec.whatwg.org/multipage/scripting.html#the-template-element).

The `examples` directory provides two usage examples.
One example demonstrates `listing-script.js` and the other `listing-import.html`.
Otherwise their content is the same.
Two code listings one hosted on GistHub and the other with code inlined into the
custom element.

Automated tests are run using `web-component-tester` with the command
`npm run build`.

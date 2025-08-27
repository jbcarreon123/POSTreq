<h1 class="big">POSTreq</h1>

POSTreq (abbr. POST request, acrn. <b>post</b>Message Fetch <b >Request</b >) is a minimal JavaScript library that works around  Neocities' Content Security Policy limitations on free accounts by wrapping the Fetch API into an iframe.

> Note that POSTreq is still in beta and you might discover some bugs!

## Try it!
https://postrequest.neocities.org (alternate: https://postreq.jbc.lol)

## Installation
1. You'll need the POSTreq library. You can use either of these:
    - Using NPM *(for JS frameworks)*
      ```bash
      $ npm install postreq
      $ bun install postreq
      ```
    - Using jsDelivr *(for anything else)*
      ```html
      <script src="https://cdn.jsdelivr.net/npm/postreq/dist/postreq.min.js"></script>
      ```

2. Now, you can import and use POSTreq!
    ```js
    // if you're using NPM
    import { POSTreq } from 'postreq';
    const pt = new POSTreq();

    // if you're using jsDelivr
    const pt = new POSTreq.POSTreq();

    // then you can now fetch stuff! Most of the Fetch API is supported.
    const res = await pt.fetch('https://gh.jbc.lol/buttons.json');
    ```

## Difference than JS Fetch
- Due to issues, POSTreq doesn't output the entire Response object.
- But, unlike JS Fetch, you can immediately access the data using `text()`, `blob()`, `json()`, `formData()`, and `arrayBuffer()`!

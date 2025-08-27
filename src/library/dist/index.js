class POSTreq_Iframe {
    constructor() {
        console.log('POSTreq loaded. https://postreq.jbc.lol/');
        window.addEventListener('message', async (e) => {
            if (!e.data.url)
                return;
            const evt = e;
            let p = document.querySelector('p.debug');
            if (p)
                p.textContent = JSON.stringify(evt);
            try {
                const data = evt.data;
                const res = await fetch(data.url, data.req);
                const headers = {};
                res.headers.forEach((value, name) => {
                    //@ts-ignore
                    headers[name] = value;
                });
                let json;
                try {
                    json = await res.clone().json();
                }
                catch { }
                let arrayBuffer = undefined;
                try {
                    arrayBuffer = await res.clone().arrayBuffer();
                }
                catch { }
                let blob;
                try {
                    blob = await res.clone().blob();
                }
                catch { }
                let formData;
                try {
                    formData = await res.clone().formData();
                }
                catch { }
                let text;
                try {
                    text = await res.clone().text();
                }
                catch { }
                const payload = {
                    status: res.status,
                    statusText: res.statusText,
                    headers: headers,
                    json,
                    arrayBuffer,
                    formData,
                    blob,
                    text,
                    ok: res.ok
                };
                if (p)
                    p.textContent = JSON.stringify(payload);
                evt.source?.postMessage(payload);
            }
            catch (e) {
                console.log(e);
                evt.source?.postMessage({
                    error: e
                });
            }
        });
    }
}

class POSTreq {
    _iframe;
    _url;
    constructor(params) {
        this._url = params?.url || "https://postreq.jbc.lol/postreq";
        this._iframe = document.createElement('iframe');
        if (!params?.style)
            this._iframe.style.display = "none";
        else
            this._iframe.style = params?.style;
        this._iframe.src = this._url;
        (params?.parentElement ?? document.body).appendChild(this._iframe);
    }
    async onMessage() {
        // @ts-ignore
        return new Promise(resolve => window.onmessage = (e) => {
            if (e.origin !== this._url)
                return resolve(e);
        });
    }
    async fetch(url, req) {
        if (url.includes('undefined'))
            return null;
        const obj = {
            url,
            req
        };
        this._iframe.contentWindow?.postMessage(obj);
        const res = await this.onMessage();
        return res.data;
    }
}

export { POSTreq, POSTreq_Iframe };
//# sourceMappingURL=index.js.map

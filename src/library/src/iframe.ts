import type { MessageRequest } from "./shared.js";

export class POSTreq_Iframe {
    constructor() {
        console.log('POSTreq loaded.', window.location.href);
        window.addEventListener('message', async (e) => {
            if (!e.data.url) return;
            const evt = e as MessageEvent<MessageRequest>;
            let p = document.querySelector('p.debug');
            if (p) p.textContent = JSON.stringify(evt);
            try {
                const data = evt.data as MessageRequest;
                const res = await fetch(data.url, data.req);
                const headers = {};
                res.headers.forEach((value, name) => {
                    //@ts-ignore
                    headers[name] = value;
                });

                let json: string | undefined;
                try {
                    json = await res.clone().json();
                } catch {}

                let arrayBuffer: ArrayBuffer | undefined = undefined;
                try {
                    arrayBuffer = await res.clone().arrayBuffer()
                } catch {}

                let blob: Blob | undefined;
                try {
                    blob = await res.clone().blob();
                } catch {}

                let formData: FormData | undefined;
                try {
                    formData = await res.clone().formData();
                } catch {}

                let text: string | undefined;
                try {
                    text = await res.clone().text()
                } catch {}

                const payload = {
                    postreq: true,
                    status: res.status,
                    statusText: res.statusText,
                    headers: headers,
                    json,
                    arrayBuffer,
                    formData,
                    blob,
                    text,
                    ok: res.ok,
                    type: res.type,
                    redirected: res.redirected,
                    url: data.url,
                };
                if (p) p.textContent = JSON.stringify(payload);
                //@ts-ignore
                evt.source?.postMessage(payload, evt.origin);
            } catch (e) {
                
                evt.source?.postMessage({
                    error: e
                //@ts-ignore
                }, evt.origin);
            }
        })
    }
}

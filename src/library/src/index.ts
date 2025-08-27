import type { MessageRequest, MessageResponse } from "./shared.js";
export { POSTreq_Iframe } from './iframe.js';

export class POSTreq {
    _iframe: HTMLIFrameElement;
    _url?: string;

    constructor(params?: {style?: string, url?: string, parentElement?: HTMLElement}) {
        this._url = params?.url || "http://postreq.jbc.lol/postreq"; 
        this._iframe = document.createElement('iframe');
        if (!params?.style) this._iframe.style.display = "none";
        else this._iframe.style = params?.style;
        this._iframe.src = this._url;
        (params?.parentElement ?? document.body).appendChild(this._iframe);
    }

    private async onMessage(): Promise<MessageEvent<MessageResponse>> {
        // @ts-ignore
        return new Promise(resolve => window.onmessage = (e: MessageEvent<MessageResponse>) => {
            if (e.origin !== this._url)
            return resolve(e)
        });
    }

    async fetch(url: string, req?: RequestInit): Promise<MessageResponse | null> {
        if (url.includes('undefined')) return null;
        const obj: MessageRequest = {
            url,
            req
        }
        this._iframe.contentWindow?.postMessage(obj, this._url || "http://postreq.jbc.lol/postreq");
        const res = await this.onMessage();
        return res.data;
    }
}
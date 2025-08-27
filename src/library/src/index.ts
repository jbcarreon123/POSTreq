import type { MessageRequest, MessageResponse } from "./shared.js";
export { POSTreq_Iframe } from './iframe.js';

const DEFAULT_URL = "https://postreq.jbc.lol/postreq";

export class POSTreq {
    _iframe: HTMLIFrameElement;
    _url?: string;

    constructor(params?: {style?: string, url?: string, parentElement?: HTMLElement}) {
        this._url = params?.url || DEFAULT_URL; 
        this._iframe = document.createElement('iframe');
        if (!params?.style) this._iframe.style.display = "none";
        else this._iframe.style = params?.style;
        this._iframe.src = this._url;
        (params?.parentElement ?? document.body).appendChild(this._iframe);
    }

    private async onMessage(): Promise<MessageEvent<MessageResponse>> {
        // @ts-ignore
        return new Promise(resolve => window.onmessage = (e: MessageEvent<MessageResponse>) => {
            if (!('postreq' in e.data)) {
                console.log(e.data);
                return;
            }
            return resolve(e)
        });
    }

    async fetch(url: string, req?: RequestInit): Promise<MessageResponse | null> {
        if (url.includes('undefined')) return null;
        const obj: MessageRequest = {
            url,
            req
        }
        this._iframe.contentWindow?.postMessage(obj, this._url || DEFAULT_URL);
        const res = await this.onMessage();
        return res.data;
    }
}
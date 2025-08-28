import type { MessageRequest, MessageResponse } from "./shared.js";
export { POSTreq_Iframe } from './iframe.js';

const DEFAULT_URL = "https://postreq.jbc.lol/postreq";

export class POSTreq {
    _iframe: HTMLIFrameElement;
    _url?: string;

    onLoad!: Function;

    constructor(params?: { style?: string, url?: string, parentElement?: HTMLElement }) {
        this._url = params?.url || DEFAULT_URL;
        this._iframe = document.createElement('iframe');
        if (!params?.style) this._iframe.style.display = "none";
        else this._iframe.style = params?.style;
        this._iframe.addEventListener('load', () => this.onLoad());
        this._iframe.src = this._url;
        (params?.parentElement ?? document.body).appendChild(this._iframe);
    }

    private async onMessage(): Promise<MessageEvent<MessageResponse>> {
        // @ts-ignore
        return new Promise(resolve => window.onmessage = (e: MessageEvent<MessageResponse>) => {
            if (e.data.postreq) {
                return resolve(e)
            } else if (e.data.error) {
                throw e.data.error
            }
        });
    }

    async fetch(url: string, req?: RequestInit): Promise<Response> {
        const obj: MessageRequest = {
            url,
            req
        }
        this._iframe.contentWindow?.postMessage(obj, this._url || DEFAULT_URL);
        const res = await this.onMessage();
        return new Response(res.data);
    }

    getPolyfill(): Function {
        const iframe = this._iframe;
        const iurl = this._url;
        const onMessage = this.onMessage;
        return async function(url: string, req?: RequestInit): Promise<Response> {
            const obj: MessageRequest = {
                url,
                req
            }
            iframe.contentWindow?.postMessage(obj, iurl || DEFAULT_URL);
            const res = await onMessage();
            return new Response(res.data);
        }
    }
}

class Response {
    status: number;
    statusText: string;
    _json: any;
    _arrayBuffer: any;
    _formData: any;
    _blob: any;
    _text: any;
    ok: boolean;
    type: string;
    redirected: boolean;
    url: string;
    _data: MessageResponse;

    constructor(res: MessageResponse) {
        if (res.error)
            throw res.error;
        this.status = res.status;
        this.statusText = res.statusText;
        this._json = res.json;
        this._arrayBuffer = res.arrayBuffer;
        this._formData = res.formData;
        this._blob = res.blob;
        this._text = res.text;
        this.ok = res.ok;
        this.type = res.type;
        this.redirected = res.redirected;
        this.url = res.url;
        this._data = res;
    }

    /**
     * @deprecated POSTreq does not support streaming
     */
    get body() {
        return new ReadableStreamPrototype()
    }

    get headers() {
        return new HeadersPrototype(this._data.headers);
    }

    get bodyUsed() {
        return false;
    }

    async json(): Promise<object> {
        return this._json;
    }

    async arrayBuffer(): Promise<ArrayBuffer> {
        return this._arrayBuffer;
    }

    async formData(): Promise<FormData> {
        return this._formData;
    }

    async blob(): Promise<Blob> {
        return this._blob;
    }

    async text(): Promise<string> {
        return this._text;
    }
}

class HeadersPrototype {
    private _headers: { [key: string]: string };

    constructor(headers: { [key: string]: string }) {
        this._headers = headers;
    }

    /**
     * @deprecated POSTreq does not support this function
     */
    append(name: string, value: string): void {
        throw new DOMException("POSTreq does not support this function");
    }

    /**
     * @deprecated POSTreq does not support this function
     */
    delete(name: string): void {
        throw new DOMException("POSTreq does not support this function");
    }

    forEach(callback: (value: string, key: string, parent: HeadersPrototype) => void, thisArg?: any): void {
        const boundCallback = callback.bind(thisArg || this);
        for (const key in this._headers) {
            if (Object.prototype.hasOwnProperty.call(this._headers, key)) {
                boundCallback(this._headers[key], key, this);
            }
        }
    }

    get(name: string): string | null {
        const normalizedName = name.toLowerCase();
        return this._headers[normalizedName] || null;
    }

    has(name: string): boolean {
        const normalizedName = name.toLowerCase();
        return Object.prototype.hasOwnProperty.call(this._headers, normalizedName);
    }

    /**
     * @deprecated POSTreq does not support this function
     */
    set(name: string, value: string): void {
        throw new DOMException("POSTreq does not support this function");
    }

    entries(): [string, string][] {
        return Object.entries(this._headers);
    }

    [Symbol.iterator](): Iterator<[string, string]> {
        return this.entries()[Symbol.iterator]();
    }

    keys(): Iterator<string> {
        return Object.keys(this._headers)[Symbol.iterator]();
    }

    values(): Iterator<string> {
        return Object.values(this._headers)[Symbol.iterator]();
    }
}

class ReadableStreamPrototype {
    /**
     * @deprecated POSTreq does not support this function
     */
    async cancel(reason: any): Promise<void> {
        throw new DOMException("POSTreq does not support this function");
    }
    /**
     * @deprecated POSTreq does not support this function
     */
    async pipeTo(writable: WritableStream, options: object): Promise<void> {
        throw new DOMException("POSTreq does not support this function");
    }
    /**
     * @deprecated POSTreq does not support this function
     */
    pipeThrough(transformStream: object, options: object): ReadableStream {
        throw new DOMException("POSTreq does not support this function");
    }
    /**
     * @deprecated POSTreq does not support this function
     */
    getReader(options: object): ReadableStreamDefaultReader {
        throw new DOMException("POSTreq does not support this function");
    }
    /**
     * @deprecated POSTreq does not support this function
     */
    tee(): [ReadableStream, ReadableStream] {
        throw new DOMException("POSTreq does not support this function");
    }
    /**
     * @deprecated POSTreq does not support this function
     */
    releaseLock(): void {
        throw new DOMException("POSTreq does not support this function");
    }
    /**
     * @deprecated POSTreq does not support this function
     */
    async read(view: ArrayBufferView): Promise<{ done: false, value: ArrayBufferView } | { done: true, value?: undefined }> {
        throw new DOMException("POSTreq does not support this function");
    }
    /**
     * @deprecated POSTreq does not support this function
     */
    get locked(): boolean {
        return false;
    }
}
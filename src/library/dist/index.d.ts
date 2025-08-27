import type { MessageResponse } from "./shared.js";
export { POSTreq_Iframe } from './iframe.js';
export declare class POSTreq {
    _iframe: HTMLIFrameElement;
    _url?: string;
    constructor(params?: {
        style?: string;
        url?: string;
        parentElement?: HTMLElement;
    });
    private onMessage;
    fetch(url: string, req?: RequestInit): Promise<MessageResponse | null>;
}

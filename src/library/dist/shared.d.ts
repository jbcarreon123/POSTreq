export interface MessageRequest {
    url: string;
    req?: RequestInit;
}
export interface MessageResponse {
    status: number;
    statusText: number;
    headers: {};
    json?: string;
    blob?: Blob;
    formData?: FormData;
    text?: string;
    ok: boolean;
    error?: Error;
}

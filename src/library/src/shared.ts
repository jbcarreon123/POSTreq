export interface MessageRequest {
    url: string,
    req?: RequestInit
}

export interface MessageResponse {
    postreq: boolean,
    status: number,
    statusText: string,
    headers: { [key: string]: string },
    json?: string,
    blob?: Blob,
    formData?: FormData,
    arrayBuffer?: ArrayBuffer,
    text?: string,
    ok: boolean,
    error?: Error,
    type: string,
    redirected: boolean,
    url: string
}
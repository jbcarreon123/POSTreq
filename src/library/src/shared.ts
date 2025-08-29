export interface MessageRequest {
    url: string,
    req?: RequestInit,
    requestId: string
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
    url: string,
    requestId: string
}

export function random(length: number): string {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for ( let i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
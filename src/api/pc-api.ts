import { http } from './http';

function resolveUrl(path: string) {
  return `/pcmapi/pc/bbs/v1` + path;
}

export function replyLight(tid: string) {
  http.post(resolveUrl('/reply/light'), {});
}

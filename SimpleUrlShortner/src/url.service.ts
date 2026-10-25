
import { randomBytes } from "node:crypto";

const urls = new Map<string, string>();

export function shortenUrl(originalUrl: string) {
  let code: string;

  do {
    code = randomBytes(4).toString("hex");
  } while (urls.has(code));

  urls.set(code, originalUrl);

  return code;
}

import db from "./database";
import { randomBytes } from "node:crypto";

export function shortenUrl(originalUrl: string) {
  let code: string;
  const findcode = db.prepare("SELECT code FROM urls where code = ?");
  do {
    code = randomBytes(4).toString("hex");
  } while (findcode.get(code));

   db.prepare(
  "INSERT INTO urls (code, original_url) VALUES (?, ?)"
   ).run(code, originalUrl);

  return code;
}
export function getOriginalUrl(code: string) {
  const row = db
    .prepare("SELECT original_url FROM urls WHERE code = ?")
    .get(code) as { original_url: string } | undefined;
  
  
  return row?.original_url;
  
}
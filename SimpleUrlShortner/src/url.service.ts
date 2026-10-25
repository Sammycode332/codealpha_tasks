import db from "./database";
import { randomBytes } from "node:crypto";


export function shortenUrl(originalUrl: string) {
  const findUrl = db.prepare(
    "SELECT code FROM urls WHERE original_url = ?"
  );

  const existingUrl = findUrl.get(originalUrl) as
    | { code: string }
    | undefined;

  if (existingUrl) {
    return existingUrl.code;
  }

  let code: string;

  const findCode = db.prepare(
    "SELECT code FROM urls WHERE code = ?"
  );

  do {
    code = randomBytes(4).toString("hex");
  } while (findCode.get(code));

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
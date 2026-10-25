import Database from "better-sqlite3";

const db: Database.Database = new Database("data/urls.db");

db.exec(`
  CREATE TABLE IF NOT EXISTS urls (
    code TEXT PRIMARY KEY,
    original_url TEXT NOT NULL
  )
`);
export default db;
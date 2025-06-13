import { migrate } from "drizzle-orm/libsql/migrator";
import { db } from "./db/client";

export async function setup() {
  await migrate(db, { migrationsFolder: './db/migrations' });
}

export async function teardown() {
}
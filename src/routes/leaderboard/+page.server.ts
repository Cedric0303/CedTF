import { sql } from "@vercel/postgres";

export async function load() {
  return {
    scores: await sql`SELECT * from scores'`
  }
}
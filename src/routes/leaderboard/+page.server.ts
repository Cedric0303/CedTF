import { sql } from "@vercel/postgres";

export async function load() {
  return {
    score: await sql`SELECT * from score'`
  }
}
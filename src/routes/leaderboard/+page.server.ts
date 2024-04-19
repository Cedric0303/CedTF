import { sql } from "@vercel/postgres";

export async function load() {
  const data =  await sql`SELECT * from score ORDER BY score DESC`;
  return {
    score: data.rows,
  }
}
import { loadEnvConfig } from "@next/env";

loadEnvConfig(process.cwd());

async function testDatabase() {
  const { default: pool } = await import("./db");

  try {
    const result = await pool.query("SELECT NOW() AS current_time");

    console.log("Database connection successful!");
    console.log("Database time:", result.rows[0].current_time);
  } catch (error) {
    console.error("Database connection failed:", error);
  } finally {
    await pool.end();
  }
}

testDatabase();

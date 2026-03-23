import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import * as schema from "@shared/schema";

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

// Configure for serverless (Vercel) vs local development
if (process.env.VERCEL) {
  // On Vercel: use HTTP fetch for queries (no WebSocket support in serverless)
  neonConfig.poolQueryViaFetch = true;
} else {
  // Local dev: use WebSocket for persistent connections
  try {
    const ws = require("ws");
    neonConfig.webSocketConstructor = ws;
  } catch {
    // ws not available, fall back to fetch
    neonConfig.poolQueryViaFetch = true;
  }
}

export const pool = new Pool({ connectionString: process.env.DATABASE_URL });
export const db = drizzle({ client: pool, schema });

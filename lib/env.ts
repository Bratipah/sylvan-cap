export function requireEnv(name: string): string {
  const value = process.env[name]
  if (!value || value.length === 0) {
    throw new Error(`Missing required environment variable: ${name}`)
  }
  return value
}

export const ANTUGROW_API_KEY = process.env.ANTUGROW_API_KEY
export const CRON_SECRET = process.env.CRON_SECRET
export const DATABASE_URL = process.env.DATABASE_URL




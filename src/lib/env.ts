/**
 * Public environment configuration.
 *
 * Only `NEXT_PUBLIC_*` values may be read here — this module is safe to import
 * from client components. Server-only secrets live in `src/lib/env.server.ts`.
 *
 * Next.js inlines `process.env.NEXT_PUBLIC_*` at build time, so each value must
 * be referenced with its full literal name.
 */
export const publicEnv = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
  supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
} as const;

/** True once Supabase public credentials are configured in `.env.local`. */
export const isSupabaseConfigured = Boolean(
  publicEnv.supabaseUrl && publicEnv.supabaseAnonKey,
);

import "server-only";

/**
 * Server-only secrets. The `server-only` import makes the build fail if this
 * module is ever imported from a client component, so these values can never
 * reach the browser bundle.
 */
export function getServiceRoleKey(): string {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!key) {
    throw new Error(
      "SUPABASE_SERVICE_ROLE_KEY is not set. Add it to .env.local (never commit it).",
    );
  }
  return key;
}

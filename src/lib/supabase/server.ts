import "server-only";

import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { isSupabaseConfigured, publicEnv } from "@/lib/env";

/**
 * Server Supabase client bound to the request's auth cookies.
 *
 * Not used in milestone 1. When auth is wired up, call this from Server
 * Components, Server Actions and Route Handlers — inside a <Suspense>
 * boundary, because reading cookies is request-time data under Cache
 * Components. See docs/ARCHITECTURE.md.
 */
export async function createSupabaseServerClient() {
  if (!isSupabaseConfigured) return null;

  const cookieStore = await cookies();

  return createServerClient(publicEnv.supabaseUrl, publicEnv.supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          for (const { name, value, options } of cookiesToSet) {
            cookieStore.set(name, value, options);
          }
        } catch {
          // Called from a Server Component, where cookies are read-only.
          // Session refresh will be handled in proxy.ts once auth is added.
        }
      },
    },
  });
}

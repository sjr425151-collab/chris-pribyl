"use client";

import { createBrowserClient } from "@supabase/ssr";
import { isSupabaseConfigured, publicEnv } from "@/lib/env";

/**
 * Browser Supabase client (anon key + Row Level Security).
 *
 * Not used in milestone 1. Returns `null` until Supabase is configured so the
 * UI can render without credentials during design and development.
 */
export function createSupabaseBrowserClient() {
  if (!isSupabaseConfigured) return null;
  return createBrowserClient(publicEnv.supabaseUrl, publicEnv.supabaseAnonKey);
}

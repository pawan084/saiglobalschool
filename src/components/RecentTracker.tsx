"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { searchIndex } from "@/data/search-index";
import { safeGetJson, safeSetJson } from "@/lib/storage";

/**
 * Logs recent route visits to localStorage. Paired with RecentlyViewed which reads
 * the same key. Skips utility routes (api, error, offline, the home page itself).
 */

const STORAGE_KEY = "sssgs:recent-paths";
const SKIP_PREFIXES = ["/api", "/offline", "/_next"];
const MAX_ITEMS = 6;

function isTrackable(path: string) {
  if (!path || path === "/") return false;
  if (SKIP_PREFIXES.some((p) => path.startsWith(p))) return false;
  // Only track paths we know about (sanity check against the search index)
  return searchIndex.some((e) => e.href === path);
}

export default function RecentTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname || !isTrackable(pathname)) return;
    const arr = safeGetJson<string[]>(STORAGE_KEY, []);
    const next = [pathname, ...arr.filter((p) => p !== pathname)].slice(0, MAX_ITEMS);
    safeSetJson(STORAGE_KEY, next);
  }, [pathname]);

  return null;
}

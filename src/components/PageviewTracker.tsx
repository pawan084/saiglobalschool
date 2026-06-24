"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useAppDispatch } from "@/store/hooks";
import { trackPageview } from "@/store/slices/pageviewSlice";

const SKIP_PREFIXES = ["/api", "/_next", "/offline"];

function getDevice(): string {
  const ua = navigator.userAgent;
  if (/Mobi|Android/i.test(ua)) return "mobile";
  if (/Tablet|iPad/i.test(ua)) return "tablet";
  return "desktop";
}

export default function PageviewTracker() {
  const dispatch  = useAppDispatch();
  const pathname  = usePathname();
  const lastPath  = useRef<string | null>(null);

  useEffect(() => {
    if (!pathname) return;
    if (SKIP_PREFIXES.some((p) => pathname.startsWith(p))) return;
    if (pathname === lastPath.current) return;
    lastPath.current = pathname;

    dispatch(trackPageview({
      path: pathname,
      referrer: document.referrer || undefined,
      device: getDevice(),
    }));
  }, [pathname, dispatch]);

  return null;
}

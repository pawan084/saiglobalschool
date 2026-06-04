import { searchIndex, type SearchEntry } from "@/data/search-index";

/** Fuzzy substring rank with section/tag weighting. Shared by the
 *  client Cmd+K dialog and the server /search page so both surfaces
 *  produce the same ordering for the same query. */
export function score(entry: SearchEntry, q: string): number {
  const t = entry.title.toLowerCase();
  const s = entry.section.toLowerCase();
  const tag = entry.tags.toLowerCase();
  let best = 0;
  if (t.startsWith(q)) best = 100;
  else if (t.includes(q)) best = 70;
  else if (tag.includes(q)) best = 45;
  else if (s.includes(q)) best = 25;
  return best - Math.min(t.length, 50) * 0.1;
}

export function searchEntries(query: string, limit = 20): SearchEntry[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return searchIndex
    .map((e) => ({ e, s: score(e, q) }))
    .filter((x) => x.s > 0)
    .sort((a, b) => b.s - a.s)
    .slice(0, limit)
    .map((x) => x.e);
}

"use client";

import Icon from "./Icon";

export default function SiteSearchTrigger() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event("sssgs:open-search"))}
      className="btn-secondary"
    >
      <Icon name="sparkle" size={14} />
      Search the site
      <kbd className="ml-1 text-[10px] font-bold px-1 py-0.5 rounded border border-[var(--brand-rule)] text-slate-500">
        ⌘K
      </kbd>
    </button>
  );
}

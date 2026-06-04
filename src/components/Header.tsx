"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { navigation, ctaInquire, type NavItem } from "@/data/nav";
import { site } from "@/data/site";
import Icon from "./Icon";
import BrandLogo from "./BrandLogo";

/** Is the current page inside this nav item (parent or any of its children)? */
function isItemActive(
  pathname: string,
  item: { href: string; children?: { href: string }[] }
) {
  if (pathname === item.href) return true;
  if (item.children?.some((c) => c.href === pathname)) return true;
  // Also count "/about-us/anything-under" as a sub-route match
  if (item.href !== "/" && pathname.startsWith(item.href + "/")) return true;
  return false;
}

export default function Header() {
  const [mobile, setMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname() || "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 bg-white/95 backdrop-blur transition-shadow ${
        scrolled
          ? "shadow-[0_1px_0_var(--brand-rule),0_8px_24px_-12px_rgba(15,23,42,0.10)]"
          : "border-b border-[var(--brand-rule)]"
      }`}
    >
      {/* Brand band */}
      <div className={`section-shell transition-[padding] ${scrolled ? "py-2.5" : "py-4 lg:py-5"}`}>
        <div className="flex items-center justify-between gap-4">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-4 lg:gap-5 group shrink-0">
            <BrandLogo
              size={scrolled ? 64 : 92}
              priority
              className="shrink-0 transition-[width,height] drop-shadow-sm"
            />
            <div className="flex flex-col leading-tight">
              <span
                className={`font-display font-bold text-[var(--brand-navy)] tracking-tight transition-[font-size] ${
                  scrolled ? "text-[19px] lg:text-[22px]" : "text-[22px] lg:text-[28px]"
                } group-hover:text-[var(--brand-primary)]`}
              >
                Sri Sathya Sai Global School
              </span>
              <span
                className={`font-display italic text-[var(--brand-accent)] tracking-wide transition-[font-size] ${
                  scrolled ? "text-[11px] lg:text-[12px]" : "text-[12px] lg:text-[14px]"
                }`}
              >
                The End of Education is Character · Singapore
              </span>
            </div>
          </Link>

          {/* Right cluster */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => window.dispatchEvent(new Event("sssgs:open-search"))}
              aria-label="Search (⌘K)"
              title="Search (⌘K)"
              className="hidden md:inline-flex items-center gap-2 text-[12.5px] text-slate-700 hover:text-[var(--brand-primary)] px-3 py-2 rounded-full border border-[var(--brand-rule)] hover:border-[var(--brand-primary)] transition"
            >
              <Icon name="sparkle" size={12} />
              <span className="font-bold tracking-tight hidden xl:inline">Search</span>
              <kbd className="hidden xl:inline-flex text-[10px] font-bold px-1.5 py-0.5 rounded border border-[var(--brand-rule)] text-slate-500">
                ⌘K
              </kbd>
            </button>
            <a
              href={`tel:${site.phone.replace(/\s+/g, "")}`}
              className="hidden xl:inline-flex items-center gap-2 text-[12.5px] text-slate-700 hover:text-[var(--brand-primary)] px-3 py-2 rounded-full border border-[var(--brand-rule)] hover:border-[var(--brand-primary)] transition"
              aria-label={`Call ${site.phone}`}
            >
              <span className="grid place-items-center h-5 w-5 rounded-full bg-[var(--brand-primary-tint)] text-[var(--brand-primary)]">
                <Icon name="phone" size={11} />
              </span>
              <span className="font-bold tracking-tight">{site.phone}</span>
            </a>
            <Link href={ctaInquire.href} className="hidden sm:inline-flex btn-primary !py-2.5 !px-4 !text-[13px]">
              {ctaInquire.label}
              <Icon name="arrow-right" size={14} />
            </Link>
            <button
              type="button"
              onClick={() => setMobile((v) => !v)}
              aria-label={mobile ? "Close menu" : "Open menu"}
              aria-expanded={mobile}
              aria-controls="mobile-nav"
              className="lg:hidden p-2 -mr-1 text-slate-700"
            >
              <Icon name={mobile ? "close" : "menu"} size={22} />
            </button>
          </div>
        </div>
      </div>

      {/* Nav band */}
      <nav aria-label="Primary" className="hidden lg:block border-t border-[var(--brand-rule)] bg-[var(--brand-cream)]/30">
        <div className="section-shell flex items-center justify-center gap-0">
          {navigation.map((item) => (
            <DesktopNavItem key={item.label} item={item} pathname={pathname} />
          ))}
        </div>
      </nav>

      {/* Mobile drawer */}
      {mobile && (
        <nav aria-label="Primary mobile" id="mobile-nav" className="lg:hidden border-t border-[var(--brand-rule)] bg-white">
          <div className="section-shell py-3 max-h-[70vh] overflow-y-auto">
            {navigation.map((item) => {
              const active = isItemActive(pathname, item);
              return (
                <details
                  key={item.label}
                  open={active}
                  className="border-b border-[var(--brand-rule)] last:border-0"
                >
                  <summary
                    className={`flex items-center justify-between py-3 cursor-pointer text-[13.5px] font-bold ${
                      active ? "text-[var(--brand-primary)]" : "text-slate-800"
                    }`}
                  >
                    <span className="inline-flex items-center gap-2">
                      {active && (
                        <span
                          className="h-1.5 w-1.5 rounded-full bg-[var(--brand-accent)]"
                          aria-hidden
                        />
                      )}
                      {item.label}
                    </span>
                    {item.children && <Icon name="plus" size={14} className="text-slate-400" />}
                  </summary>
                  {item.children && (
                    <div className="pl-3 pb-3 space-y-1">
                      {item.children.map((c) => {
                        const childActive = pathname === c.href;
                        return (
                          <Link
                            key={c.href}
                            href={c.href}
                            onClick={() => setMobile(false)}
                            aria-current={childActive ? "page" : undefined}
                            className={`flex items-center justify-between py-1.5 text-[13.5px] ${
                              childActive
                                ? "text-[var(--brand-primary)] font-bold"
                                : "text-slate-600 hover:text-[var(--brand-primary)]"
                            }`}
                          >
                            <span>{c.label}</span>
                            {childActive && <Icon name="check" size={13} className="text-[var(--brand-primary)]" />}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </details>
              );
            })}
            <Link href={ctaInquire.href} className="btn-primary mt-4 w-full">
              {ctaInquire.label}
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}

/* ───────────────────────── Desktop nav item ─────────────────────────
 * Hover (mouse) and disclosure button (keyboard) both open the submenu.
 * The parent <Link> still navigates to the section index on click.
 * Submenu wiring follows WAI-ARIA Authoring Practices "Disclosure" pattern
 * — these are navigation links, not application menu items, so we use
 *   aria-haspopup="true" on a button rather than role="menu".
 * ───────────────────────────────────────────────────────────────── */
function DesktopNavItem({ item, pathname }: { item: NavItem; pathname: string }) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const panelId = useId();
  const hoverCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const active = isItemActive(pathname, item);
  const hasChildren = !!item.children?.length;

  // Close when focus leaves the whole container (covers Tab past last item)
  // and on Escape (returns focus to button).
  useEffect(() => {
    if (!open) return;
    const el = containerRef.current;
    function onFocusOut(e: FocusEvent) {
      if (!el?.contains(e.relatedTarget as Node | null)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    }
    el?.addEventListener("focusout", onFocusOut);
    document.addEventListener("keydown", onKey);
    return () => {
      el?.removeEventListener("focusout", onFocusOut);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Close the menu on route change so a navigation click doesn't leave stale UI.
  // React 19 prefers "adjusting state during render" over setState-in-effect
  // for this kind of prop-derived reset.
  const [openedAtPath, setOpenedAtPath] = useState(pathname);
  if (pathname !== openedAtPath) {
    setOpenedAtPath(pathname);
    if (open) setOpen(false);
  }

  function clearHoverClose() {
    if (hoverCloseTimer.current) {
      clearTimeout(hoverCloseTimer.current);
      hoverCloseTimer.current = null;
    }
  }
  function scheduleHoverClose() {
    clearHoverClose();
    // Small grace period so darting the mouse between trigger and panel
    // doesn't flicker.
    hoverCloseTimer.current = setTimeout(() => setOpen(false), 120);
  }

  function focusChildAt(idx: number) {
    const links = panelRef.current?.querySelectorAll<HTMLAnchorElement>("a[href]");
    if (!links?.length) return;
    const i = (idx + links.length) % links.length;
    links[i]?.focus();
  }

  function onButtonKeyDown(e: React.KeyboardEvent<HTMLButtonElement>) {
    if (!hasChildren) return;
    if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setOpen(true);
      // Wait a frame so the panel exists.
      requestAnimationFrame(() => focusChildAt(0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setOpen(true);
      requestAnimationFrame(() => focusChildAt(-1));
    }
  }

  function onPanelKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    const links = Array.from(panelRef.current?.querySelectorAll<HTMLAnchorElement>("a[href]") ?? []);
    if (!links.length) return;
    const idx = links.indexOf(document.activeElement as HTMLAnchorElement);
    if (e.key === "ArrowDown") {
      e.preventDefault();
      focusChildAt(idx + 1);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      focusChildAt(idx - 1);
    } else if (e.key === "Home") {
      e.preventDefault();
      focusChildAt(0);
    } else if (e.key === "End") {
      e.preventDefault();
      focusChildAt(links.length - 1);
    }
  }

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={() => {
        if (!hasChildren) return;
        clearHoverClose();
        setOpen(true);
      }}
      onMouseLeave={() => {
        if (!hasChildren) return;
        scheduleHoverClose();
      }}
    >
      <div className="flex items-center">
        <Link
          href={item.href}
          aria-current={active ? "page" : undefined}
          className={`nav-link-anim block py-3 text-[12.5px] font-bold tracking-[0.06em] uppercase transition-colors ${
            hasChildren ? "pl-4 pr-1" : "px-4"
          } ${
            active
              ? "text-[var(--brand-primary)]"
              : "text-[var(--brand-navy)] hover:text-[var(--brand-primary)]"
          }`}
        >
          {item.label}
        </Link>
        {hasChildren && (
          <button
            ref={buttonRef}
            type="button"
            aria-haspopup="true"
            aria-expanded={open}
            aria-controls={panelId}
            aria-label={`${item.label} submenu`}
            onClick={() => setOpen((o) => !o)}
            onKeyDown={onButtonKeyDown}
            className={`pr-3 py-3 -ml-1 text-[var(--brand-navy)] hover:text-[var(--brand-primary)] transition-colors ${
              active ? "text-[var(--brand-primary)]" : ""
            }`}
          >
            <Icon
              name="chevron-down"
              size={12}
              className={`transition-transform ${open ? "rotate-180" : ""}`}
            />
          </button>
        )}
      </div>
      {hasChildren && open && (
        <div
          id={panelId}
          ref={panelRef}
          onKeyDown={onPanelKeyDown}
          className="absolute left-1/2 -translate-x-1/2 top-full pt-1 z-10"
        >
          <div className="w-64 bg-white rounded-lg border border-[var(--brand-rule)] shadow-[var(--shadow-lg)] py-1.5 overflow-hidden">
            {item.children!.map((c) => {
              const childActive = pathname === c.href;
              return (
                <Link
                  key={c.href}
                  href={c.href}
                  aria-current={childActive ? "page" : undefined}
                  className={`flex items-center justify-between gap-2 px-4 py-2 text-[13.5px] transition-colors ${
                    childActive
                      ? "bg-[var(--brand-primary-tint)] text-[var(--brand-primary)] font-bold"
                      : "text-slate-700 hover:bg-[var(--brand-cream)] hover:text-[var(--brand-accent)]"
                  }`}
                >
                  <span className="truncate">{c.label}</span>
                  {childActive && (
                    <Icon name="check" size={14} className="text-[var(--brand-primary)] shrink-0" />
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}


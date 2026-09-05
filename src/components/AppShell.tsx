"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type User = { id: string; email: string; name: string | null };

type NavItem = { href: string; label: string; icon: string };

const NAV_SECTIONS: Array<{ title: string; items: NavItem[] }> = [
  {
    title: "Learn",
    items: [
      { href: "/", label: "Accueil", icon: "M3 12l9-9 9 9M5 10v10h14V10" },
      { href: "/dashboard", label: "Tableau de bord", icon: "M4 13h6V4H4v9zm10 7h6v-9h-6v9zM4 20h6v-4H4v4zm10-11h6V4h-6v5z" },
      { href: "/schedule", label: "Emploi du temps", icon: "M7 2v3M17 2v3M3 9h18M5 5h14a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z" },
      { href: "/paths", label: "Parcours", icon: "M4 6h16M4 12h10M4 18h7" },
      { href: "/courses", label: "Catalogue de cours", icon: "M4 5h16v14H4zM4 9h16M9 9v10" },
      { href: "/universities", label: "Universités", icon: "M12 3l9 5-9 5-9-5 9-5zm-9 10l9 5 9-5" },
      { href: "/domains", label: "Bibliothèque de compétences", icon: "M12 3v18M5 8l7-5 7 5M5 16l7 5 7-5" },
    ],
  },
  {
    title: "Personal",
    items: [
      { href: "/skill-gap", label: "Mes lacunes", icon: "M12 8v4m0 4h.01M12 3a9 9 0 100 18 9 9 0 000-18z" },
      { href: "/bookmarks", label: "Favoris", icon: "M6 4h12v16l-6-4-6 4V4z" },
      { href: "/transcript", label: "Relevé", icon: "M6 3h9l5 5v13a1 1 0 01-1 1H6a1 1 0 01-1-1V4a1 1 0 011-1zm9 0v5h5M9 13h6M9 17h6" },
      { href: "/search", label: "Recherche", icon: "M10 4a6 6 0 104.47 10.03L20 19.5 21.5 18l-5.47-5.53A6 6 0 0010 4z" },
    ],
  },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const loadedRef = useRef(false);

  useEffect(() => {
    if (loadedRef.current) return;
    loadedRef.current = true;

    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((d) => setUser(d.data))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    router.push("/");
    router.refresh();
  };

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const sidebar = (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div className="flex h-16 items-center px-6">
        <Link href="/" className="font-display text-lg font-bold text-fg">
          Curricula
        </Link>
      </div>

      {/* Nav sections */}
      <nav className="flex-1 space-y-6 overflow-y-auto px-3 py-4">
        {NAV_SECTIONS.map((section) => (
          <div key={section.title}>
            <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-wider text-fg-faint">
              {section.title}
            </p>
            <ul className="space-y-1">
              {section.items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setDrawerOpen(false)}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                      isActive(item.href)
                        ? "bg-accent-light/60 font-medium text-accent-dark"
                        : "text-fg-muted hover:bg-muted hover:text-fg"
                    }`}
                  >
                    <svg
                      className="h-4.5 w-4.5 shrink-0"
                      width="18"
                      height="18"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                    </svg>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      {/* User footer */}
      <div className="border-t border-border p-3">
        {loading ? (
          <div className="h-10 animate-pulse rounded-lg bg-muted" />
        ) : user ? (
          <div className="space-y-1">
            <div className="px-3 py-1.5">
              <p className="truncate text-sm font-medium text-fg">{user.name ?? user.email}</p>
              {user.name && <p className="truncate text-xs text-fg-faint">{user.email}</p>}
            </div>
            <button
              onClick={handleLogout}
              className="w-full rounded-lg px-3 py-2 text-left text-sm text-fg-muted transition-colors hover:bg-muted hover:text-fg"
            >
              Se déconnecter
            </button>
          </div>
        ) : (
          <div className="space-y-1">
            <Link
              href="/login"
              className="block rounded-lg px-3 py-2 text-sm text-fg-muted transition-colors hover:bg-muted hover:text-fg"
            >
              Log in
            </Link>
            <Link
              href="/register"
              className="block rounded-lg bg-fg px-3 py-2 text-center text-sm font-medium text-card transition-colors hover:bg-fg/90"
            >
              Commencer
            </Link>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-60 border-r border-border bg-card lg:block">
        {sidebar}
      </aside>

      {/* Mobile top bar */}
      <header className="fixed inset-x-0 top-0 z-40 flex h-14 items-center justify-between border-b border-border bg-card/90 px-4 backdrop-blur-sm lg:hidden">
        <Link href="/" className="font-display text-lg font-bold text-fg">
          Curricula
        </Link>
        <button
          onClick={() => setDrawerOpen(!drawerOpen)}
          className="rounded-md p-2 text-fg-muted hover:text-fg"
          aria-label="Toggle menu"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {drawerOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </header>

      {/* Mobile drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setDrawerOpen(false)}
          />
          <aside className="absolute inset-y-0 left-0 w-64 border-r border-border bg-card shadow-xl">
            {sidebar}
          </aside>
        </div>
      )}

      {/* Content */}
      <main className="min-w-0 flex-1 pb-16 pt-14 lg:pb-0 lg:pl-60 lg:pt-0">
        {children}
      </main>
    </div>
  );
}

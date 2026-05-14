import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { Moon, Sun, Menu, X, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { useTheme } from "./ThemeProvider";
import logo from "@/assets/noor-logo.jpg";

const aboutItems = [
  { to: "/case-studies", label: "Case Studies" },
  { to: "/education", label: "Education" },
  { to: "/certificates", label: "Certificates" },
  { to: "/talks", label: "Invited Talks" },
  { to: "/volunteer", label: "Volunteer" },
  { to: "/blog", label: "Blog" },
] as const;

// In-page sections (single-page nav)
const sectionNav = [
  { id: "home", label: "Home" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "publications", label: "Publications" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
] as const;

const SECTION_IDS = sectionNav.map((s) => s.id);

export default function Header() {
  const { theme, toggle } = useTheme();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("home");

  const onHome = pathname === "/";
  const aboutActive = aboutItems.some((i) => pathname.startsWith(i.to));

  // Track active section via IntersectionObserver while on the home page
  useEffect(() => {
    if (!onHome || typeof window === "undefined") return;
    const elements = SECTION_IDS
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) setActiveSection(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [onHome]);

  const goToSection = (id: string) => {
    setOpen(false);
    if (onHome) {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        history.replaceState(null, "", id === "home" ? "/" : `/#${id}`);
      }
    } else {
      // Navigate home with hash; index.tsx handles scroll on mount
      navigate({ to: "/", hash: id }).catch(() => {
        window.location.href = `/#${id}`;
      });
    }
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 glass border-b border-border/60">
      <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
        <a
          href="/#home"
          onClick={(e) => {
            e.preventDefault();
            goToSection("home");
          }}
          className="flex items-center gap-2.5 group"
        >
          <img
            src={logo}
            alt="Noor Fatima"
            width={36}
            height={36}
            className="h-9 w-9 rounded-full object-cover ring-1 ring-border bg-background"
          />
          <span className="font-display font-semibold tracking-tight">Noor Fatima</span>
        </a>

        <nav className="hidden md:flex items-center gap-1">
          {sectionNav.slice(0, 3).map((n) => {
            const active = onHome && activeSection === n.id;
            return (
              <a
                key={n.id}
                href={`/#${n.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  goToSection(n.id);
                }}
                className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
                  active
                    ? "text-foreground bg-secondary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {n.label}
              </a>
            );
          })}

          {/* About dropdown — separate pages, not scroll */}
          <div
            className="relative"
            onMouseEnter={() => setAboutOpen(true)}
            onMouseLeave={() => setAboutOpen(false)}
          >
            <button
              className={`px-3 py-1.5 rounded-md text-sm transition-colors inline-flex items-center gap-1 ${
                aboutActive
                  ? "text-foreground bg-secondary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              aria-expanded={aboutOpen}
            >
              About <ChevronDown className="h-3.5 w-3.5" />
            </button>
            {aboutOpen && (
              <div className="absolute left-0 top-full pt-2 w-56">
                <div className="rounded-lg border border-border bg-popover shadow-card p-1.5">
                  {aboutItems.map((i) => (
                    <Link
                      key={i.to}
                      to={i.to}
                      className="block px-3 py-2 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                    >
                      {i.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {sectionNav.slice(3).map((n) => {
            const active = onHome && activeSection === n.id;
            return (
              <a
                key={n.id}
                href={`/#${n.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  goToSection(n.id);
                }}
                className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
                  active
                    ? "text-foreground bg-secondary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {n.label}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="h-9 w-9 grid place-items-center rounded-md border border-border hover:bg-secondary transition-colors"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <button
            onClick={() => setOpen((o) => !o)}
            className="md:hidden h-9 w-9 grid place-items-center rounded-md border border-border"
            aria-label="Menu"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-border/60 px-6 py-3 space-y-0.5 glass">
          {sectionNav.slice(0, 3).map((n) => (
            <a
              key={n.id}
              href={`/#${n.id}`}
              onClick={(e) => {
                e.preventDefault();
                goToSection(n.id);
              }}
              className="block py-2 text-sm text-muted-foreground hover:text-foreground"
            >
              {n.label}
            </a>
          ))}
          <div className="pt-2 pb-1 text-[11px] uppercase tracking-wider font-mono text-muted-foreground/70">
            About
          </div>
          {aboutItems.map((i) => (
            <Link
              key={i.to}
              to={i.to}
              onClick={() => setOpen(false)}
              className="block py-2 pl-3 text-sm text-muted-foreground hover:text-foreground"
            >
              {i.label}
            </Link>
          ))}
          <div className="pt-2" />
          {sectionNav.slice(3).map((n) => (
            <a
              key={n.id}
              href={`/#${n.id}`}
              onClick={(e) => {
                e.preventDefault();
                goToSection(n.id);
              }}
              className="block py-2 text-sm text-muted-foreground hover:text-foreground"
            >
              {n.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}

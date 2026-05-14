import { Link } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";
import type { Project } from "@/lib/projects";
import { GithubIcon } from "./icons";

const GITHUB_PROFILE = "https://github.com/Noor-Fatima-Afzal";

export default function ProjectCard({ p }: { p: Project }) {
  const hasCode = Boolean(p.github);
  const hasDemo = Boolean(p.demo);
  const hasAnyLink = hasCode || hasDemo;

  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-card hover:shadow-glow transition-all duration-500 hover:-translate-y-1">
      {/* Stretched link to detail page (or GitHub profile if no links provided) */}
      {hasAnyLink ? (
        <Link
          to="/projects/$slug"
          params={{ slug: p.slug }}
          aria-label={`View ${p.title}`}
          className="absolute inset-0 z-0"
        />
      ) : (
        <a
          href={GITHUB_PROFILE}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`View ${p.title} on GitHub profile`}
          className="absolute inset-0 z-0"
        />
      )}

      <div className="relative overflow-hidden aspect-[16/10] pointer-events-none">
        <img
          src={p.image}
          alt={p.title}
          loading="lazy"
          width={1024}
          height={640}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
      </div>

      <div className="relative z-10 p-5 flex flex-col flex-1 pointer-events-none">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-lg font-semibold tracking-tight group-hover:text-primary transition-colors">
            {p.title}
          </h3>
          <span className="text-xs text-muted-foreground whitespace-nowrap pt-1">{p.date}</span>
        </div>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{p.description}</p>

        {p.results.length > 0 && (
          <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-1.5">
            {p.results.map((r) => (
              <li
                key={r}
                className="text-xs text-foreground/80 flex items-start gap-1.5"
              >
                <span className="mt-1.5 h-1 w-1 rounded-full bg-primary shrink-0" />
                {r}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-4 flex flex-wrap gap-1.5">
          {p.stack.slice(0, 6).map((s) => (
            <span
              key={s}
              className="text-[11px] px-2 py-0.5 rounded-md bg-secondary text-secondary-foreground font-mono"
            >
              {s}
            </span>
          ))}
        </div>

        <div className="mt-auto pt-5 flex items-center gap-3 text-xs">
          {hasCode && (
            <a
              href={p.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="pointer-events-auto inline-flex items-center gap-1.5 rounded-md border border-border px-2.5 py-1 text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            >
              <GithubIcon className="h-3.5 w-3.5" /> Code
            </a>
          )}
          {hasDemo && (
            <a
              href={p.demo}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="pointer-events-auto inline-flex items-center gap-1.5 rounded-md bg-primary/10 border border-primary/30 px-2.5 py-1 text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              <ExternalLink className="h-3.5 w-3.5" /> Live App
            </a>
          )}
          <span className="ml-auto text-primary opacity-0 group-hover:opacity-100 transition-opacity">
            {hasAnyLink ? "View →" : "GitHub →"}
          </span>
        </div>
      </div>
    </div>
  );
}

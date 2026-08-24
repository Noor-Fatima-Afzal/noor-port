import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, ExternalLink, Calendar, ArrowRight } from "lucide-react";
import { MediumBrand } from "@/components/brand-icons";
import postsData from "@/lib/blog-posts.json";

interface Post {
  slug: string;
  file: string;
  title: string;
  date: string;
  snippet: string;
  cover: string;
  category: string;
}

const posts = postsData as Post[];

const categories = Array.from(new Set(posts.map((p) => p.category))).sort();
const PER_PAGE = 12;

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog | Noor Fatima" },
      {
        name: "description",
        content:
          "126+ technical articles on machine learning, deep learning, NLP, computer vision, data science, and software engineering.",
      },
      { property: "og:title", content: "Blog | Noor Fatima" },
      {
        property: "og:description",
        content:
          "Long-form notes on machine learning, deep learning, NLP, computer vision, and data science.",
      },
    ],
  }),
  component: BlogPage,
});

function BlogPage() {
  const [filter, setFilter] = useState<string>("All");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((p) => {
      if (filter !== "All" && p.category !== filter) return false;
      if (q && !p.title.toLowerCase().includes(q) && !p.snippet.toLowerCase().includes(q))
        return false;
      return true;
    });
  }, [filter, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const safePage = Math.min(page, totalPages);
  const slice = filtered.slice((safePage - 1) * PER_PAGE, safePage * PER_PAGE);

  const counts = useMemo(() => {
    const c: Record<string, number> = { All: posts.length };
    for (const p of posts) c[p.category] = (c[p.category] ?? 0) + 1;
    return c;
  }, []);

  return (
    <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="text-xs font-mono uppercase tracking-widest text-primary">Blog</div>
          <h1 className="mt-3 font-display text-4xl md:text-5xl font-semibold tracking-tight">
            Notes on <span className="text-gradient">applied AI</span>.
          </h1>
          <p className="mt-4 max-w-2xl text-muted-foreground leading-relaxed">
            {posts.length} technical articles spanning machine learning, deep learning, NLP, data
            science and engineering practice.
          </p>
        </div>
        <a
          href="https://medium.com/@noorfatimaafzalbutt"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-medium hover:bg-secondary transition"
        >
          <MediumBrand className="h-4 w-4" /> Read on Medium
          <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" />
        </a>
      </div>

      {/* Search */}
      <div className="mt-10 relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setPage(1);
          }}
          placeholder="Search articles..."
          className="w-full rounded-lg border border-border bg-card pl-10 pr-3 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
        />
      </div>

      {/* Filters */}
      <div className="mt-5 flex flex-wrap gap-2">
        {(["All", ...categories] as const).map((c) => {
          const active = filter === c;
          return (
            <button
              key={c}
              onClick={() => {
                setFilter(c);
                setPage(1);
              }}
              className={`px-3 py-1.5 rounded-full text-xs border transition-colors ${
                active
                  ? "bg-primary text-primary-foreground border-primary shadow-glow"
                  : "border-border text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
            >
              {c}
              <span className="ml-1.5 opacity-60">{counts[c] ?? 0}</span>
            </button>
          );
        })}
      </div>

      {/* Grid */}
      {slice.length === 0 ? (
        <div className="mt-12 rounded-xl border border-dashed border-border bg-card/40 p-12 text-center text-muted-foreground">
          No articles match your search.
        </div>
      ) : (
        <ul className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {slice.map((p) => (
            <li key={p.slug + p.date}>
              <a
                href={`/blog/${p.file}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col rounded-xl border border-border bg-card overflow-hidden shadow-card hover:shadow-glow hover:-translate-y-0.5 transition-all"
              >
                <div className="p-5 flex flex-col h-full">
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="px-2 py-0.5 rounded-md bg-primary/10 text-primary">
                      {p.category}
                    </span>
                    {p.date && (
                      <span className="text-muted-foreground inline-flex items-center gap-1">
                        <Calendar className="h-3 w-3" /> {p.date}
                      </span>
                    )}
                  </div>
                  <h2 className="mt-3 font-display text-base font-semibold tracking-tight leading-snug group-hover:text-primary transition-colors line-clamp-3">
                    {p.title}
                  </h2>
                  {p.snippet && (
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-3">
                      {p.snippet}
                    </p>
                  )}
                  <div className="mt-auto pt-4 inline-flex items-center gap-1 text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    Read article <ArrowRight className="h-3 w-3" />
                  </div>
                </div>
              </a>
            </li>
          ))}
        </ul>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-10 flex items-center justify-center gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={safePage === 1}
            className="px-3 py-1.5 rounded-md border border-border text-sm disabled:opacity-40 hover:bg-secondary transition"
          >
            Previous
          </button>
          <span className="text-sm text-muted-foreground px-2 font-mono">
            {safePage} / {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={safePage === totalPages}
            className="px-3 py-1.5 rounded-md border border-border text-sm disabled:opacity-40 hover:bg-secondary transition"
          >
            Next
          </button>
        </div>
      )}

      <div className="mt-16 rounded-2xl border border-border bg-card p-6 md:p-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="font-display text-lg font-semibold tracking-tight">
            Follow new posts on Medium
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            All articles are also published at @noorfatimaafzalbutt on Medium.
          </p>
        </div>
        <a
          href="https://medium.com/@noorfatimaafzalbutt"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90 transition"
        >
          <MediumBrand className="h-4 w-4" /> Open Medium profile
        </a>
      </div>

      {/* Hidden link to satisfy router preloading style — actual nav handled above */}
      <Link to="/" className="sr-only">Home</Link>
    </section>
  );
}

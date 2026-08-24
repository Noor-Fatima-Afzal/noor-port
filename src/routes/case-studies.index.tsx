import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Brain } from "lucide-react";
import neuroai from "@/assets/proj-neuroai.jpg";

export const Route = createFileRoute("/case-studies/")({
  head: () => ({
    meta: [
      { title: "Case Studies | Noor Fatima" },
      {
        name: "description",
        content:
          "In-depth engineering case studies: system design, trade-offs, and measurable impact behind shipped AI/ML products.",
      },
      { property: "og:title", content: "Case Studies | Noor Fatima" },
      {
        property: "og:description",
        content:
          "Story-driven, technically deep walkthroughs of production AI systems — from problem framing to deployment.",
      },
    ],
  }),
  component: CaseStudiesIndex,
});

const studies = [
  {
    slug: "neuroai-platform",
    title: "NeuroAI Platform",
    tagline: "Scalable EEG ML platform reducing model benchmarking time from days to minutes.",
    domain: "Healthcare AI · MLOps",
    year: "2025",
    image: neuroai,
    metrics: [
      { v: "2–3 days → minutes", k: "Benchmark cycle" },
      { v: "5+", k: "Active researchers" },
      { v: "End-to-end", k: "EEG → model → report" },
    ],
    stack: ["Python", "PyTorch", "MNE", "React", "Docker", "AWS"],
  },
] as const;

function CaseStudiesIndex() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
      <div className="text-xs font-mono uppercase tracking-widest text-primary">
        Case Studies
      </div>
      <h1 className="mt-3 font-display text-4xl md:text-5xl font-semibold tracking-tight">
        Engineering decisions, <span className="text-gradient">in depth</span>.
      </h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        Long-form walkthroughs of production AI systems — the problem, the architecture, the
        trade-offs, and the measurable outcome. Written for engineers and recruiters alike.
      </p>

      <div className="mt-12 grid gap-6">
        {studies.map((s) => (
          <Link
            key={s.slug}
            to="/case-studies/$slug"
            params={{ slug: s.slug }}
            className="group relative grid md:grid-cols-[1.1fr_1fr] gap-0 overflow-hidden rounded-2xl border border-border bg-card shadow-card hover:shadow-glow transition-all duration-500 hover:-translate-y-0.5"
          >
            <div className="relative aspect-[16/10] md:aspect-auto overflow-hidden">
              <img
                src={s.image}
                alt={s.title}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-card/60 via-transparent to-transparent" />
            </div>
            <div className="p-6 md:p-8 flex flex-col">
              <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
                <Brain className="h-3.5 w-3.5 text-primary" />
                <span>{s.domain}</span>
                <span className="opacity-50">·</span>
                <span>{s.year}</span>
              </div>
              <h2 className="mt-3 font-display text-2xl md:text-3xl font-semibold tracking-tight group-hover:text-primary transition-colors">
                {s.title}
              </h2>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{s.tagline}</p>

              <dl className="mt-5 grid grid-cols-3 gap-3">
                {s.metrics.map((m) => (
                  <div key={m.k} className="rounded-lg border border-border/60 bg-background/40 p-3">
                    <dt className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                      {m.k}
                    </dt>
                    <dd className="mt-1 text-xs font-semibold">{m.v}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-5 flex flex-wrap gap-1.5">
                {s.stack.map((t) => (
                  <span
                    key={t}
                    className="text-[11px] px-2 py-0.5 rounded-md bg-secondary text-secondary-foreground font-mono"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-auto pt-6 inline-flex items-center gap-1.5 text-sm text-primary opacity-80 group-hover:opacity-100 transition-opacity">
                Read case study <ArrowRight className="h-4 w-4" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-16 rounded-2xl border border-dashed border-border p-8 text-center">
        <p className="text-sm text-muted-foreground">
          More case studies are in the works. In the meantime, browse the{" "}
          <Link to="/projects" className="text-primary hover:underline">
            full project archive
          </Link>
          .
        </p>
      </div>
    </section>
  );
}

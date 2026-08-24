import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import ProjectCard from "@/components/ProjectCard";
import { categories, projects, type Category } from "@/lib/projects";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects | Noor Fatima" },
      {
        name: "description",
        content:
          "Selected engineering projects across AI/ML, Healthcare AI, and LLM applications, with measurable real-world impact.",
      },
      { property: "og:title", content: "Projects | Noor Fatima" },
      {
        property: "og:description",
        content:
          "Shipped projects spanning EEG modeling, medical imaging, RAG systems and production LLM applications.",
      },
    ],
  }),
  component: ProjectsPage,
});

// Per-category ordering: each filter view has its own curated sequence so the
// same project never appears in the same slot across categories.
const ORDER: Record<Category | "All", string[]> = {
  All: [
    "neuroai-platform",
    "multimodal-rag-xray",
    "neurograph-tsc",
    "seizure-detection",
    "gnn-pdm",
    "groqvision",
    "pdfexplora",
    "sleep-snn",
    "edupath",
    "dental-dicom",
    "lahore-legacy",
    "multiview-decoding",
    "audio-analyzer",
    "clinical-llm",
    "olympics-data-analysis",
    "lawyer-assistant",
    "emotion-eeg",
    "obe-rubrics",
    "neurogenesis",
    "crane-gpt",
    "madina-chatbot",
    "breast-cancer",
  ],
  "AI / ML": [
    "multiview-decoding",
    "neurograph-tsc",
    "neuroai-platform",
    "gnn-pdm",
    "seizure-detection",
    "emotion-eeg",
    "olympics-data-analysis",
    "sleep-snn",
    "obe-rubrics",
    "neurogenesis",
    "breast-cancer",
    "dental-dicom",
  ],
  "Healthcare AI": [
    "seizure-detection",
    "neurograph-tsc",
    "dental-dicom",
    "multimodal-rag-xray",
    "neurogenesis",
    "clinical-llm",
    "neuroai-platform",
    "sleep-snn",
    "emotion-eeg",
    "breast-cancer",
  ],
  "LLM Applications": [
    "pdfexplora",
    "groqvision",
    "lahore-legacy",
    "crane-gpt",
    "multimodal-rag-xray",
    "edupath",
    "clinical-llm",
    "madina-chatbot",
    "audio-analyzer",
    "lawyer-assistant",
  ],
};

export function ProjectsPage() {
  const [filter, setFilter] = useState<Category | "All">("All");

  const filtered = useMemo(() => {
    const pool = projects.filter(
      (p) => filter === "All" || p.categories.includes(filter as Category),
    );
    const order = ORDER[filter];
    const indexOf = (slug: string) => {
      const i = order.indexOf(slug);
      return i === -1 ? order.length + 1 : i;
    };
    return [...pool].sort((a, b) => indexOf(a.slug) - indexOf(b.slug));
  }, [filter]);

  return (
    <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
      <div className="text-xs font-mono uppercase tracking-widest text-primary">Projects</div>
      <h1 className="mt-3 font-display text-4xl md:text-5xl font-semibold tracking-tight">
        Building at the <span className="text-gradient">edge of applied AI</span>.
      </h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        {projects.length} projects spanning neural decoding, medical imaging, and LLM applications,
        each shipped with measurable impact.
      </p>

      <div className="mt-10 flex flex-wrap gap-2">
        {(["All", ...categories] as const).map((c) => {
          const active = filter === c;
          return (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`px-3.5 py-1.5 rounded-full text-sm border transition-colors ${
                active
                  ? "bg-primary text-primary-foreground border-primary shadow-glow"
                  : "border-border text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
            >
              {c}
              <span className="ml-1.5 text-xs opacity-60">
                {c === "All"
                  ? projects.length
                  : projects.filter((p) => p.categories.includes(c)).length}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-10 grid sm:grid-cols-2 gap-5">
        {filtered.map((p) => (
          <ProjectCard key={p.slug} p={p} />
        ))}
      </div>
    </section>
  );
}

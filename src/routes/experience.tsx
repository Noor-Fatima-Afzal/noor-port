import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Calendar, Briefcase } from "lucide-react";

export const Route = createFileRoute("/experience")({
  head: () => ({
    meta: [
      { title: "Experience | Noor Fatima" },
      {
        name: "description",
        content:
          "Machine Learning engineering experience across KICS-UET, Dpoint Technologies, Datalabb, Bytewise, and the University of Cyprus.",
      },
      { property: "og:title", content: "Experience | Noor Fatima" },
      {
        property: "og:description",
        content:
          "International ML engineering experience across healthcare, predictive maintenance, EEG decoding, and LLM applications.",
      },
    ],
  }),
  component: ExperiencePage,
});

interface Item {
  role: string;
  org: string;
  type?: string;
  location?: string;
  date: string;
  bullets: string[];
  highlight?: boolean;
  tags?: string[];
}

const experience: Item[] = [
  {
    role: "Research Assistant",
    org: "Dpoint Technologies Ltd",
    type: "Part-time",
    location: "Cyprus (Remote)",
    date: "Jul 2025 — Present",
    highlight: true,
    tags: ["Predictive Maintenance", "Time Series", "Anomaly Detection"],
    bullets: [
      "Designing predictive maintenance systems for industrial cranes and heavy equipment, targeting high-cost failure patterns.",
      "Modeling real-world sensor streams (vibration, temperature, current) to detect early mechanical failure signatures.",
      "Integrating anomaly detection and fault prediction models into live monitoring dashboards for proactive alerting.",
    ],
  },
  {
    role: "Machine Learning Researcher",
    org: "Al-Khawarizmi Institute of Computer Science (KICS), UET Lahore",
    type: "Part-time",
    location: "Lahore, Pakistan (On-site)",
    date: "Jun 2024 — Present",
    highlight: true,
    tags: ["EEG", "Transformers", "GNNs", "Healthcare AI"],
    bullets: [
      "Achieved 92% accuracy on SEED-IV and 91% on DEAP with a hybrid ResNet–Transformer using PSD/DE feature fusion for emotion recognition.",
      "Reached 87% accuracy (F1 = 0.88) for Alzheimer's and MCI detection via Transformer-based ERP models on olfactory EEG signals.",
      "Delivered 91%+ biometric accuracy with TriNet-MTL, a multitask Transformer jointly modeling identity, language, and modality.",
      "Built NeuroGraph-TSC, a graph-based EEG classifier with biophysical priors (Jansen–Rit dynamics) for stress decoding.",
    ],
  },
  {
    role: "Machine Learning Engineer",
    org: "Datalabb",
    type: "Full-time",
    location: "Lahore, Pakistan (On-site)",
    date: "Mar 2024 — Feb 2026",
    highlight: true,
    tags: ["LLMs", "RAG", "AWS SageMaker", "Computer Vision"],
    bullets: [
      "Designed and deployed a U-Net medical image segmentation pipeline on AWS SageMaker, improving precision by 18% and recall by 20%.",
      "Built a real-time audio analysis app (STT, TTS, fine-tuned LLMs) achieving sub-300ms end-to-end latency.",
      "Engineered multi-stage RAG systems with LangChain and custom vector stores for scalable, low-latency retrieval.",
      "Fine-tuned domain-specific LLMs, improving response accuracy by 22% on production workloads.",
    ],
  },
  {
    role: "Machine Learning Fellow",
    org: "Bytewise Limited",
    type: "Apprenticeship",
    location: "Lahore, Pakistan",
    date: "Jun 2024 — Sep 2024",
    tags: ["Classical ML", "NLP", "Streamlit"],
    bullets: [
      "Developed a telecom churn prediction pipeline to identify at-risk customers from behavioral and usage features.",
      "Built an LLM-powered car review analysis tool for sentiment classification and feature-level extraction.",
      "Shipped interactive Streamlit dashboards covering Netflix trends, Nobel Prize data, and geospatial crime patterns.",
      "Applied logistic regression with rigorous feature selection to deliver interpretable, production-ready models.",
    ],
  },
  {
    role: "Teaching Assistant",
    org: "University of Cyprus",
    location: "Nicosia, Cyprus",
    date: "Fall 2025 — Spring 2026",
    tags: ["Teaching", "Mentorship"],
    bullets: [
      "Fall 2025 — CSC301 Software Engineering, CSC402 Computer Graphics (PyOpenGL).",
      "Spring 2026 — CSC120 Programming Fundamentals, CSC4045 Information Security.",
      "Lead lab sessions, debugging clinics, and applied problem-solving workshops for undergraduate cohorts.",
    ],
  },
];

const honors = [
  {
    title: "Excellence in Neuroscience Research",
    org: "KICS-UET Lahore",
    date: "Jun 2025",
    note: "Recognized for AI/ML pipelines, signal processing, and innovative computational methods.",
  },
  {
    title: "Chief Minister Punjab's Honhaar Scholarship",
    org: "Government of Punjab",
    date: "May 2025",
    note: "Awarded for placing in the top 1% CGPA in Computer Engineering at UET Lahore.",
  },
  {
    title: "Top 6 — Optimized AI Conference 2025",
    org: "Traversaal.ai",
    date: "Mar 2025",
    note: "Team TROJAN_AI ranked top 6 of 200+ global teams.",
  },
  {
    title: "CS50x Puzzle Day 2025",
    org: "Harvard & MIT (Cambridge)",
    date: "Apr 2025",
    note: "Recognized for problem-solving and analytical thinking.",
  },
];


export default function ExperiencePage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
      {/* Header */}
      <div className="text-xs font-mono uppercase tracking-widest text-primary">
        Experience
      </div>
      <h1 className="mt-3 font-display text-4xl md:text-5xl font-semibold tracking-tight">
        Engineering ML systems across <span className="text-gradient">3 continents</span>.
      </h1>
      <p className="mt-4 max-w-2xl text-muted-foreground leading-relaxed">
        From EEG decoding and medical imaging to predictive maintenance and production-grade
        LLM systems — building research-grade models that ship.
      </p>

      {/* Timeline */}
      <div className="mt-14 relative">
        <div
          className="absolute left-3 md:left-4 top-2 bottom-2 w-px bg-gradient-to-b from-primary/40 via-border to-transparent"
          aria-hidden
        />
        <ol className="space-y-12">
          {experience.map((e) => (
            <li key={e.role + e.date} className="relative pl-10 md:pl-14 reveal-on-scroll">
              <span
                className={`absolute left-0 md:left-1 top-1.5 h-6 w-6 rounded-full border-2 grid place-items-center transition-all ${
                  e.highlight
                    ? "bg-primary border-primary shadow-glow"
                    : "bg-card border-border"
                }`}
              >
                <Briefcase
                  className={`h-3 w-3 ${
                    e.highlight ? "text-primary-foreground" : "text-primary"
                  }`}
                />
              </span>

              <div className="rounded-2xl border border-border bg-card/60 backdrop-blur-sm p-5 md:p-6 lift-on-hover transition-colors hover:border-primary/40">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3 className="font-display text-lg md:text-xl font-semibold tracking-tight">
                    {e.role}
                  </h3>
                  {e.type && (
                    <span className="text-[11px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded border border-border/60 text-muted-foreground">
                      {e.type}
                    </span>
                  )}
                </div>
                <div className="mt-1 text-sm text-primary font-medium">{e.org}</div>

                <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground font-mono">
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="h-3 w-3" />
                    {e.date}
                  </span>
                  {e.location && (
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="h-3 w-3" />
                      {e.location}
                    </span>
                  )}
                </div>

                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  {e.bullets.map((b) => (
                    <li key={b} className="flex gap-2.5">
                      <span className="mt-2 h-1 w-1 rounded-full bg-primary shrink-0" />
                      <span className="leading-relaxed text-foreground/85">{b}</span>
                    </li>
                  ))}
                </ul>

                {e.tags && e.tags.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {e.tags.map((t) => (
                      <span
                        key={t}
                        className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-secondary/70 text-secondary-foreground border border-border/50"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>


      {/* Honors */}
      <div className="mt-24">
        <div className="text-xs font-mono uppercase tracking-widest text-primary">Honors</div>
        <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight">
          Awards & recognition
        </h2>
        <div className="mt-8 grid md:grid-cols-2 gap-4">
          {honors.map((h) => (
            <div
              key={h.title}
              className="rounded-xl border border-border bg-card p-5 hover:border-primary/40 transition-colors lift-on-hover"
            >
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="font-display font-semibold">{h.title}</h3>
                <span className="text-xs font-mono text-muted-foreground shrink-0">
                  {h.date}
                </span>
              </div>
              <p className="mt-1 text-sm text-primary">{h.org}</p>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{h.note}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

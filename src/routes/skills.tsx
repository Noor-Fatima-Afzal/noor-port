import { createFileRoute } from "@tanstack/react-router";
import {
  Brain,
  Layers,
  Server,
  Activity,
  Wrench,
  Sparkles,
} from "lucide-react";

export const Route = createFileRoute("/skills")({
  head: () => ({
    meta: [
      { title: "Skills | Noor Fatima" },
      {
        name: "description",
        content:
          "Technical expertise across machine learning, deep learning architectures, EEG signal processing, RAG systems, and production deployment.",
      },
      { property: "og:title", content: "Skills | Noor Fatima" },
      {
        property: "og:description",
        content:
          "AI/ML engineering stack — from Transformers and GNNs to RAG, EEG decoding, and edge deployment.",
      },
    ],
  }),
  component: SkillsPage,
});

type Level = "Core" | "Advanced" | "Proficient";

interface Skill {
  name: string;
  level: Level;
  note?: string;
}

interface Category {
  title: string;
  tagline: string;
  icon: React.ComponentType<{ className?: string }>;
  accent: string; // tailwind-friendly color hint via inline style
  skills: Skill[];
}

const categories: Category[] = [
  {
    title: "Machine Learning & AI",
    tagline: "Modeling, training pipelines, and applied research.",
    icon: Brain,
    accent: "from-primary/30 to-primary/0",
    skills: [
      { name: "PyTorch", level: "Core", note: "Primary research & production framework" },
      { name: "TensorFlow / Keras", level: "Advanced" },
      { name: "Scikit-learn", level: "Core" },
      { name: "Classical ML", level: "Advanced", note: "Churn, regression, feature selection" },
      { name: "Model Evaluation", level: "Core" },
      { name: "Hyperparameter Tuning", level: "Advanced" },
    ],
  },
  {
    title: "Deep Learning & Architectures",
    tagline: "Sequence, graph, and biologically-inspired models.",
    icon: Layers,
    accent: "from-accent/30 to-accent/0",
    skills: [
      { name: "Transformers", level: "Core", note: "ResNet–Transformer hybrids, ERP models" },
      { name: "Graph Neural Networks", level: "Advanced", note: "NeuroGraph-TSC for EEG" },
      { name: "Spiking Neural Nets", level: "Proficient" },
      { name: "U-Net / Segmentation", level: "Advanced", note: "Medical imaging on SageMaker" },
      { name: "LoRA / QLoRA / PEFT", level: "Advanced" },
      { name: "Multitask Learning", level: "Advanced", note: "TriNet-MTL biometrics" },
    ],
  },
  {
    title: "LLM & RAG Systems",
    tagline: "Retrieval, fine-tuning, and agentic workflows.",
    icon: Sparkles,
    accent: "from-primary/30 to-accent/0",
    skills: [
      { name: "LangChain", level: "Core" },
      { name: "FAISS / Vector Stores", level: "Advanced" },
      { name: "OpenAI / Groq APIs", level: "Core" },
      { name: "Meditron / Domain LLMs", level: "Advanced" },
      { name: "CLIP / Multimodal", level: "Proficient" },
      { name: "Prompt Engineering", level: "Core" },
    ],
  },
  {
    title: "Data & Signal Processing",
    tagline: "EEG, audio, and biomedical data pipelines.",
    icon: Activity,
    accent: "from-accent/25 to-primary/0",
    skills: [
      { name: "EEG (MNE-Python)", level: "Core", note: "PSD, DE, ERP, source decoding" },
      { name: "DICOM / pydicom", level: "Advanced" },
      { name: "Librosa / Audio", level: "Advanced", note: "STT, TTS pipelines" },
      { name: "OpenCV", level: "Advanced" },
      { name: "NumPy / Pandas", level: "Core" },
      { name: "Time Series & Anomaly Detection", level: "Advanced" },
    ],
  },
  {
    title: "Systems & Deployment",
    tagline: "Shipping research-grade models into production.",
    icon: Server,
    accent: "from-primary/25 to-primary/0",
    skills: [
      { name: "AWS SageMaker", level: "Advanced" },
      { name: "Docker", level: "Advanced" },
      { name: "FastAPI / Flask", level: "Core" },
      { name: "Streamlit", level: "Core" },
      { name: "MySQL / PostgreSQL", level: "Advanced" },
      { name: "CI/CD & Monitoring", level: "Proficient" },
    ],
  },
  {
    title: "Tools & Frameworks",
    tagline: "Day-to-day engineering toolkit.",
    icon: Wrench,
    accent: "from-accent/20 to-primary/0",
    skills: [
      { name: "Git / GitHub", level: "Core" },
      { name: "React / TypeScript", level: "Advanced" },
      { name: "Linux / Bash", level: "Advanced" },
      { name: "Weights & Biases", level: "Proficient" },
      { name: "Jupyter / Colab", level: "Core" },
      { name: "VS Code / Cursor", level: "Core" },
    ],
  },
];

const levelStyles: Record<Level, string> = {
  Core: "bg-primary/15 text-primary border-primary/30",
  Advanced: "bg-accent/15 text-accent-foreground border-accent/30",
  Proficient: "bg-secondary text-secondary-foreground border-border/60",
};

const levelDot: Record<Level, number> = {
  Core: 3,
  Advanced: 2,
  Proficient: 1,
};

function LevelDots({ level }: { level: Level }) {
  const filled = levelDot[level];
  return (
    <span className="inline-flex items-center gap-0.5" aria-label={`${level} level`}>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className={`h-1.5 w-1.5 rounded-full ${
            i < filled ? "bg-primary" : "bg-border"
          }`}
        />
      ))}
    </span>
  );
}

export default function SkillsPage() {
  const totalSkills = categories.reduce((n, c) => n + c.skills.length, 0);

  return (
    <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
      {/* Header */}
      <div className="text-xs font-mono uppercase tracking-widest text-primary">
        Skills
      </div>
      <h1 className="mt-3 font-display text-4xl md:text-5xl font-semibold tracking-tight">
        A full-stack <span className="text-gradient">AI/ML toolkit</span>.
      </h1>
      <p className="mt-4 max-w-2xl text-muted-foreground leading-relaxed">
        Six focus areas spanning {totalSkills}+ technologies — refined through
        peer-reviewed research, production deployments, and applied healthcare
        AI work.
      </p>

      {/* Stat strip */}
      <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { k: "6", v: "Domains" },
          { k: "30+", v: "Technologies" },
          { k: "5+", v: "Years applied" },
          { k: "2", v: "Publications" },
        ].map((s) => (
          <div
            key={s.v}
            className="rounded-xl border border-border bg-card/60 backdrop-blur-sm p-4 lift-on-hover"
          >
            <div className="font-display text-2xl font-semibold text-gradient">
              {s.k}
            </div>
            <div className="mt-0.5 text-xs font-mono uppercase tracking-wider text-muted-foreground">
              {s.v}
            </div>
          </div>
        ))}
      </div>

      {/* Categories grid */}
      <div className="mt-16 grid md:grid-cols-2 gap-5">
        {categories.map((c) => {
          const Icon = c.icon;
          return (
            <article
              key={c.title}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card/70 backdrop-blur-sm p-6 lift-on-hover reveal-on-scroll transition-colors hover:border-primary/40"
            >
              {/* Decorative gradient */}
              <div
                aria-hidden
                className={`pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full bg-gradient-to-br ${c.accent} blur-3xl opacity-60 transition-opacity duration-500 group-hover:opacity-100`}
              />

              <div className="relative flex items-start gap-3">
                <span className="grid place-items-center h-10 w-10 rounded-xl border border-border bg-background/60 text-primary">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <h2 className="font-display text-lg font-semibold tracking-tight">
                    {c.title}
                  </h2>
                  <p className="text-sm text-muted-foreground">{c.tagline}</p>
                </div>
              </div>

              <ul className="relative mt-5 space-y-2">
                {c.skills.map((s) => (
                  <li
                    key={s.name}
                    className="group/item flex items-start gap-3 rounded-lg border border-transparent px-2.5 py-2 transition-colors hover:border-border/60 hover:bg-background/40"
                  >
                    <LevelDots level={s.level} />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-baseline gap-2 flex-wrap">
                        <span className="text-sm font-medium text-foreground/90">
                          {s.name}
                        </span>
                        <span
                          className={`text-[10px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded border ${levelStyles[s.level]}`}
                        >
                          {s.level}
                        </span>
                      </div>
                      {s.note && (
                        <p className="mt-0.5 text-xs text-muted-foreground leading-relaxed">
                          {s.note}
                        </p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-12 flex flex-wrap items-center gap-4 text-xs font-mono text-muted-foreground">
        <span className="uppercase tracking-wider">Legend:</span>
        {(["Core", "Advanced", "Proficient"] as Level[]).map((lv) => (
          <span key={lv} className="inline-flex items-center gap-2">
            <LevelDots level={lv} />
            <span>{lv}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

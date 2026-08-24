import { createFileRoute } from "@tanstack/react-router";
import { BookOpen, Brain, FileText, ExternalLink, ChevronDown } from "lucide-react";
import { useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

export const Route = createFileRoute("/publications")({
  head: () => ({
    meta: [
      { title: "Publications | Noor Fatima" },
      {
        name: "description",
        content:
          "Peer-reviewed publications in applied AI and deep learning, focused on EEG-based brain signal analysis and real-world healthcare problems.",
      },
      { property: "og:title", content: "Publications | Noor Fatima" },
      {
        property: "og:description",
        content:
          "Two peer-reviewed publications applying deep learning to real-world EEG and clinical signal-analysis problems.",
      },
    ],
  }),
  component: PublicationsPage,
});

interface Pub {
  title: string;
  authors: string;
  venue: string;
  status: string;
  relevance: string;
  abstract: string;
  link: string;
  tags: string[];
  icon: typeof Brain;
}

const publications: Pub[] = [
  {
    title:
      "TriNet-MTL: A Multi-Branch Deep Learning Framework for Biometric Identification and Cognitive State Inference from Auditory-Evoked EEG",
    authors: "Noor Fatima, Ghulam Nabi",
    venue: "eNeuro (2026)",
    status: "Published",
    relevance:
      "A multi-branch deep learning architecture solving two real-world problems at once: secure biometric ID and cognitive-state inference, both directly from raw EEG signals.",
    abstract:
      "Auditory-evoked EEG signals contain rich temporal and cognitive features reflecting both individual identity and neural responses to external stimuli. This work introduces TriNet-MTL, a multi-branch deep learning framework combining a shared temporal encoder with a transformer-based sequence modeling unit. The model jointly performs biometric identification, stimulus language classification, and device modality recognition using multitask learning. Trained on EEG data from 20 participants, it achieves over 93% accuracy in biometric identification while maintaining strong generalization in cognitive inference tasks. The framework improves representation learning, reduces inter-task interference, and demonstrates strong potential for real-world EEG-based biometric authentication and cognitive monitoring systems.",
    link: "https://www.eneuro.org/content/13/2/ENEURO.0265-25.2025.abstract",
    tags: ["Deep Learning", "Multi-Task Learning", "EEG", "Biometrics"],
    icon: Brain,
  },
  {
    title:
      "Multimodal EEG-based Classification of Alzheimer's and MCI using Olfactory Event-Related Potentials and Transformers",
    authors: "Noor Fatima, Ghulam Nabi",
    venue: "Brain-Apparatus Communication Journal (2025)",
    status: "Published",
    relevance:
      "Transformer-based pipeline for early Alzheimer's and MCI screening from multimodal EEG, applying modern sequence models to a high-impact healthcare problem.",
    abstract:
      "Neurodegenerative diseases such as Alzheimer's Disease and Mild Cognitive Impairment often present early olfactory dysfunction. This study proposes a Transformer-based deep learning framework leveraging olfactory event-related potentials (ERPs) from EEG signals for early diagnosis. EEG data from 35 participants were processed using time-frequency and spatial feature extraction. The model achieved 87% accuracy and a macro F1-score of 0.88, outperforming traditional approaches. It demonstrated strong sensitivity for MCI detection and provided interpretable attention patterns aligned with known ERP components, highlighting its potential as a noninvasive and cost-effective neurodiagnostic tool.",
    link: "https://doi.org/10.1080/27706710.2025.2602997",
    tags: ["Transformers", "Multimodal", "Healthcare AI", "EEG"],
    icon: FileText,
  },
];

export function PublicationsPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16 md:py-24">
      <div className="text-xs font-mono uppercase tracking-widest text-primary">
        Publications
      </div>
      <h1 className="mt-3 font-display text-4xl md:text-5xl font-semibold tracking-tight leading-[1.05]">
        Research that <span className="text-gradient">ships</span>.
      </h1>
      <p className="mt-5 max-w-2xl text-lg text-muted-foreground leading-relaxed">
        Published research in applied AI and deep learning, focusing on real-world problems such as
        EEG-based brain signal analysis.
      </p>

      <div className="mt-12 space-y-5">
        {publications.map((p) => (
          <PublicationCard key={p.title} pub={p} />
        ))}
      </div>

      <div className="mt-16 rounded-2xl border border-border bg-card p-6 md:p-8 flex items-start gap-4">
        <span className="h-10 w-10 grid place-items-center rounded-lg bg-primary/10 text-primary shrink-0">
          <BookOpen className="h-5 w-5" />
        </span>
        <p className="text-sm text-muted-foreground leading-relaxed">
          These publications back the engineering work with{" "}
          <span className="text-foreground">strong AI/ML fundamentals</span> and depth in complex,
          real-world domains like healthcare and neuroscience. The same rigor I bring to shipping
          production ML systems.
        </p>
      </div>
    </div>
  );
}

function PublicationCard({ pub: p }: { pub: Pub }) {
  const [open, setOpen] = useState(false);
  return (
    <article className="group relative rounded-2xl border border-border bg-card p-6 md:p-8 hover:border-primary/40 hover:shadow-card transition-all overflow-hidden">
      <div className="absolute -top-16 -right-16 h-48 w-48 rounded-full bg-primary/5 blur-3xl group-hover:bg-primary/10 transition" />
      <div className="relative">
        <div className="flex items-start justify-between gap-4">
          <span className="h-10 w-10 grid place-items-center rounded-lg bg-primary/10 text-primary shrink-0">
            <p.icon className="h-5 w-5" />
          </span>
          <span className="text-xs font-mono text-primary border border-primary/30 px-2 py-1 rounded shrink-0">
            {p.status} · {p.venue}
          </span>
        </div>

        <h2 className="mt-5 font-display text-lg md:text-xl font-semibold leading-snug">
          {p.title}
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">{p.authors}</p>
        <p className="mt-4 text-sm text-foreground/85 leading-relaxed">{p.relevance}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          {p.tags.map((t) => (
            <span
              key={t}
              className="text-xs font-mono px-2.5 py-1 rounded-md bg-secondary text-secondary-foreground border border-border/60"
            >
              {t}
            </span>
          ))}
        </div>

        <Collapsible open={open} onOpenChange={setOpen}>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href={p.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 active:scale-[0.98] transition"
            >
              <ExternalLink className="h-4 w-4" />
              Paper
            </a>
            <CollapsibleTrigger asChild>
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-background/40 px-4 py-2 text-sm font-medium text-foreground hover:border-primary/40 hover:bg-secondary/60 active:scale-[0.98] transition"
              >
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
                />
                {open ? "Hide Abstract" : "Abstract"}
              </button>
            </CollapsibleTrigger>
          </div>

          <CollapsibleContent className="overflow-hidden data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:slide-out-to-top-1 data-[state=open]:slide-in-from-top-1">
            <div className="mt-5 rounded-xl border border-border/70 bg-background/40 p-5 md:p-6">
              <div className="text-[11px] font-mono uppercase tracking-widest text-primary mb-2">
                Abstract
              </div>
              <p className="text-sm md:text-[15px] leading-7 text-foreground/85">
                {p.abstract}
              </p>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </article>
  );
}

export default PublicationsPage;

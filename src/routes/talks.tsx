import { createFileRoute } from "@tanstack/react-router";
import { ExternalLink, FileText, Calendar, Users, Mic } from "lucide-react";

interface Talk {
  title: string;
  event: string;
  date: string;
  description: string;
  talkUrl: string;
  slidesUrl: string;
}

const talks: Talk[] = [
  {
    title: "AI for Brain: Unlocking Cognitive Insights with Machine Learning",
    event: "ACM UET Lahore Chapter",
    date: "August 2025",
    description:
      "Engaged 100+ students and faculty in ML applications for neuroscience and predictive modeling.",
    talkUrl: "https://drive.google.com/file/d/1x-XxH2F6zp6eiB1ZZIAA0W6Wj9osQ92B/view",
    slidesUrl: "https://drive.google.com/file/d/12wXUE5LoYlQrvojvIz3sapi8Toq3hUma/view",
  },
  {
    title: "Data-Centric AI: Why Better Data Beats Bigger Models",
    event: "Google Developer Group (GDG), UET Lahore",
    date: "August 2025",
    description:
      "Addressed 50+ AI enthusiasts on data quality and intelligent system development.",
    talkUrl: "https://drive.google.com/file/d/1tVBMx9-RuZW2ef1Jg25rRkIN5KVN_SLD/view",
    slidesUrl: "https://drive.google.com/file/d/1Xv78iuJI_uL5iHWqCWausF7ARxtfW2oH/view",
  },
];

export const Route = createFileRoute("/talks")({
  head: () => ({
    meta: [
      { title: "Invited Talks | Noor Fatima" },
      {
        name: "description",
        content:
          "Invited talks on machine learning for neuroscience and data-centric AI at ACM UET Lahore and Google Developer Group.",
      },
      { property: "og:title", content: "Invited Talks | Noor Fatima" },
      {
        property: "og:description",
        content:
          "Speaker on applied machine learning, neuroscience AI, and data-centric system design.",
      },
    ],
  }),
  component: TalksPage,
});

function TalksPage() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-16 md:py-24">
      <div className="text-xs font-mono uppercase tracking-widest text-primary">Invited Talks</div>
      <h1 className="mt-3 font-display text-4xl md:text-5xl font-semibold tracking-tight">
        Speaking on <span className="text-gradient">applied AI</span> and ML.
      </h1>
      <p className="mt-4 max-w-2xl text-muted-foreground leading-relaxed">
        Selected invited talks at university chapters and developer communities, covering machine
        learning for neuroscience and the engineering practice of data-centric AI.
      </p>

      <div className="mt-12 space-y-5">
        {talks.map((t) => (
          <article
            key={t.title}
            className="rounded-2xl border border-border bg-card shadow-card overflow-hidden"
          >
            <div className="bg-gradient-hero h-1" />
            <div className="p-6 md:p-8">
              <div className="flex items-start gap-4">
                <div className="h-11 w-11 shrink-0 rounded-xl bg-primary/10 grid place-items-center">
                  <Mic className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="font-display text-xl md:text-2xl font-semibold tracking-tight">
                    {t.title}
                  </h2>
                  <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5">
                      <Users className="h-3.5 w-3.5" /> {t.event}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5" /> {t.date}
                    </span>
                  </div>
                </div>
              </div>

              <p className="mt-5 text-muted-foreground leading-relaxed">{t.description}</p>

              <div className="mt-6 flex flex-wrap gap-2.5">
                <a
                  href={t.talkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 transition"
                >
                  <ExternalLink className="h-4 w-4" /> Watch talk
                </a>
                <a
                  href={t.slidesUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-border bg-secondary/60 px-4 py-2 text-sm font-medium hover:bg-secondary transition"
                >
                  <FileText className="h-4 w-4" /> View slides
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

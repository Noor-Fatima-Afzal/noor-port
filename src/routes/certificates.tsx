import { createFileRoute } from "@tanstack/react-router";
import { ExternalLink, Award } from "lucide-react";
import { BrandIcon, type BrandKey } from "@/components/brand-icons";

interface Cert {
  title: string;
  provider: string;
  brand: BrandKey;
  url?: string;
}

const certs: Cert[] = [
  {
    title: "Supervised Machine Learning: Regression and Classification",
    provider: "DeepLearning.AI",
    brand: "deeplearning",
    url: "https://www.coursera.org/account/accomplishments/verify/DE2S3NJCE2N0",
  },
  {
    title: "Deep Learning with PyTorch: Image Segmentation",
    provider: "Coursera Project Network",
    brand: "coursera",
    url: "https://coursera.org/verify/4K6A7Y3OXK11",
  },
  {
    title: "Introduction to Artificial Intelligence",
    provider: "Google",
    brand: "google",
    url: "https://www.coursera.org/account/accomplishments/verify/ZZG2X8L7OZAL",
  },
  {
    title: "Fundamentals of Machine Learning",
    provider: "Microsoft",
    brand: "microsoft",
    url: "https://drive.google.com/file/d/1XoRGOkP88iHgK8iovzQOgv3nvRCvydHM/view",
  },
  {
    title: "The Nuts and Bolts of Machine Learning",
    provider: "Google",
    brand: "google",
    url: "https://www.coursera.org/account/accomplishments/verify/QLQIXJ6UIA65",
  },
  {
    title: "Crash Course on Python",
    provider: "Google",
    brand: "google",
    url: "https://www.coursera.org/account/accomplishments/verify/WF1APQEKGL1E",
  },
  {
    title: "SQL (Basic, Intermediate and Advanced)",
    provider: "HackerRank",
    brand: "hackerrank",
  },
  {
    title: "AI Agents Fundamentals",
    provider: "Hugging Face",
    brand: "huggingface",
  },
  {
    title: "Intro to Deep Learning",
    provider: "Kaggle",
    brand: "kaggle",
  },
];

export const Route = createFileRoute("/certificates")({
  head: () => ({
    meta: [
      { title: "Certificates | Noor Fatima" },
      {
        name: "description",
        content:
          "Verified certifications in machine learning, deep learning, and AI from Google, Microsoft, DeepLearning.AI, Coursera, Hugging Face, Kaggle, and HackerRank.",
      },
      { property: "og:title", content: "Certificates | Noor Fatima" },
      {
        property: "og:description",
        content:
          "Continuous learning across ML, deep learning, NLP, and data engineering, verified by Google, Microsoft, DeepLearning.AI and others.",
      },
    ],
  }),
  component: CertificatesPage,
});

function CertificatesPage() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
      <div className="text-xs font-mono uppercase tracking-widest text-primary">Certificates</div>
      <h1 className="mt-3 font-display text-4xl md:text-5xl font-semibold tracking-tight">
        Verified learning across the <span className="text-gradient">AI stack</span>.
      </h1>
      <p className="mt-4 max-w-2xl text-muted-foreground leading-relaxed">
        Specialized programs from leading providers covering supervised learning, deep learning,
        computer vision, LLM agents, and data engineering.
      </p>

      <ul className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {certs.map((c) => {
          const Wrapper = c.url ? "a" : "div";
          const wrapperProps = c.url
            ? { href: c.url, target: "_blank", rel: "noopener noreferrer" as const }
            : {};
          return (
            <li key={c.title}>
              <Wrapper
                {...wrapperProps}
                className="group block h-full rounded-xl border border-border bg-card p-5 shadow-card hover:shadow-glow hover:-translate-y-0.5 transition-all"
              >
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 shrink-0 rounded-lg bg-secondary grid place-items-center text-foreground">
                    <BrandIcon brand={c.brand} className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="font-semibold text-[15px] leading-snug tracking-tight group-hover:text-primary transition-colors">
                      {c.title}
                    </h2>
                    <p className="mt-1 text-xs text-muted-foreground">{c.provider}</p>
                  </div>
                  {c.url ? (
                    <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                  ) : (
                    <Award className="h-4 w-4 text-muted-foreground shrink-0" />
                  )}
                </div>
              </Wrapper>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { GraduationCap, MapPin, Calendar, Award, ExternalLink } from "lucide-react";

export const Route = createFileRoute("/education")({
  head: () => ({
    meta: [
      { title: "Education | Noor Fatima" },
      {
        name: "description",
        content:
          "BS Computer Engineering at the University of Engineering and Technology, Lahore. Top of session, CGPA 3.86/4.0.",
      },
      { property: "og:title", content: "Education | Noor Fatima" },
      {
        property: "og:description",
        content:
          "BS Computer Engineering at UET Lahore, supervised by Prof. Dr. Muhammad Shahbaz.",
      },
    ],
  }),
  component: EducationPage,
});

function EducationPage() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-16 md:py-24">
      <div className="text-xs font-mono uppercase tracking-widest text-primary">Education</div>
      <h1 className="mt-3 font-display text-4xl md:text-5xl font-semibold tracking-tight">
        Academic foundation in <span className="text-gradient">computer engineering</span>.
      </h1>
      <p className="mt-4 max-w-2xl text-muted-foreground leading-relaxed">
        Strong fundamentals across systems, mathematics, and applied AI, paired with hands-on
        research and industry projects from year one.
      </p>

      <article className="mt-12 rounded-2xl border border-border bg-card shadow-card overflow-hidden">
        <div className="bg-gradient-hero h-2" />
        <div className="p-7 md:p-9">
          <div className="flex items-start gap-4">
            <div className="h-12 w-12 shrink-0 rounded-xl bg-primary/10 grid place-items-center">
              <GraduationCap className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <h2 className="font-display text-2xl font-semibold tracking-tight">
                BS in Computer Engineering
              </h2>
              <p className="mt-1 text-muted-foreground">
                University of Engineering and Technology, Lahore
              </p>
            </div>
          </div>

          <div className="mt-6 grid sm:grid-cols-2 gap-3">
            <div className="flex items-center gap-2.5 rounded-lg border border-border bg-secondary/40 px-3.5 py-2.5">
              <Calendar className="h-4 w-4 text-primary shrink-0" />
              <span className="text-sm">2023 to Expected 2027</span>
            </div>
            <div className="flex items-center gap-2.5 rounded-lg border border-border bg-secondary/40 px-3.5 py-2.5">
              <MapPin className="h-4 w-4 text-primary shrink-0" />
              <span className="text-sm">Lahore, Pakistan</span>
            </div>
            <div className="flex items-center gap-2.5 rounded-lg border border-primary/40 bg-primary/5 px-3.5 py-2.5">
              <Award className="h-4 w-4 text-primary shrink-0" />
              <span className="text-sm">
                <span className="font-semibold text-foreground">CGPA 3.86 / 4.0</span>{" "}
                <span className="text-muted-foreground">· Top 3 in session</span>
              </span>
            </div>
            <a
              href="https://staff.uet.edu.pk/profile/121"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2.5 rounded-lg border border-border bg-secondary/40 px-3.5 py-2.5 hover:bg-secondary transition-colors"
            >
              <ExternalLink className="h-4 w-4 text-primary shrink-0" />
              <span className="text-sm">
                Supervisor:{" "}
                <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                  Prof. Dr. Muhammad Shahbaz
                </span>
              </span>
            </a>
          </div>

          <div className="mt-7 pt-7 border-t border-border">
            <h3 className="text-sm font-mono uppercase tracking-widest text-muted-foreground">
              Focus areas
            </h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {[
                "Machine Learning",
                "Deep Learning",
                "Signal Processing",
                "Algorithms & DSA",
                "Computer Vision",
                "NLP",
                "Embedded Systems",
                "Software Engineering",
              ].map((f) => (
                <span
                  key={f}
                  className="text-xs px-2.5 py-1 rounded-md bg-secondary text-secondary-foreground font-mono"
                >
                  {f}
                </span>
              ))}
            </div>
          </div>
        </div>
      </article>
    </section>
  );
}

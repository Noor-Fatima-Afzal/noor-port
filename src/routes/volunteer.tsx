import { createFileRoute } from "@tanstack/react-router";
import { Calendar, MapPin, Users, Sparkles, PenTool, Globe, Award } from "lucide-react";

export const Route = createFileRoute("/volunteer")({
  head: () => ({
    meta: [
      { title: "Volunteer & Community — Noor Fatima" },
      {
        name: "description",
        content:
          "Volunteer roles, community leadership, and outreach contributions across student organizations, conferences, and global research bodies.",
      },
      { property: "og:title", content: "Volunteer & Community — Noor Fatima" },
      {
        property: "og:description",
        content:
          "Community contributions across ACM UET, AIRCI EXPO, Dr Coders, IAENG, and MCETS.",
      },
    ],
  }),
  component: VolunteerPage,
});

type Role = {
  org: string;
  role: string;
  period: string;
  location?: string;
  type: string;
  icon: typeof Users;
  bullets: string[];
  tags?: string[];
};

const roles: Role[] = [
  {
    org: "Mediterranean Conference on Emerging Technologies and Systems (MCETS)",
    role: "Committee Chair — Publicity",
    period: "Oct 2025 – Present",
    type: "Leadership",
    icon: Award,
    bullets: [
      "Serving on the conference committee, coordinating with international academics and reviewers.",
      "Leading publicity initiatives across digital channels to grow conference visibility and submissions.",
    ],
    tags: ["Conference Ops", "Publicity", "Academia"],
  },
  {
    org: "International Association of Engineers (IAENG)",
    role: "Member",
    period: "Aug 2025 – Present",
    type: "Membership",
    icon: Globe,
    bullets: [
      "Engage with global research communities through publications, conferences, and knowledge-sharing forums.",
      "Advocate for ethical, reproducible, and impactful AI practices across academia and industry.",
    ],
    tags: ["Research", "Ethics", "Global Network"],
  },
  {
    org: "Dr Coders",
    role: "Content Writer",
    period: "May 2024 – Jun 2024",
    type: "Content",
    icon: PenTool,
    bullets: [
      "Authored developer-focused content that distilled complex coding concepts into clear, accessible reads.",
      "Partnered with editors and engineers to ship educational material aligned with learner needs.",
    ],
    tags: ["Technical Writing", "Education", "DevRel"],
  },
  {
    org: "AIRCI EXPO",
    role: "Ambassador",
    period: "Mar 2024 – Apr 2024",
    type: "Outreach",
    icon: Users,
    bullets: [
      "Led outreach initiatives that connected industry professionals, researchers, and student innovators.",
      "Expanded event reach through targeted campaigns and curated content strategy.",
    ],
    tags: ["Outreach", "Community", "Events"],
  },
  {
    org: "ACM UET Lahore",
    role: "Student Volunteer — UTS 4.0",
    period: "Feb 2024",
    type: "Volunteer",
    icon: Sparkles,
    bullets: [
      "Contributed to the décor team for UTS 4.0, translating creative concepts into a cohesive event ambience.",
      "Collaborated with cross-functional teams to deliver a polished, memorable attendee experience.",
    ],
    tags: ["Teamwork", "Creative Ops"],
  },
];

function VolunteerPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 pt-28 pb-24">
      {/* Header */}
      <header className="reveal-on-scroll mb-14">
        <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-3">
          Community / Service
        </div>
        <h1 className="font-display text-4xl md:text-5xl font-semibold tracking-tight">
          Volunteer & Leadership
        </h1>
        <p className="mt-4 max-w-2xl text-muted-foreground leading-relaxed">
          Contributions to student organizations, academic conferences, and global research
          communities — focused on outreach, knowledge sharing, and ethical AI advocacy.
        </p>
      </header>

      {/* Stat strip */}
      <div className="reveal-on-scroll grid grid-cols-3 gap-3 mb-14">
        {[
          { k: "5+", v: "Roles" },
          { k: "3", v: "Organizations led" },
          { k: "2025", v: "Active member" },
        ].map((s) => (
          <div
            key={s.v}
            className="rounded-xl border border-border bg-card/40 px-4 py-3 text-center"
          >
            <div className="font-display text-2xl font-semibold">{s.k}</div>
            <div className="text-xs text-muted-foreground mt-0.5">{s.v}</div>
          </div>
        ))}
      </div>

      {/* Timeline */}
      <div className="relative">
        <div
          aria-hidden
          className="absolute left-[19px] top-2 bottom-2 w-px bg-gradient-to-b from-border via-border to-transparent"
        />
        <ul className="space-y-6">
          {roles.map((r) => {
            const Icon = r.icon;
            return (
              <li key={r.org} className="reveal-on-scroll relative pl-14">
                <div className="absolute left-0 top-4 h-10 w-10 rounded-full border border-border bg-background grid place-items-center shadow-sm">
                  <Icon className="h-4 w-4 text-foreground/80" />
                </div>

                <article className="lift-on-hover interactive rounded-xl border border-border bg-card/60 backdrop-blur-sm p-5 md:p-6 transition-colors hover:border-foreground/20">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h2 className="font-display text-lg md:text-xl font-semibold tracking-tight">
                        {r.role}
                      </h2>
                      <div className="mt-1 text-sm text-muted-foreground">{r.org}</div>
                    </div>
                    <span className="shrink-0 rounded-full border border-border px-2.5 py-0.5 text-[11px] font-mono uppercase tracking-wider text-muted-foreground">
                      {r.type}
                    </span>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5" />
                      {r.period}
                    </span>
                    {r.location && (
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5" />
                        {r.location}
                      </span>
                    )}
                  </div>

                  <ul className="mt-4 space-y-2">
                    {r.bullets.map((b) => (
                      <li
                        key={b}
                        className="text-sm leading-relaxed text-foreground/85 pl-4 relative before:content-[''] before:absolute before:left-0 before:top-2.5 before:h-1 before:w-1 before:rounded-full before:bg-foreground/40"
                      >
                        {b}
                      </li>
                    ))}
                  </ul>

                  {r.tags && (
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {r.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded-md bg-secondary/70 px-2 py-0.5 text-[11px] font-mono text-muted-foreground"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

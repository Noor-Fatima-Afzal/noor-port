import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import { projects } from "@/lib/projects";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const project = projects.find((p) => p.slug === params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.project;
    if (!p) return { meta: [{ title: "Project | Noor Fatima" }] };
    return {
      meta: [
        { title: `${p.title} | Noor Fatima` },
        { name: "description", content: p.description },
        { property: "og:title", content: `${p.title} | Noor Fatima` },
        { property: "og:description", content: p.description },
        { property: "og:image", content: p.image },
        { name: "twitter:image", content: p.image },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-6xl px-6 py-24 text-center">
      <h1 className="font-display text-4xl">Project not found</h1>
      <Link to="/projects" className="mt-4 inline-block text-primary">
        ← Back to projects
      </Link>
    </div>
  ),
  component: ProjectDetail,
});

function ProjectDetail() {
  const { project: p } = Route.useLoaderData() as { project: typeof projects[number] };

  return (
    <article className="mx-auto max-w-4xl px-6 py-16">
      <Link
        to="/projects"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> All projects
      </Link>

      <div className="mt-6 flex flex-wrap gap-2">
        {p.categories.map((c) => (
          <span
            key={c}
            className="text-xs font-mono px-2 py-0.5 rounded-md border border-primary/30 text-primary bg-primary/5"
          >
            {c}
          </span>
        ))}
        <span className="text-xs font-mono px-2 py-0.5 text-muted-foreground">{p.date}</span>
      </div>

      <h1 className="mt-4 font-display text-4xl md:text-5xl font-semibold tracking-tight">
        {p.title}
      </h1>
      <p className="mt-4 text-lg text-muted-foreground leading-relaxed">{p.description}</p>

      <div className="mt-6 flex items-center gap-3">
        {p.github && (
          <a
            href={p.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm hover:bg-secondary"
          >
            <GithubIcon className="h-4 w-4" /> GitHub
          </a>
        )}
        {p.demo && (
          <a
            href={p.demo}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm text-primary-foreground hover:opacity-90"
          >
            <ExternalLink className="h-4 w-4" /> Live Demo
          </a>
        )}
      </div>

      <div className="mt-10 overflow-hidden rounded-2xl border border-border shadow-card">
        <img
          src={p.image}
          alt={p.title}
          width={1024}
          height={768}
          className="w-full h-auto"
        />
      </div>

      <div className="mt-12 grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="font-display text-xl font-semibold tracking-tight">Key Results</h2>
          <ul className="mt-4 space-y-2">
            {p.results.map((r) => (
              <li
                key={r}
                className="flex items-start gap-3 text-sm text-foreground/90"
              >
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                {r}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-display text-xl font-semibold tracking-tight">Tech Stack</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {p.stack.map((s) => (
              <span
                key={s}
                className="text-xs font-mono px-2.5 py-1 rounded-md bg-secondary text-secondary-foreground"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

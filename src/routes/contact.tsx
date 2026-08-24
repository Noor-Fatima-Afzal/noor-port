import { createFileRoute } from "@tanstack/react-router";
import { Loader2, Mail, MapPin, Phone, Send } from "lucide-react";
import { useState, type FormEvent } from "react";
import emailjs from "@emailjs/browser";
import { toast } from "sonner";
import { z } from "zod";
import { GithubIcon, LinkedinIcon, ScholarIcon, OrcidIcon } from "@/components/icons";

const PURPOSE_OPTIONS = [
  { value: "hiring", label: "Hiring / Job Opportunity" },
  { value: "freelance", label: "Freelance / Project Collaboration" },
  { value: "technical", label: "Technical Question" },
  { value: "networking", label: "Networking / General Inquiry" },
  { value: "other", label: "Other" },
] as const;

type PurposeValue = (typeof PURPOSE_OPTIONS)[number]["value"];

const PURPOSE_PLACEHOLDERS: Record<PurposeValue, string> = {
  hiring: "Describe the role, company, and expectations",
  freelance: "Briefly describe your project and timeline",
  technical: "Explain your problem or question clearly",
  networking: "What would you like to connect about?",
  other: "Write your message",
};

const purposeLabel = (v: string) =>
  PURPOSE_OPTIONS.find((o) => o.value === v)?.label ?? v;

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact | Noor Fatima" },
      {
        name: "description",
        content:
          "Get in touch with Noor Fatima for AI and Machine Learning Engineer roles and collaborations.",
      },
      { property: "og:title", content: "Contact | Noor Fatima" },
      {
        property: "og:description",
        content: "Open to AI and Machine Learning Engineer roles and project collaborations.",
      },
    ],
  }),
  component: ContactPage,
});

// EmailJS configuration. Public keys are safe to expose in frontend code.
const EMAILJS_SERVICE_ID =
  (import.meta.env.VITE_EMAILJS_SERVICE_ID as string | undefined) ?? "service_gz3wcfo";
const EMAILJS_TEMPLATE_ID =
  (import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string | undefined) ?? "template_p5e37ho";
const EMAILJS_PUBLIC_KEY =
  (import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string | undefined) ?? "MI2E_70EUUyLFpOSH";

const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "Name is required" })
    .max(100, { message: "Name must be under 100 characters" }),
  email: z
    .string()
    .trim()
    .email({ message: "Please enter a valid email" })
    .max(255, { message: "Email must be under 255 characters" }),
  subject: z.string().trim().max(200, { message: "Subject must be under 200 characters" }).optional(),
  purpose: z.enum(["hiring", "freelance", "technical", "networking", "other"], {
    message: "Please select a purpose of contact",
  }),
  message: z
    .string()
    .trim()
    .min(5, { message: "Message must be at least 5 characters" })
    .max(2000, { message: "Message must be under 2000 characters" }),
});

export function ContactPage() {
  const [sending, setSending] = useState(false);
  const [purpose, setPurpose] = useState<PurposeValue | "">("");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (sending) return;

    const form = e.currentTarget;
    const fd = new FormData(form);
    const raw = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      subject: String(fd.get("subject") ?? ""),
      purpose: String(fd.get("purpose") ?? ""),
      message: String(fd.get("message") ?? ""),
    };

    const parsed = contactSchema.safeParse(raw);
    if (!parsed.success) {
      const first = parsed.error.issues[0];
      toast.error(first?.message ?? "Please check your inputs");
      return;
    }

    setSending(true);
    try {
      const purposeText = purposeLabel(parsed.data.purpose);
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          name: parsed.data.name,
          email: parsed.data.email,
          subject: parsed.data.subject || `[${purposeText}] Portfolio inquiry`,
          purpose: purposeText,
          message: `Purpose: ${purposeText}\n\n${parsed.data.message}`,
          to_email: "noorfatimaafzalbutt@gmail.com",
          reply_to: parsed.data.email,
        },
        { publicKey: EMAILJS_PUBLIC_KEY },
      );
      toast.success("Message sent! I'll get back to you soon.");
      form.reset();
      setPurpose("");
    } catch (err) {
      console.error("[contact] EmailJS send failed:", err);
      toast.error("Couldn't send message. Please email noorfatimaafzalbutt@gmail.com directly.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-6 py-16 md:py-24">
      <div className="text-xs font-mono uppercase tracking-widest text-primary">Contact</div>
      <h1 className="mt-3 font-display text-4xl md:text-5xl font-semibold tracking-tight">
        Let's <span className="text-gradient">collaborate</span>.
      </h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        Open to AI and Machine Learning Engineer roles, freelance ML projects, and applied research
        collaborations.
      </p>

      <div className="mt-12 grid md:grid-cols-5 gap-8">
        <aside className="md:col-span-2 space-y-3">
          <a
            href="mailto:noorfatimaafzalbutt@gmail.com"
            className="group flex items-center gap-3 rounded-xl border border-border bg-card p-4 hover:border-primary/40 transition-colors"
          >
            <span className="h-10 w-10 grid place-items-center rounded-lg bg-primary/10 text-primary">
              <Mail className="h-4 w-4" />
            </span>
            <div>
              <div className="text-xs text-muted-foreground">Email</div>
              <div className="text-sm font-medium">noorfatimaafzalbutt@gmail.com</div>
            </div>
          </a>
          <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-4">
            <span className="h-10 w-10 grid place-items-center rounded-lg bg-primary/10 text-primary">
              <Phone className="h-4 w-4" />
            </span>
            <div>
              <div className="text-xs text-muted-foreground">Phone</div>
              <div className="text-sm font-medium">+92-327-8734825</div>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-4">
            <span className="h-10 w-10 grid place-items-center rounded-lg bg-primary/10 text-primary">
              <MapPin className="h-4 w-4" />
            </span>
            <div>
              <div className="text-xs text-muted-foreground">Based in</div>
              <div className="text-sm font-medium">Lahore, PK · Cyprus · Saskatoon, CA (2026)</div>
            </div>
          </div>

          <a
            href="https://orcid.org/0009-0007-6079-1974"
            target="_blank"
            rel="noreferrer"
            className="group flex items-center gap-3 rounded-xl border border-border bg-card p-4 hover:border-primary/40 transition-colors"
          >
            <span className="h-10 w-10 grid place-items-center rounded-lg bg-primary/10 text-primary">
              <OrcidIcon className="h-4 w-4" />
            </span>
            <div>
              <div className="text-xs text-muted-foreground">ORCID</div>
              <div className="text-sm font-medium">0009-0007-6079-1974</div>
            </div>
          </a>

          <div className="flex gap-2 pt-2">
            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="h-10 w-10 grid place-items-center rounded-lg border border-border bg-card hover:bg-secondary"
            >
              <LinkedinIcon className="h-4 w-4" />
            </a>
            <a
              href="https://github.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="h-10 w-10 grid place-items-center rounded-lg border border-border bg-card hover:bg-secondary"
            >
              <GithubIcon className="h-4 w-4" />
            </a>
            <a
              href="https://scholar.google.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="Google Scholar"
              className="h-10 w-10 grid place-items-center rounded-lg border border-border bg-card hover:bg-secondary"
            >
              <ScholarIcon className="h-4 w-4" />
            </a>
            <a
              href="https://orcid.org/0009-0007-6079-1974"
              target="_blank"
              rel="noreferrer"
              aria-label="ORCID"
              className="h-10 w-10 grid place-items-center rounded-lg border border-border bg-card hover:bg-secondary"
            >
              <OrcidIcon className="h-4 w-4" />
            </a>
          </div>
        </aside>

        <form
          onSubmit={onSubmit}
          className="md:col-span-3 rounded-2xl border border-border bg-card p-6 md:p-8 space-y-4"
        >
          <div className="grid sm:grid-cols-2 gap-4">
            <label className="block">
              <span className="text-xs font-mono text-muted-foreground">Name</span>
              <input
                required
                name="name"
                maxLength={100}
                disabled={sending}
                className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 disabled:opacity-60"
              />
            </label>
            <label className="block">
              <span className="text-xs font-mono text-muted-foreground">Email</span>
              <input
                required
                type="email"
                name="email"
                maxLength={255}
                disabled={sending}
                className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 disabled:opacity-60"
              />
            </label>
          </div>
          <label className="block">
            <span className="text-xs font-mono text-muted-foreground">
              Purpose of Contact <span className="text-primary">*</span>
            </span>
            <select
              required
              name="purpose"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value as PurposeValue)}
              disabled={sending}
              className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 disabled:opacity-60 transition-all duration-200"
            >
              <option value="" disabled>
                Select a purpose…
              </option>
              {PURPOSE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="text-xs font-mono text-muted-foreground">Subject</span>
            <input
              name="subject"
              maxLength={200}
              disabled={sending}
              className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 disabled:opacity-60"
            />
          </label>
          <label className="block">
            <span className="text-xs font-mono text-muted-foreground">Message</span>
            <textarea
              key={purpose || "default"}
              required
              name="message"
              rows={6}
              maxLength={2000}
              disabled={sending}
              placeholder={
                purpose
                  ? PURPOSE_PLACEHOLDERS[purpose]
                  : "Tell me a bit about why you're reaching out…"
              }
              className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 resize-y disabled:opacity-60 animate-in fade-in duration-300"
            />
          </label>
          <button
            type="submit"
            disabled={sending}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-glow hover:opacity-90 transition disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {sending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Sending…
              </>
            ) : (
              <>
                <Send className="h-4 w-4" /> Send message
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

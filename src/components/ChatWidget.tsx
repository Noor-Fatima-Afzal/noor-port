import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, Send, X, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { askChat, warmUpBackend } from "@/lib/api";

type Msg = {
  id: string;
  role: "user" | "ai";
  content: string;
  sources?: string[];
};

const WELCOME: Msg = {
  id: "welcome",
  role: "ai",
  content:
    "Hi! I'm Noor's AI assistant. Ask me anything about her projects, publications, experience, or skills.",
};

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([WELCOME]);
  const [statusHint, setStatusHint] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Silently warm up backend on first mount
  useEffect(() => {
    warmUpBackend();
  }, []);

  // Auto-scroll to latest
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading, open]);

  // Focus input on open
  useEffect(() => {
    if (open) {
      const t = setTimeout(() => inputRef.current?.focus(), 200);
      return () => clearTimeout(t);
    }
  }, [open]);

  async function send() {
    const q = input.trim();
    if (!q || loading) return;
    const userMsg: Msg = { id: crypto.randomUUID(), role: "user", content: q };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setLoading(true);
    setStatusHint(null);

    const result = await askChat(q, {
      onColdStart: () => setStatusHint("Waking up server… please wait"),
      onRetry: () =>
        setStatusHint("Something is taking longer than expected. Retrying…"),
    });

    if (result.ok && result.data) {
      const data = result.data;
      const answer =
        (typeof data.answer === "string" && data.answer) ||
        (typeof data.response === "string" && data.response) ||
        (typeof data.message === "string" && data.message) ||
        "I couldn't generate a response.";

      let sources: string[] | undefined;
      if (Array.isArray(data.sources_used)) {
        sources = data.sources_used.map((s) => String(s));
      } else if (
        typeof data.sources_used === "number" &&
        data.sources_used > 0
      ) {
        sources = Array.from(
          { length: data.sources_used },
          (_, i) => `Source ${i + 1}`,
        );
      }

      setMessages((m) => [
        ...m,
        { id: crypto.randomUUID(), role: "ai", content: answer, sources },
      ]);
    } else {
      setMessages((m) => [
        ...m,
        {
          id: crypto.randomUUID(),
          role: "ai",
          content:
            (!result.ok && result.error) ||
            "I couldn't reach the assistant right now. Please try again in a moment.",
        },
      ]);
    }

    setStatusHint(null);
    setLoading(false);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }

  return (
    <>
      {/* Floating button */}
      <AnimatePresence>
        {!open && (
          <motion.button
            key="chat-fab"
            initial={{ opacity: 0, scale: 0.85, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 16 }}
            transition={{ duration: 0.2 }}
            onClick={() => setOpen(true)}
            aria-label="Open chat"
            className="fixed bottom-5 right-5 z-50 group inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground pl-4 pr-5 py-3 shadow-glow hover:opacity-95 transition"
          >
            <MessageCircle className="h-5 w-5" />
            <span className="text-sm font-medium hidden sm:inline">
              Ask AI
            </span>
            <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-accent animate-pulse-glow" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="chat-panel"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="fixed z-50 bottom-4 right-4 left-4 sm:left-auto sm:bottom-5 sm:right-5 w-auto sm:w-[380px] max-h-[80vh] flex flex-col rounded-2xl border border-border bg-card/95 backdrop-blur-xl shadow-card overflow-hidden"
            role="dialog"
            aria-label="AI chat assistant"
          >
            {/* Header */}
            <div className="flex items-center justify-between gap-2 px-4 py-3 border-b border-border bg-secondary/40">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-primary/15 flex items-center justify-center">
                  <Sparkles className="h-4 w-4 text-primary" />
                </div>
                <div className="leading-tight">
                  <div className="text-sm font-display font-semibold text-foreground">
                    Noor's AI Assistant
                  </div>
                  <div className="text-[11px] text-muted-foreground flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    Online
                  </div>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="rounded-md p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted transition"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto px-3 py-4 space-y-3 bg-background/50"
            >
              {messages.map((m) => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.18 }}
                  className={cn(
                    "flex w-full",
                    m.role === "user" ? "justify-end" : "justify-start",
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[82%] rounded-2xl px-3.5 py-2 text-sm leading-relaxed whitespace-pre-wrap shadow-sm",
                      m.role === "user"
                        ? "bg-primary text-primary-foreground rounded-br-sm"
                        : "bg-card border border-border text-foreground rounded-bl-sm",
                    )}
                  >
                    {m.content}
                    {m.role === "ai" && m.sources && m.sources.length > 0 && (
                      <div className="mt-2 pt-2 border-t border-border/70 text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                        Sources: {m.sources.length}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}

              {loading && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="bg-card border border-border rounded-2xl rounded-bl-sm px-3.5 py-2.5 shadow-sm">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs text-muted-foreground mr-1">
                        {statusHint ?? "AI is typing"}
                      </span>
                      <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/70 animate-bounce [animation-delay:-0.3s]" />
                      <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/70 animate-bounce [animation-delay:-0.15s]" />
                      <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/70 animate-bounce" />
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Input */}
            <div className="border-t border-border bg-card px-3 py-3">
              <div className="flex items-center gap-2 rounded-xl border border-border bg-background/80 pl-3 pr-1 py-1 focus-within:ring-2 focus-within:ring-ring/40 transition">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onKeyDown}
                  placeholder="Ask me anything about my work…"
                  disabled={loading}
                  className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none py-2 disabled:opacity-60"
                />
                <button
                  onClick={send}
                  disabled={loading || !input.trim()}
                  aria-label="Send message"
                  className="inline-flex items-center justify-center h-8 w-8 rounded-lg bg-primary text-primary-foreground hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
              <div className="mt-1.5 text-[10px] text-muted-foreground text-center">
                First reply may take ~20s if the API is waking up.
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

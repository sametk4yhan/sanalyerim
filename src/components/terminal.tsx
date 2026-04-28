"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import styles from "@/app/page.module.css";
import { useIsMac } from "@/lib/platform";

type Line = { kind: "input" | "output" | "error" | "muted"; text: string };

const SECTIONS = ["work", "tech", "interests", "now", "blog"] as const;

const HELP: string[] = [
  "Available commands:",
  "  help              Show this help",
  "  ls                List sections",
  "  open <section>    Navigate to a section",
  "  whoami            About Samet",
  "  social            List social handles",
  "  contact           Email address",
  "  clear             Clear screen",
  "  exit              Close terminal (Esc)",
];

const BANNER: Line[] = [
  { kind: "output", text: "samet@portfolio — interactive shell" },
  { kind: "muted", text: "try the chips below or type a command · `help` for all · esc to close" },
];

const QUICK_COMMANDS = ["help", "ls", "open work", "open now", "whoami", "social"] as const;

const HINT_KEY = "samet:terminal:seen";

export function Terminal() {
  const isMac = useIsMac();
  const modKey = isMac ? "⌘" : "Ctrl";
  const [open, setOpen] = useState(false);
  const [lines, setLines] = useState<Line[]>(BANNER);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [showToast, setShowToast] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: globalThis.KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.localStorage.getItem(HINT_KEY)) return;
    const showTimer = window.setTimeout(() => setShowToast(true), 1800);
    const hideTimer = window.setTimeout(() => {
      setShowToast(false);
      window.localStorage.setItem(HINT_KEY, "1");
    }, 9000);
    return () => {
      window.clearTimeout(showTimer);
      window.clearTimeout(hideTimer);
    };
  }, []);

  useEffect(() => {
    if (open && typeof window !== "undefined") {
      setShowToast(false);
      window.localStorage.setItem(HINT_KEY, "1");
    }
  }, [open]);

  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ block: "end" });
  }, [lines, open]);

  const run = (raw: string) => {
    const cmd = raw.trim();
    const next: Line[] = [...lines, { kind: "input", text: `› ${raw}` }];
    if (!cmd) {
      setLines(next);
      return;
    }
    const [name, ...args] = cmd.split(/\s+/);
    const arg = args.join(" ").toLowerCase();

    switch (name.toLowerCase()) {
      case "help":
      case "?":
        next.push(...HELP.map((text) => ({ kind: "output" as const, text })));
        break;
      case "ls":
        next.push({ kind: "output", text: SECTIONS.join("   ") });
        break;
      case "cd":
      case "open":
        if ((SECTIONS as readonly string[]).includes(arg)) {
          window.dispatchEvent(new CustomEvent("samet:navigate", { detail: arg }));
          next.push({ kind: "output", text: `→ navigating to ${arg}` });
          setTimeout(() => setOpen(false), 220);
        } else {
          next.push({ kind: "error", text: `unknown section: ${arg || "(empty)"} — try \`ls\`` });
        }
        break;
      case "whoami":
        next.push(
          { kind: "output", text: "Samet Kayhan" },
          { kind: "muted", text: "Web designer · Mobile app developer · Frontend developer" },
        );
        break;
      case "social":
        next.push(
          { kind: "output", text: "github     https://github.com/sametk4yhan" },
          { kind: "output", text: "x          https://x.com/Sametk4yhan" },
          { kind: "output", text: "linkedin   https://www.linkedin.com/in/samet-kayhan-8405441a3" },
          { kind: "output", text: "instagram  https://instagram.com/sametk4yhan" },
        );
        break;
      case "contact":
        next.push({ kind: "output", text: "sametk4yhan@gmail.com" });
        break;
      case "clear":
      case "cls":
        setLines(BANNER);
        setHistory((h) => [...h, cmd]);
        setHistoryIndex(-1);
        return;
      case "exit":
      case "quit":
        setOpen(false);
        return;
      case "sudo":
        next.push({ kind: "error", text: "permission denied — nice try" });
        break;
      default:
        next.push({ kind: "error", text: `command not found: ${name} — try \`help\`` });
    }

    setLines(next);
    setHistory((h) => [...h, cmd]);
    setHistoryIndex(-1);
  };

  const onInputKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp" && history.length) {
      e.preventDefault();
      const i = historyIndex < 0 ? history.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(i);
      setInput(history[i]);
    } else if (e.key === "ArrowDown" && historyIndex >= 0) {
      e.preventDefault();
      const i = historyIndex + 1;
      if (i >= history.length) {
        setHistoryIndex(-1);
        setInput("");
      } else {
        setHistoryIndex(i);
        setInput(history[i]);
      }
    }
  };

  return (
    <>
      <button
        type="button"
        className={`${styles.terminalFab} ${styles.terminalFabPulse}`}
        onClick={() => setOpen(true)}
        aria-label="Open terminal"
        data-magnetic
      >
        <span className={styles.terminalFabKey}>{modKey}</span>
        <span className={styles.terminalFabKey}>K</span>
        <span className={styles.terminalFabLabel}>Try it</span>
      </button>

      {showToast ? (
        <div className={styles.terminalToast} role="status">
          <span className={styles.terminalToastDot} />
          Press <kbd className={styles.terminalToastKbd}>{modKey}</kbd>
          <kbd className={styles.terminalToastKbd}>K</kbd> to explore via terminal
        </div>
      ) : null}

      {open ? (
        <div className={styles.terminalOverlay} onClick={() => setOpen(false)} role="dialog" aria-label="Terminal">
          <div className={styles.terminalWindow} onClick={(e) => e.stopPropagation()}>
            <div className={styles.terminalBar}>
              <button
                type="button"
                aria-label="Close terminal"
                className={`${styles.terminalDot} ${styles.terminalDotClose}`}
                onClick={() => setOpen(false)}
              />
              <span className={`${styles.terminalDot} ${styles.terminalDotMin}`} />
              <span className={`${styles.terminalDot} ${styles.terminalDotMax}`} />
              <span className={styles.terminalTitle}>samet@portfolio — zsh</span>
            </div>
            <div className={styles.terminalBody}>
              {lines.map((line, i) => (
                <div key={i} className={styles[`terminal_${line.kind}`]}>
                  {line.text}
                </div>
              ))}
              <div className={styles.terminalChips}>
                {QUICK_COMMANDS.map((cmd) => (
                  <button
                    key={cmd}
                    type="button"
                    className={styles.terminalChip}
                    onClick={() => {
                      run(cmd);
                      setInput("");
                      inputRef.current?.focus();
                    }}
                  >
                    {cmd}
                  </button>
                ))}
              </div>
              <form
                className={styles.terminalInputRow}
                onSubmit={(e) => {
                  e.preventDefault();
                  run(input);
                  setInput("");
                }}
              >
                <span className={styles.terminalPrompt}>›</span>
                <input
                  ref={inputRef}
                  className={styles.terminalInput}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onInputKey}
                  autoComplete="off"
                  spellCheck={false}
                  placeholder="type a command — try `help`"
                  aria-label="Terminal input"
                />
              </form>
              <div ref={bottomRef} />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

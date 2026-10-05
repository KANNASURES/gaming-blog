"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { subscribe } from "@/services/subscriber-service";
import type { NewsletterContent } from "@/types/home";

type Status = "idle" | "submitting" | "success" | "error";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default function Newsletter({ data }: { data: NewsletterContent }) {
  const [email, setEmail] = useState("");
  const [trap, setTrap] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "submitting") return;

    const value = email.trim();

    if (!EMAIL_PATTERN.test(value)) {
      setStatus("error");
      setMessage(data.invalidEmailMessage);
      return;
    }

    // Bots fill hidden fields. Pretend it worked, but send nothing.
    if (trap) {
      setStatus("success");
      return;
    }

    setStatus("submitting");
    setMessage(null);

    try {
      const result = await subscribe(value);
      if (result.ok) {
        setStatus("success");
      } else {
        setStatus("error");
        setMessage(data.errorMessage);
      }
    } catch {
      setStatus("error");
      setMessage(data.errorMessage);
    }
  };

  return (
    <section className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
      <Reveal>
        <div className="relative overflow-hidden rounded-[2rem] border border-line bg-surface px-6 py-16 text-center md:px-16 md:py-24">
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(124,92,255,0.35),transparent_60%),radial-gradient(ellipse_at_50%_100%,rgba(34,229,255,0.15),transparent_55%)]"
          />

          <div className="relative mx-auto max-w-xl">
            <p className="text-xs font-medium uppercase tracking-widest text-glow">
              {data.sectionLabel}
            </p>
            <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight md:text-5xl">
              {data.title}
            </h2>
            <p className="mt-4 text-muted">{data.subtitle}</p>

            {status === "success" ? (
              <div
                role="status"
                className="mt-10 flex flex-col items-center gap-3"
              >
                <CheckCircle2 size={40} className="text-glow" />
                <p className="font-display text-2xl font-semibold">
                  {data.successTitle}
                </p>
                <p className="text-muted">{data.successMessage}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="mt-10">
                <label htmlFor="newsletter-email" className="sr-only">
                  {data.emailLabel}
                </label>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <input
                    id="newsletter-email"
                    type="email"
                    name="email"
                    autoComplete="email"
                    inputMode="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (status === "error") {
                        setStatus("idle");
                        setMessage(null);
                      }
                    }}
                    placeholder={data.emailPlaceholder}
                    aria-invalid={status === "error"}
                    aria-describedby="newsletter-feedback"
                    disabled={status === "submitting"}
                    className="h-14 flex-1 rounded-full border border-line bg-bg/60 px-6 text-ink outline-none transition-colors placeholder:text-muted focus:border-glow disabled:opacity-60"
                  />

                  {/* Bot trap: invisible to people, tempting to bots */}
                  <input
                    type="text"
                    name="website"
                    value={trap}
                    onChange={(e) => setTrap(e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    className="absolute -left-[9999px] h-0 w-0 opacity-0"
                  />

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-brand px-8 font-medium text-white transition-transform hover:scale-105 disabled:scale-100 disabled:opacity-70"
                  >
                    {status === "submitting" ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        {data.submittingLabel}
                      </>
                    ) : (
                      <>
                        {data.submitLabel}
                        <ArrowRight size={18} />
                      </>
                    )}
                  </button>
                </div>

                <p
                  id="newsletter-feedback"
                  role="alert"
                  className="mt-3 min-h-5 text-sm text-cta"
                >
                  {message}
                </p>

                <p className="mt-2 text-xs text-muted">
                  {data.consentNote}{" "}
                  <Link
                    href={data.privacyLink.href}
                    className="underline underline-offset-2 transition-colors hover:text-glow"
                  >
                    {data.privacyLink.label}
                  </Link>
                </p>
              </form>
            )}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
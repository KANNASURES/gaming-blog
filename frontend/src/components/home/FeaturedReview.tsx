import Image from "next/image";
import Link from "next/link";
import { Check, X, ArrowUpRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import type { FeaturedReviewContent } from "@/types/home";

export default function FeaturedReview({ data }: { data: FeaturedReviewContent }) {
  return (
    <section className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
      <Reveal>
        <p className="text-xs font-medium uppercase tracking-widest text-glow">
          {data.sectionLabel}
        </p>
      </Reveal>

      <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-14">
        {/* Media */}
        <Reveal delay={100}>
          <div className="relative aspect-video overflow-hidden rounded-3xl border border-line bg-surface-2">
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_30%,rgba(124,92,255,0.4),transparent_60%)]"
            />
            {data.image.src && (
              <Image
                src={data.image.src}
                alt={data.image.alt}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            )}
            <div className="absolute left-4 top-4 rounded-full border border-line bg-bg/70 px-3 py-1 text-xs backdrop-blur">
              {data.genre} · {data.platform}
            </div>
          </div>
        </Reveal>

        {/* Content */}
        <div className="flex flex-col justify-center">
          <Reveal delay={200}>
            <div className="flex items-start justify-between gap-6">
              <h2 className="font-display text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
                {data.title}
              </h2>
              <div
                aria-label={`Score ${data.score} out of 10`}
                className="grid h-20 w-20 shrink-0 place-items-center rounded-full border-2 border-glow font-display text-2xl font-semibold text-glow"
              >
                {data.score.toFixed(1)}
              </div>
            </div>
          </Reveal>

          <Reveal delay={300}>
            <p className="mt-6 text-base text-muted md:text-lg">{data.verdict}</p>
          </Reveal>

          <Reveal delay={400}>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <ul className="flex flex-col gap-3">
                {data.pros.map((item) => (
                  <li key={item} className="flex gap-3 text-sm">
                    <Check size={18} className="mt-0.5 shrink-0 text-glow" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <ul className="flex flex-col gap-3">
                {data.cons.map((item) => (
                  <li key={item} className="flex gap-3 text-sm text-muted">
                    <X size={18} className="mt-0.5 shrink-0 text-cta" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={500}>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href={data.reviewHref}
                className="inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3.5 font-medium text-white transition-transform hover:scale-105"
              >
                {data.reviewCtaLabel}
                <ArrowUpRight size={18} />
              </Link>

              <a
                href={data.affiliate.url}
                target="_blank"
                rel="sponsored nofollow noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-cta px-7 py-3.5 font-medium text-white transition-transform hover:scale-105"
              >
                {data.affiliate.label}
                <ArrowUpRight size={18} />
              </a>
            </div>
            <p className="mt-3 text-xs text-muted">
              Sponsored link · {data.affiliate.merchant}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
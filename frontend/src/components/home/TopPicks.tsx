import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check, Star } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import TiltCard from "@/components/ui/TiltCard";
import type { TopPicksContent } from "@/types/home";

export default function TopPicks({ data }: { data: TopPicksContent }) {
  return (
    <section className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
      <Reveal>
        <p className="text-xs font-medium uppercase tracking-widest text-glow">
          {data.sectionLabel}
        </p>
        <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight md:text-5xl">
          {data.title}
        </h2>
        <p className="mt-4 max-w-xl text-muted">{data.subtitle}</p>
        <p className="mt-4 max-w-xl text-xs text-muted">{data.disclosure}</p>
      </Reveal>

      <div className="mt-12 grid items-stretch gap-6 lg:grid-cols-3">
        {data.items.map((item, index) => (
          <Reveal key={item.id} delay={index * 120} className="h-full">
            <TiltCard className="h-full" maxTilt={5}>
              <article
                className={`relative flex h-full flex-col overflow-hidden rounded-3xl border bg-surface ${
                  item.highlight
                    ? "border-brand shadow-[0_0_60px_-15px_rgba(124,92,255,0.6)]"
                    : "border-line"
                }`}
              >
                <div className="relative aspect-[4/3] bg-surface-2">
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(124,92,255,0.4),transparent_65%)]"
                  />
                  {item.image.src && (
                    <Image
                      src={item.image.src}
                      alt={item.image.alt}
                      fill
                      sizes="(min-width: 1024px) 33vw, 100vw"
                      className="object-contain p-8"
                    />
                  )}
                  <span className="absolute left-4 top-4 font-display text-5xl font-semibold text-line">
                    {item.rank}
                  </span>
                  {item.badge && (
                    <span className="absolute right-4 top-4 rounded-full bg-brand px-3 py-1 text-xs font-medium text-white">
                      {item.badge}
                    </span>
                  )}
                </div>

                <div className="flex flex-1 flex-col gap-5 p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-widest text-muted">
                        {item.category}
                      </p>
                      <h3 className="mt-1 font-display text-2xl font-semibold leading-snug">
                        {item.name}
                      </h3>
                    </div>
                    <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-line px-2.5 py-1 text-sm">
                      <Star size={14} className="text-glow" />
                      {item.rating.toFixed(1)}
                    </span>
                  </div>

                  <p className="text-sm text-muted">{item.summary}</p>

                  <ul className="flex flex-col gap-2.5">
                    {item.features.map((feature) => (
                      <li key={feature} className="flex gap-3 text-sm">
                        <Check size={16} className="mt-0.5 shrink-0 text-glow" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto flex flex-col gap-3 pt-2">
                    {item.priceLabel && (
                      <p className="font-display text-xl font-semibold">
                        {item.priceLabel}
                      </p>
                    )}
                    <a
                      href={item.buy.url}
                      target="_blank"
                      rel="sponsored nofollow noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-cta px-6 py-3.5 font-medium text-white transition-transform hover:scale-[1.03]"
                    >
                      {item.buy.label}
                      <ArrowUpRight size={18} />
                    </a>
                    <p className="text-center text-xs text-muted">
                      Sponsored link · {item.buy.merchant}
                    </p>
                    <Link
                      href={item.reviewHref}
                      className="text-center text-sm text-muted transition-colors hover:text-glow"
                    >
                                           {data.reviewLinkLabel}
                    </Link>
                  </div>
                </div>
              </article>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
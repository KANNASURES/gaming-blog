"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Clock, Star } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import type { LatestReviewsContent } from "@/types/home";

const ALL = "all";

const dateFormatter = new Intl.DateTimeFormat("en", {
  dateStyle: "medium",
  timeZone: "UTC",
});

export default function LatestReviews({ data }: { data: LatestReviewsContent }) {
  const [active, setActive] = useState<string>(ALL);

  const visible = useMemo(
    () =>
      active === ALL
        ? data.items
        : data.items.filter((item) => item.categoryId === active),
    [active, data.items],
  );

  const chips = [{ id: ALL, label: data.filterAllLabel }, ...data.filters];

  return (
    <section className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <Reveal>
          <p className="text-xs font-medium uppercase tracking-widest text-glow">
            {data.sectionLabel}
          </p>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight md:text-5xl">
            {data.title}
          </h2>
          <p className="mt-4 max-w-xl text-muted">{data.subtitle}</p>
        </Reveal>

        <Reveal delay={150}>
          <Link
            href={data.viewAll.href}
            className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-glow"
          >
            {data.viewAll.label}
            <ArrowUpRight size={16} />
          </Link>
        </Reveal>
      </div>

      <Reveal delay={100}>
        <div
          role="group"
          aria-label="Filter reviews by genre"
          className="mt-10 flex gap-3 overflow-x-auto pb-2"
        >
          {chips.map((chip) => {
            const selected = chip.id === active;
            return (
              <button
                key={chip.id}
                type="button"
                aria-pressed={selected}
                onClick={() => setActive(chip.id)}
                className={`shrink-0 rounded-full border px-5 py-2 text-sm transition-colors ${
                  selected
                    ? "border-brand bg-brand text-white"
                    : "border-line text-muted hover:border-glow hover:text-ink"
                }`}
              >
                {chip.label}
              </button>
            );
          })}
        </div>
      </Reveal>

      {visible.length === 0 ? (
        <p className="mt-12 text-muted">{data.emptyLabel}</p>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((item, index) => (
            <article
              key={`${active}-${item.id}`}
              className="card-in"
              style={{ ["--delay" as string]: `${index * 70}ms` }}
            >
              <Link
                href={item.href}
                className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-surface transition-colors hover:border-brand"
              >
                <div className="relative aspect-video overflow-hidden bg-surface-2">
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_30%,rgba(124,92,255,0.4),transparent_65%)]"
                  />
                  {item.image.src && (
                    <Image
                      src={item.image.src}
                      alt={item.image.alt}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                  <span className="absolute left-3 top-3 rounded-full border border-line bg-bg/70 px-3 py-1 text-xs backdrop-blur">
                    {item.categoryLabel}
                  </span>
                  <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-bg/70 px-2.5 py-1 text-xs backdrop-blur">
                    <Star size={12} className="text-glow" />
                    {item.score.toFixed(1)}
                  </span>
                </div>

                <div className="flex flex-1 flex-col gap-3 p-6">
                  <h3 className="font-display text-xl font-semibold leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted">{item.excerpt}</p>

                  <div className="mt-auto flex items-center justify-between pt-3 text-xs text-muted">
                    <span>
                      {item.author} ·{" "}
                      <time dateTime={item.publishedAt}>
                        {dateFormatter.format(new Date(item.publishedAt))}
                      </time>
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Clock size={12} />
                      {item.readMinutes} {data.readTimeSuffix}
                    </span>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
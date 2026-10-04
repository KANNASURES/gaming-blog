import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Star } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import TiltCard from "@/components/ui/TiltCard";
import type { TrendingGamesContent } from "@/types/home";

export default function TrendingGames({ data }: { data: TrendingGamesContent }) {
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

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {data.games.map((game, index) => (
          <Reveal key={game.id} delay={index * 100}>
            <TiltCard className="h-full">
              <Link
                href={game.href}
                className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-surface transition-colors hover:border-brand"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-surface-2">
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_30%,rgba(124,92,255,0.45),transparent_65%)]"
                  />
                  {game.image.src && (
                    <Image
                      src={game.image.src}
                      alt={game.image.alt}
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}

                  {game.badge && (
                    <span className="absolute left-3 top-3 rounded-full bg-brand px-3 py-1 text-xs font-medium text-white">
                      {game.badge}
                    </span>
                  )}

                  <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full border border-line bg-bg/70 px-2.5 py-1 text-xs backdrop-blur">
                    <Star size={12} className="text-glow" />
                    {game.rating.toFixed(1)}
                  </span>
                </div>

                <div className="flex flex-1 flex-col gap-3 p-5">
                  <div>
                    <h3 className="font-display text-xl font-semibold leading-snug">
                      {game.title}
                    </h3>
                    <p className="mt-1 text-sm text-muted">{game.genre}</p>
                  </div>

                  <ul className="mt-auto flex flex-wrap gap-2">
                    {game.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full border border-line px-2.5 py-1 text-xs text-muted"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>

                <div
                  aria-hidden="true"
                  className="tilt-glare pointer-events-none absolute inset-0"
                />
              </Link>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
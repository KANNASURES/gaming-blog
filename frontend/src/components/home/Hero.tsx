import Link from "next/link";
import { ChevronDown } from "lucide-react";
import type { HeroContent } from "@/types/home";

export default function Hero({ data }: { data: HeroContent }) {
  return (
    <section className="relative isolate flex min-h-screen items-center overflow-hidden">
      {/* Layer 1: fallback glow (visible if the video is missing or slow) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-30 bg-[radial-gradient(ellipse_at_30%_20%,rgba(124,92,255,0.35),transparent_55%),radial-gradient(ellipse_at_80%_70%,rgba(34,229,255,0.18),transparent_50%)]"
      />

      {/* Layer 2: video */}
      <video
        className="absolute inset-0 -z-20 h-full w-full object-cover"
        src={data.video.src}
        poster={data.video.poster ?? undefined}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
      />

      {/* Layer 3: dark overlay so text stays readable */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-b from-bg/70 via-bg/55 to-bg"
      />

      <div className="mx-auto w-full max-w-7xl px-5 pb-24 pt-32 md:px-8">
        <p
          className="reveal inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-glow backdrop-blur"
          style={{ ["--delay" as string]: "1500ms" }}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-glow" />
          {data.eyebrow}
        </p>

        <h1
          className="reveal mt-6 max-w-4xl font-display text-5xl font-semibold leading-[1.05] tracking-tight md:text-7xl lg:text-8xl"
          style={{ ["--delay" as string]: "1650ms" }}
        >
          {data.headlineLead}{" "}
          <span className="bg-gradient-to-r from-brand to-glow bg-clip-text text-transparent">
            {data.headlineHighlight}
          </span>
        </h1>

        <p
          className="reveal mt-6 max-w-xl text-base text-muted md:text-lg"
          style={{ ["--delay" as string]: "1800ms" }}
        >
          {data.subtext}
        </p>

        <div
          className="reveal mt-10 flex flex-wrap gap-4"
          style={{ ["--delay" as string]: "1950ms" }}
        >
          <Link
            href={data.primaryCta.href}
            className="rounded-full bg-brand px-7 py-3.5 font-medium text-white transition-transform hover:scale-105"
          >
            {data.primaryCta.label}
          </Link>
          <Link
            href={data.secondaryCta.href}
            className="rounded-full border border-line bg-surface/50 px-7 py-3.5 font-medium backdrop-blur transition-colors hover:border-glow hover:text-glow"
          >
            {data.secondaryCta.label}
          </Link>
        </div>

        <dl
          className="reveal mt-16 flex flex-wrap gap-x-12 gap-y-6"
          style={{ ["--delay" as string]: "2100ms" }}
        >
          {data.stats.map((stat) => (
            <div key={stat.label}>
              <dt className="font-display text-3xl font-semibold">
                {stat.value}
              </dt>
              <dd className="mt-1 text-sm text-muted">{stat.label}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div
        aria-hidden="true"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-muted"
      >
        <ChevronDown size={28} />
      </div>
    </section>
  );
}
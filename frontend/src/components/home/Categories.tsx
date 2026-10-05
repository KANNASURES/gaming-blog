import {
  Swords,
  Crosshair,
  Car,
  Puzzle,
  WifiOff,
  Gamepad2,
  Layers,
  type LucideIcon,
} from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SpotlightLink from "@/components/ui/SpotlightLink";
import type { CategoriesContent } from "@/types/home";

const ICONS: Record<string, LucideIcon> = {
  swords: Swords,
  crosshair: Crosshair,
  car: Car,
  puzzle: Puzzle,
  "wifi-off": WifiOff,
  gamepad: Gamepad2,
};

export default function Categories({ data }: { data: CategoriesContent }) {
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
      </Reveal>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {data.items.map((item, index) => {
          const Icon = ICONS[item.icon] ?? Layers;

          return (
            <Reveal key={item.id} delay={index * 80}>
              <SpotlightLink
                href={item.href}
                className="group flex h-full flex-col gap-6 overflow-hidden rounded-3xl border border-line bg-surface p-7 transition-colors hover:border-brand"
              >
                <div className="grid h-12 w-12 place-items-center rounded-2xl border border-line bg-surface-2 text-glow transition-transform duration-300 group-hover:scale-110">
                  <Icon size={22} />
                </div>

                <div>
                  <h3 className="font-display text-2xl font-semibold">
                    {item.name}
                  </h3>
                  <p className="mt-2 text-sm text-muted">{item.description}</p>
                </div>

                <p className="mt-auto text-xs uppercase tracking-widest text-muted">
                  {item.gameCount} {data.countSuffix}
                </p>
              </SpotlightLink>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 p-8">
      <h1 className="font-display text-6xl font-semibold tracking-tight">
        Design system test
      </h1>
      <p className="font-body text-muted max-w-md text-center">
        If this heading looks bold and geometric and this text looks clean,
        the fonts are loaded.
      </p>
      <div className="flex gap-3">
        <span className="rounded-full bg-brand px-5 py-2">Brand</span>
        <span className="rounded-full bg-glow px-5 py-2 text-bg">Glow</span>
        <span className="rounded-full bg-cta px-5 py-2">Affiliate CTA</span>
      </div>
    </main>
  );
}
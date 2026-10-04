export default function Home() {
  return (
    <div className="mx-auto max-w-3xl px-5 pt-40">
      <h1 className="font-display text-5xl font-semibold">Layout shell test</h1>
      <p className="mt-6 text-muted">
        Scroll down. The navbar should turn into a blurred glass bar.
      </p>
      <div className="mt-10 h-[150vh] rounded-2xl border border-line bg-surface" />
    </div>
  );
}
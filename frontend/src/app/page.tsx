import { getHomeContent } from "@/services/home-service";
import Hero from "@/components/home/Hero";

export default async function Home() {
  const home = await getHomeContent();

  return <Hero data={home.hero} />;
}
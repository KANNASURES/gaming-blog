import { getHomeContent } from "@/services/home-service";
import Hero from "@/components/home/Hero";
import FeaturedReview from "@/components/home/FeaturedReview";

export default async function Home() {
  const home = await getHomeContent();

  return (
    <>
      <Hero data={home.hero} />
      <FeaturedReview data={home.featuredReview} />
    </>
  );
}
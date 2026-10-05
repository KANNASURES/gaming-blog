import { getHomeContent } from "@/services/home-service";
import Hero from "@/components/home/Hero";
import FeaturedReview from "@/components/home/FeaturedReview";
import TrendingGames from "@/components/home/TrendingGames";
import Categories from "@/components/home/Categories";
import TopPicks from "@/components/home/TopPicks";

export default async function Home() {
  const home = await getHomeContent();

  return (
    <>
      <Hero data={home.hero} />
      <FeaturedReview data={home.featuredReview} />
      <TrendingGames data={home.trendingGames} />
      <Categories data={home.categories} />
      <TopPicks data={home.topPicks} />
    </>
  );
}
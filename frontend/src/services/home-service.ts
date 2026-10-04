import mock from "@/mocks/home.json";
import type { HomeContent } from "@/types/home";

export async function getHomeContent(): Promise<HomeContent> {
  // Phase 8: replace with an Axios call to GET /api/v1/home
  return mock as HomeContent;
}
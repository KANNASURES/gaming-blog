import mock from "@/mocks/site-settings.json";
import type { SiteSettings } from "@/types/site";

export async function getSiteSettings(): Promise<SiteSettings> {
  // Phase 8: replace this with an Axios call to GET /api/v1/site-settings
  return mock as SiteSettings;
}
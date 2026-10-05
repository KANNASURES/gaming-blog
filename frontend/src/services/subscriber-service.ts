export interface SubscribeResult {
  ok: boolean;
}

export async function subscribe(email: string): Promise<SubscribeResult> {
  // Phase 8: replace with an Axios call to POST /api/v1/subscribers
  await new Promise((resolve) => setTimeout(resolve, 900));
  console.info("Mock subscribe:", email);
  return { ok: true };
}
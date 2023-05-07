import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  apiVersion: "2023-05-07",
  dataset: "production",
  useCdn: false,
  token: import.meta.env.VITE_SANITY_TOKEN,
});

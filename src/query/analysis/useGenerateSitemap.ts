import { Sitemap } from "./types";

import request from "@/utils/request";

export const generateSitemap = (metricsId: string) => {
  return request<Sitemap>({
    method: "POST",
    url: "/sitemap/generate",
    data: {
      metricsId: metricsId,
    },
  });
};

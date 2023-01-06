import { AnalysisSiteResponse } from "./types";

import request from "@/utils/request";

export const analysisSite = (organizationId: string, siteUrl: string) => {
  return request<AnalysisSiteResponse>({
    method: "POST",
    url: "/analysis/site",
    data: {
      organizationId: organizationId,
      siteUrl: siteUrl,
    },
  });
};

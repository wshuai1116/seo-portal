
import request from "@/utils/request";

export const analysisCompetitor = (organizationId: string, competitorId: string) => {
  return request({
    method: "POST",
    url: "/competitor/analysis",
    data: {
      organizationId: organizationId,
      competitorId: competitorId,
    },
  });
};

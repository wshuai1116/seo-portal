import { createSimpleQueryHook } from "@/query/utils";
import { Competitor } from "./types";

import request from "@/utils/request";

export const Key = "getDuplicatedCompetive";

export const getDuplicatedCompetitor = (organizationId: string, siteUrl: string) => {
  return request<Competitor>({
    method: "GET",
    url: "/competitor/duplicated",
    data: {
      organizationId: organizationId,
      siteUrl: siteUrl,
    },
  });
};

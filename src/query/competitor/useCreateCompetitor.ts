import { createSimpleMutationHook, createSimpleQueryHook } from "@/query/utils";
import { Competitor } from "./types";

import request from "@/utils/request";

export const Key = "createCompetitor";

const createCompetitor = ({ organizationId, siteUrl }: { organizationId: string, siteUrl: string }) => {
  return request<Competitor>({
    method: "POST",
    url: "/competitor/create",
    data: {
      organizationId: organizationId,
      siteUrl: siteUrl,
    },
  });
};

export const useCreateCompetitor = createSimpleMutationHook(
  createCompetitor,
  (_, client) => {
    client.invalidateQueries("listCompetitors");
  }
);

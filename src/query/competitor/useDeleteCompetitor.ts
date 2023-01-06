import { createSimpleMutationHook } from "@/query/utils";

import request from "@/utils/request";

export const Key = "deleteCompetitor";

const deleteCompetitor = ({ organizationId, competitorId }: { organizationId: string, competitorId: string }) => {
  return request({
    method: "DELETE",
    url: "/competitor/delete",
    data: {
      organizationId: organizationId,
      competitorId: competitorId,
    },
  });
};

export const useDeleteCompetitor = createSimpleMutationHook(
  deleteCompetitor,
  (_, client) => {
    client.invalidateQueries("listCompetitors");
  }
);

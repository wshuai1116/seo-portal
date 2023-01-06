import { createSimpleQueryHook } from "@/query/utils";
import { Competitor, CompetitorPaginationResult } from "./types";

import request from "@/utils/request";

export const Key = "listCompetitors";

const listCompetitors = ({
  organizationId,
  pageNum,
  pageSize,
}: {
  organizationId: string;
  pageNum: number;
  pageSize: number;
}) => {
  return request<CompetitorPaginationResult>({
    method: "GET",
    url: "/competitor/list",
    data: {
      organizationId: organizationId,
      pageNum: pageNum,
      pageSize: pageSize,
    },
  });
};

export const useListCompetitors = createSimpleQueryHook(
  listCompetitors,
  () => Key
);

import { createSimpleQueryHook } from "@/query/utils";
import { ProjectPaginationResult } from "./types";

import request from "@/utils/request";

export const Key = "listProjects";

export const listProjects = ({
  organizationId,
  pageNum,
  pageSize,
}: {
  organizationId?: string;
  pageNum: number;
  pageSize: number;
}) => {
  return request<ProjectPaginationResult>({
    method: "GET",
    url: "/project/list",
    data: {
      organizationId: organizationId,
      pageNum: pageNum,
      pageSize: pageSize,
    },
  });
};


export const useListProjects = createSimpleQueryHook(
  listProjects,
  () => Key,
  (options) => !!options.organizationId
);


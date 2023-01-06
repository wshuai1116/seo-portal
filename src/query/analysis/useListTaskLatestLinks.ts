import { createSimpleQueryHook } from "@/query/utils";
import { TaskLinkPaginationResult } from "./types";

import request from "@/utils/request";

export const Key = "listTaskLatestLinks";

const listTaskLatestLinks = ({
  projectId,
  filterKey,
  pageNum,
  pageSize,
}: {
  projectId?: string;
  filterKey?: string;
  pageNum: number;
  pageSize: number;
}) => {
  return request<TaskLinkPaginationResult>({
    method: "GET",
    url: "/task/link/latest",
    data: {
      projectId: projectId,
      filterKey: filterKey,
      pageNum: pageNum,
      pageSize: pageSize,
    },
  });
};

export const useListTaskLatestLinks = createSimpleQueryHook(
  listTaskLatestLinks,
  () => Key,
  (options) => !!options
);

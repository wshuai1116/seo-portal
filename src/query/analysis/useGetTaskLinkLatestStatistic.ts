import { createSimpleQueryHook } from "@/query/utils";
import { TaskLinkStatistic } from "./types";

import request from "@/utils/request";

export const Key = "getTaskLinkLatestStatistic";

const getTaskLinkLatestStatistic = (projectId?: string) => {
  return request<TaskLinkStatistic>({
    method: "GET",
    url: "/task/link/statistic/latest",
    data: {
      projectId: projectId,
    },
  });
};

export const useGetTaskLinkLatestStatistic = createSimpleQueryHook(
  getTaskLinkLatestStatistic,
  () => Key,
  (options) => !!options
);

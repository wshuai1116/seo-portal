import { createSimpleQueryHook } from "@/query/utils";
import { TaskSummary } from "./types";

import request from "@/utils/request";

export const Key = "getLatestTask";

const getLatestTask = (projectId?: string) => {
  return request<TaskSummary>({
    method: "GET",
    url: "/task/latest",
    data: {
      projectId: projectId,
    },
  });
};

export const useGetLatestTask = createSimpleQueryHook(
  getLatestTask,
  () => Key,
  (options) => !!options
);

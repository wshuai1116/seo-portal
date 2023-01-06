import { createSimpleQueryHook } from "@/query/utils";
import { TaskSummary } from "./types";

import request from "@/utils/request";

export const Key = "getTaskSummary";

export const getTaskSummary = (taskId: string) => {
  if (taskId) {
    return request<TaskSummary>({
      method: "GET",
      url: "/task/summary",
      data: {
        taskId: taskId
      },
    });
  } else {
    return request<TaskSummary>({
      method: "GET",
      url: "/task/latest",
      data: {
      },
    });
  }
};


export const useGetTaskSummary = createSimpleQueryHook(
  getTaskSummary,
  () => Key
);


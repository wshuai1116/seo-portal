import { createSimpleQueryHook } from "@/query/utils";
import { TaskProgress } from "./types";

import request from "@/utils/request";
import { useEffectOnceWhen } from "rooks";

export const Key = "getTaskProgress";

export const getTaskProgress = (taskId: string) => {
  return request<TaskProgress>({
    method: "GET",
    url: "/analysis/progress",
    data: {
      taskId: taskId
    },
  });
};


export const useGetTaskProgress = createSimpleQueryHook(
  getTaskProgress,
  () => Key
);


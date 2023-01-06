import { createSimpleQueryHook } from "@/query/utils";
import { TaskLink } from "./types";

import request from "@/utils/request";

export const Key = "getTaskLinkDetail";

const getTaskLinkDetail = ({
  taskId,
  url,
}: {
  taskId?: string;
  url?: string;
}) => {
  return request<TaskLink>({
    method: "GET",
    url: "/task/link/detail",
    data: {
      taskId: taskId,
      url: url,
    },
  });
};

export const useGetTaskLinkDetail = createSimpleQueryHook(
  getTaskLinkDetail,
  () => Key,
  (options) => !!options.taskId && !!options.url
);

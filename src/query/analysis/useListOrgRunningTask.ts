import { createSimpleQueryHook } from "@/query/utils";
import { TaskProgress } from "./types";

import request from "@/utils/request";

export const Key = "listOrgRunningTask";

export const listOrgRunningTask = (organizationId?: string) => {
  return request<[TaskProgress]>({
    method: "GET",
    url: "/task/running/org",
    data: {
      organizationId: organizationId
    },
  });
};

export const useListOrgRunningTask = createSimpleQueryHook(
  listOrgRunningTask,
  () => Key,
  (options) => !!options
);


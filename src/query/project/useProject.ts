import { createSimpleQueryHook } from "@/query/utils";
import { Project } from "./types";

import request from "@/utils/request";

export const Key = "getProject";

const getProject = (projectId?: string) => {
  return request<Project>({
    method: "GET",
    url: "/project/detail",
    data: {
      projectId: projectId,
    },
  });
};

export const useProject = createSimpleQueryHook(
  getProject,
  () => Key,
  (options) => !!options
);

import { createSimpleQueryHook } from "@/query/utils";
import { Project } from "./types";

import request from "@/utils/request";

export const Key = "getDuplicatedProject";

export const getDuplicatedProject = (organizationId: string, siteUrl: string) => {
  return request<Project>({
    method: "GET",
    url: "/project/duplicated",
    data: {
      organizationId: organizationId,
      siteUrl: siteUrl,
    },
  });
};

import { createSimpleMutationHook, createSimpleQueryHook } from "@/query/utils";
import { Project } from "./types";

import request from "@/utils/request";

export const Key = "createProject";

const createProject = ({ organizationId, siteUrl }: { organizationId: string, siteUrl: string }) => {
  return request<Project>({
    method: "POST",
    url: "/project/create",
    data: {
      organizationId: organizationId,
      siteUrl: siteUrl,
    },
  });
};

export const useCreateProject = createSimpleMutationHook(
  createProject,
  (_, client) => {
    client.invalidateQueries("listProjects");
  }
);

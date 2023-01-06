import { createSimpleMutationHook, createSimpleQueryHook } from "@/query/utils";
import { Project } from "./types";

import request from "@/utils/request";

export const Key = "deleteProject";

const deleteProject = ({ organizationId, projectId }: { organizationId: string, projectId: string }) => {
  return request({
    method: "DELETE",
    url: "/project/delete",
    data: {
      organizationId: organizationId,
      projectId: projectId,
    },
  });
};

export const useDeleteProject = createSimpleMutationHook(
  deleteProject,
  (_, client) => {
    client.invalidateQueries("listProjects");
    client.invalidateQueries("getProject");
  }
);

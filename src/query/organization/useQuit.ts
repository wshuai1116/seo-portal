import { createSimpleMutationHook } from "@/query/utils";

import request from "@/utils/request";

export const Key = "quit";

const quit = ({ organizationId }: { organizationId: string }) => {
  return request({
    method: "POST",
    url: "/organization/user/quit",
    data: {
      organizationId: organizationId,
    },
  });
};

export const useQuit = createSimpleMutationHook(
  quit,
  (_, client) => {
    client.invalidateQueries("listOrganizationUsers");
  }
);

import { createSimpleMutationHook } from "@/query/utils";

import request from "@/utils/request";

export const Key = "removeUser";

const removeUser = ({ organizationId, targetUid }: { organizationId: string, targetUid: string }) => {
  return request({
    method: "POST",
    url: "/organization/user/remove",
    data: {
      organizationId: organizationId,
      targetUid: targetUid,
    },
  });
};

export const useRemoveUser = createSimpleMutationHook(
  removeUser,
  (_, client) => {
    client.invalidateQueries("listOrganizationUsers");
  }
);

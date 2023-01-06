import { createSimpleMutationHook, createSimpleQueryHook } from "@/query/utils";

import request from "@/utils/request";

export const Key = "approveUser";

const approveUser = ({ organizationId, targetUid }: { organizationId: string, targetUid: string }) => {
  return request({
    method: "POST",
    url: "/organization/user/approve",
    data: {
      organizationId: organizationId,
      targetUid: targetUid,
    },
  });
};

export const useApproveUser = createSimpleMutationHook(
  approveUser,
  (_, client) => {
    client.invalidateQueries("listOrganizationUsers");
  }
);

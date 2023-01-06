import { createSimpleMutationHook } from "@/query/utils";

import request from "@/utils/request";

export const Key = "rejectUser";

const rejectUser = ({ organizationId, targetUid }: { organizationId: string, targetUid: string }) => {
  return request({
    method: "POST",
    url: "/organization/user/reject",
    data: {
      organizationId: organizationId,
      targetUid: targetUid,
    },
  });
};

export const useRejectUser = createSimpleMutationHook(
  rejectUser,
  (_, client) => {
    client.invalidateQueries("listOrganizationUsers");
  }
);

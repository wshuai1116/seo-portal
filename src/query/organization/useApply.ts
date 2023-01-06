import { createSimpleMutationHook, createSimpleQueryHook } from "@/query/utils";

import request from "@/utils/request";

export const Key = "apply";

const apply = ({ organizationId, inviteCode }: { organizationId: string, inviteCode: string }) => {
  return request({
    method: "POST",
    url: "/organization/user/apply",
    data: {
      organizationId: organizationId,
      inviteCode: inviteCode,
    },
  });
};

export const useApply = createSimpleMutationHook(
  apply,
  (_, client) => {
    client.invalidateQueries("listOrganizationUsers");
  }
);

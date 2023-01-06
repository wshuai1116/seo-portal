import { createSimpleMutationHook } from "@/query/utils";

import request from "@/utils/request";

export const Key = "disableInvite";

const disableInvite = ({ organizationId }: { organizationId: string }) => {
  return request({
    method: "POST",
    url: "/organization/invite/disable",
    data: {
      organizationId: organizationId,
    },
  });
};

export const useDisableInvite = createSimpleMutationHook(
  disableInvite,
  () => Key
);

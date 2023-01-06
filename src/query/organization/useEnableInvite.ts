import { createSimpleMutationHook } from "@/query/utils";

import request from "@/utils/request";
import { OrganizationInviteCode } from "./types";

export const Key = "enableInvite";

const enableInvite = ({ organizationId }: { organizationId: string }) => {
  return request<OrganizationInviteCode>({
    method: "POST",
    url: "/organization/invite/enable",
    data: {
      organizationId: organizationId,
    },
  });
};

export const useEnableInvite = createSimpleMutationHook(
  enableInvite,
  () => Key
);

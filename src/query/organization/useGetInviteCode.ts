import { createSimpleQueryHook } from "@/query/utils";
import { OrganizationInviteCode } from "./types";

import request from "@/utils/request";

export const Key = "getInviteCode";

const getInviteCode = (organizationId: string) => {
  return request<OrganizationInviteCode>({
    method: "GET",
    url: "/organization/invite/code",
    data: {
      organizationId: organizationId,
    },
  });
};


export const useGetInviteCode = createSimpleQueryHook(
  getInviteCode,
  () => Key
);


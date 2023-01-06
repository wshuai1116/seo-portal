import { createSimpleQueryHook } from "@/query/utils";
import { Organization, OrganizationUser } from "./types";

import request from "@/utils/request";

export const Key = "listOrganizationUsers";

const listOrganizationUsers = (organizationId: string) => {
  return request<[OrganizationUser]>({
    method: "GET",
    url: "/organization/user/list",
    data: {
      organizationId: organizationId
    },
  });
};


export const useListOrganizationUsers = createSimpleQueryHook(
  listOrganizationUsers,
  () => Key
);


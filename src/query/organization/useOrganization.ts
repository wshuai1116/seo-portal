import { createSimpleQueryHook } from "@/query/utils";
import { Organization } from "./types";

import request from "@/utils/request";

export const Key = "getOrganization";

const getOrganization = (organizationId?: string) => {
  return request<Organization>({
    method: "GET",
    url: "/organization/detail",
    data: {
      organizationId: organizationId,
    },
  });
};

export const useOrganization = createSimpleQueryHook(
  getOrganization,
  () => Key,
  (options) => !!options
);

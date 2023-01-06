import { createSimpleQueryHook } from "@/query/utils";
import { Organization } from "./types";

import request from "@/utils/request";

export const Key = "getOrganizationSimple";

const getOrganizationSimple = (organizationId: string) => {
  return request<Organization>({
    method: "GET",
    url: "/organization/simple",
    data: {
      organizationId: organizationId,
    },
  });
};

export const useGetOrganizationSimple = createSimpleQueryHook(
  getOrganizationSimple,
  () => Key
);

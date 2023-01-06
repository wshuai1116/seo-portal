import { createSimpleQueryHook } from "@/query/utils";
import { Organization } from "./types";

import request from "@/utils/request";

export const Key = "listOrganizations";

const listOrganizations = () => {
  return request<[Organization]>({
    method: "GET",
    url: "/organization/list",
    data: {
    },
  });
};


export const useListOrganizations = createSimpleQueryHook(
  listOrganizations,
  () => Key
);


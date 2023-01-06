import { createSimpleMutationHook, createSimpleQueryHook } from "@/query/utils";
import { ABTestGroup } from "./types";

import request from "@/utils/request";

export const Key = "getABTestGroups";

export const getABTestGroups = ({
}: {
  }) => {
  return request<[ABTestGroup]>({
    method: "GET",
    url: "/abtest/groups",
    data: {
    },
  });
};

export const useGetABTestGroups = createSimpleMutationHook(getABTestGroups, () => Key);

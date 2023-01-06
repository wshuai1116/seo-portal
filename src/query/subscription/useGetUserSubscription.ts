import { createSimpleQueryHook } from "@/query/utils";
import { UserSubscription } from "./types";

import request from "@/utils/request";

export const Key = "getUserSubscription";

const getUserSubscription = () => {
  return request<UserSubscription>({
    method: "GET",
    url: "/user/subscription",
    data: {},
  });
};

export const useGetUserSubscription = createSimpleQueryHook(
  getUserSubscription,
  () => Key
);

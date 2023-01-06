import { createSimpleQueryHook } from "@/query/utils";
import { OrderInfo, Period, PlanType, Subscription } from "./types";

import request from "@/utils/request";

export const Key = "subscriptionList";

const getSubscriptionList = ({
  period,
}: {
  period: string;
}) => {
  return request<[Subscription]>({
    method: "GET",
    url: "/subscription/list",
    data: {
      period,
    },
  });
};

export const useSubscriptionList = createSimpleQueryHook(getSubscriptionList, () => Key);

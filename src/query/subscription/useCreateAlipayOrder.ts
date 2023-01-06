import { createSimpleMutationHook } from "@/query/utils";
import { AlipayOrderInfo, Period, PlanType, Subscription } from "./types";

import request from "@/utils/request";

export const Key = "createAlipayOrder";

const createAlipayOrder = ({
  orderId,
}: {
  orderId: string;
}) => {
  return request<AlipayOrderInfo>({
    method: "POST",
    url: "/order/create/alipay",
    data: {
      orderId,
    },
  });
};

export const useCreateAlipayOrder = createSimpleMutationHook(createAlipayOrder, () => Key);

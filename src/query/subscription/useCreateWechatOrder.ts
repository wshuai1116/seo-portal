import { createSimpleMutationHook } from "@/query/utils";
import { WechatOrderInfo, Period, PlanType, Subscription } from "./types";

import request from "@/utils/request";

export const Key = "createWechatOrder";

const createWechatOrder = ({
  orderId,
}: {
  orderId: string;
}) => {
  return request<WechatOrderInfo>({
    method: "POST",
    url: "/order/create/wechat",
    data: {
      orderId,
    },
  });
};

export const useCreateWechatOrder = createSimpleMutationHook(createWechatOrder, () => Key);

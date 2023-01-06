import { createSimpleMutationHook } from "@/query/utils";
import { OrderInfo, Period, PlanType, Subscription } from "./types";

import request from "@/utils/request";

export const Key = "createOrder";

const createOrder = ({
  commodityId,
}: {
  commodityId: string;
}) => {
  return request<OrderInfo>({
    method: "POST",
    url: "/order/create",
    data: {
      commodityId,
    },
  });
};

export const useCreateOrder = createSimpleMutationHook(createOrder, () => Key);

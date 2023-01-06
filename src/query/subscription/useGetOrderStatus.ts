import { createSimpleQueryHook } from "@/query/utils";
import { OrderInfo, Period, PlanType, Subscription } from "./types";

import request from "@/utils/request";

export const Key = "getOrderStatus";

export const getOrderStatus = ({ orderId }: { orderId: string }) => {
  return request<OrderInfo>({
    method: "GET",
    url: "/order/status",
    data: {
      orderId,
    },
  });
};

export const useGetOrderStatus = createSimpleQueryHook(
  getOrderStatus,
  () => Key
);

import { createSimpleQueryHook } from "@/query/utils";
import { AnalysisItem } from "./types";

import request from "@/utils/request";

export const Key = "listMetricsItem";

export const listMetricsItem = ({
  taskId,
  url,
  metricsCategory,
}: {
  taskId: string;
  url: string;
  metricsCategory: string;
}) => {
  return request<[AnalysisItem]>({
    method: "GET",
    url: "/task/metrics/item/list",
    data: {
      taskId: taskId,
      url: url,
      metricsCategory: metricsCategory,
    },
  });
};

export const useListMetricsItem = createSimpleQueryHook(
  listMetricsItem,
  () => Key
);


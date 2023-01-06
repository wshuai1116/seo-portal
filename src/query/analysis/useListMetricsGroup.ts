import { createSimpleQueryHook } from "@/query/utils";
import { AnalysisMetricsGroup } from "./types";

import request from "@/utils/request";

export const Key = "listMetricsGroup";

export const listMetricsGroup = ({
  taskId,
  analysisCategory,
  passStatus,
}: {
  taskId: string;
  analysisCategory?: string;
  passStatus?: string;
}) => {
  return request<[AnalysisMetricsGroup]>({
    method: "GET",
    url: "/task/metrics/group/list",
    data: {
      taskId: taskId,
      analysisCategory: analysisCategory,
      passStatus: passStatus,
    },
  });
};

export const useListMetricsGroup = createSimpleQueryHook(
  listMetricsGroup,
  () => Key
);


import { createSimpleQueryHook } from "@/query/utils";
import { AnalysisPagePaginationResult } from "./types";

import request from "@/utils/request";

export const Key = "listAnalysisPages";

export const listAnalysisPages = ({
  taskId,
  analysisCategory,
  metricsCategory,
  passStatus,
  pageNum,
  pageSize,
}: {
  taskId: string;
  analysisCategory?: string;
  metricsCategory?: string;
  passStatus?: string;
  pageNum: number;
  pageSize: number;
}) => {
  return request<AnalysisPagePaginationResult>({
    method: "GET",
    url: "/task/page/list",
    data: {
      taskId: taskId,
      analysisCategory: analysisCategory,
      metricsCategory: metricsCategory,
      passStatus: passStatus,
      pageNum: pageNum,
      pageSize: pageSize,
    },
  });
};


export const useListAnalysisPage = createSimpleQueryHook(
  listAnalysisPages,
  () => Key
);


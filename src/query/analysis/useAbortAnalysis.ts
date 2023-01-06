
import request from "@/utils/request";

export const abortAnalysis = (taskId: string) => {
  return request({
    method: "POST",
    url: "/analysis/abort",
    data: {
      taskId: taskId,
    },
  });
};

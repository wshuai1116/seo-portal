import { RobotsTxt } from "./types";

import request from "@/utils/request";

export const generateRobotsTxt = (metricsId: string) => {
  return request<RobotsTxt>({
    method: "POST",
    url: "/robotstxt/generate",
    data: {
      metricsId: metricsId,
    },
  });
};

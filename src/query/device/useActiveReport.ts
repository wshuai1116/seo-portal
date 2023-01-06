import { createSimpleMutationHook } from "@/query/utils";

import request from "@/utils/request";
import { getUser } from "@/utils/auth";

export const Key = "activeReport";

const activeReport = ({
}: {
}) => {
  return request({
    method: "POST",
    url: "/device/active/report",
    data: {
      uid: getUser()?.uid,
    },
  });
};

export const useActiveReport = createSimpleMutationHook(activeReport, () => Key);

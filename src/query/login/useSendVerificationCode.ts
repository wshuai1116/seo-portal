import request from "@/utils/request";
import { createSimpleMutationHook } from "../utils";

const sendVerificationCode = (data:
  | {
    target: string;
    isoCode: string;
    messageType: 1;
  }
  | {
    target: string;
    messageType: 2;
  }) => {
  return request({
    url: "/verification/code/login",
    method: "post",
    data: {
      ...data,
    },
  });
};

export const useSendVerificationCode = createSimpleMutationHook(sendVerificationCode);

export default useSendVerificationCode;

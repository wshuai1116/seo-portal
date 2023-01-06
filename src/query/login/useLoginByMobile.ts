import request from "@/utils/request";
import { createLoginMutation } from "./utils";
import { LoginResult } from "./types";

const loginByMobile = (data: {
  mobileNo: string;
  isoCode: string;
  verificationCode: string;
}) => {
  if (!Number.isInteger(data.isoCode)) {
    data.isoCode = data.isoCode.replace("+", "");
  }

  return request<LoginResult>({
    url: "/user/auth/mobile",
    method: "post",
    data: {
      ...data,
    },
  });
};

export const useLoginByMobile = createLoginMutation(loginByMobile);

export default useLoginByMobile;

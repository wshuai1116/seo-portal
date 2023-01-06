import request from "@/utils/request";
import { createLoginMutation } from "./utils";
import { LoginResult } from "./types";

const loginByWechat = (data: {
  code: string;
}) => {

  return request<LoginResult>({
    url: "/user/auth/wechat/web",
    method: "post",
    data: {
      ...data,
    },
  });
};

export const useLoginByWechat = createLoginMutation(loginByWechat);

export default useLoginByWechat;

import request from "@/utils/request";
import { createLoginMutation } from "./utils";
import { LoginResult } from "./types";

const loginByWechatMp = (data: {
  code: string;
}) => {

  return request<LoginResult>({
    url: "/user/auth/wechat/mp",
    method: "post",
    data: {
      ...data,
    },
  });
};

export const useLoginByWechatMp = createLoginMutation(loginByWechatMp);

export default useLoginByWechatMp;

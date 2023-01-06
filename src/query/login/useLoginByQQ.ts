import request from "@/utils/request";
import { createLoginMutation } from "./utils";
import { LoginResult } from "./types";

const loginByQQ = (data: {
  code: string;
  redirectUri: string;
}) => {

  return request<LoginResult>({
    url: "/user/auth/qq/web",
    method: "post",
    data: {
      ...data,
    },
  });
};

export const useLoginByQQ = createLoginMutation(loginByQQ);

export default useLoginByQQ;

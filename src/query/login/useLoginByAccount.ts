import request from "@/utils/request";
import { LoginResult } from "./types";
import { createLoginMutation } from "./utils";

const loginByAccount = (data: { authAccount: string; password: string }) => {
  return request<LoginResult>({
    url: "/user/auth/account",
    method: "post",
    data: {
      ...data,
    },
  });
};

export const useLoginByAccount = createLoginMutation(loginByAccount);

export default useLoginByAccount;

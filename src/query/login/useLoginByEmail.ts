import request from "@/utils/request";
import { createLoginMutation } from "./utils";
import { LoginResult } from "./types";

const loginByEmail = (data: { email: string; verificationCode: string }) => {
  return request<LoginResult>({
    url: "/user/auth/email",
    method: "post",
    data: {
      ...data,
    },
  });
};

export const useLoginByEmail = createLoginMutation(loginByEmail);

export default useLoginByEmail;

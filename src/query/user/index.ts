import { isLogin } from "@/utils/auth";
import request from "@/utils/request";
import { createSimpleQueryHook, createSimpleMutationHook } from "../utils";
import { User } from "./types";

export const UserInfoKey = "userInfo";

const getUserInfo = (options?: { isLogin: boolean }) => {
  return request<User>({
    url: "/user/info",
    method: "GET",
  });
};

export const useUserInfo = createSimpleQueryHook(
  getUserInfo,
  () => UserInfoKey,
  () => !!isLogin()
);

const updateUserInfo = (data: { avatar?: string; nickname: string }) => {
  return request<User>({
    url: "/user/info/update",
    method: "POST",
    data: data,
  });
};

export const useUpdateUserInfo = createSimpleMutationHook(
  updateUserInfo,
  (_, client) => {
    client.invalidateQueries(UserInfoKey);
  }
);

export const contact = ({
  subject,
  content,
  email,
}: {
  subject: string;
  content: string;
  email: string;
}) => {
  return request({
    method: "POST",
    url: "/contact",
    data: {
      subject,
      content,
      email,
    },
  });
};

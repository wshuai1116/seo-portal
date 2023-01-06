import { accessTokenKey, expireTimeKey } from "@/configs/constants";
import cookie from "./cookie";
import localStorage from "./localStorage";
import { isBrowser } from "./ssr";

import { parse } from "query-string";

export const loginByQueryToken = () => {
  try {
    const params = parse(window.location.search) as Record<string, string>;

    if (params.token) {
      login(params.token);
    }
  } catch (e) {
    console.info(e);
  }
};

export type User = {
  accountId: string;
  uid: string;
  email?: string;
  mobileNo?: string;
  nickname?: string;
  avatar?: string;
};

export function loginRedirect(redirectPath?: string) {
  window.location.href = "/login?redirect=" + encodeURIComponent(redirectPath ?  redirectPath : window.location.pathname + window.location.search);
}

export function getToken() {
  return cookie.get(accessTokenKey);
}

export function isLogin() {
  if (!isBrowser()) {
    return false;
  }

  if (cookie.get(accessTokenKey)) {
    return true;
  } else {
    return false;
  }
}

export function login(
  token: string,
  user?: any,
  expireTime?: number,
  refreshToken?: string
) {
  cookie.set(accessTokenKey, token, expireTime);
  updateUser(user);
}

export function clearLoginInfo() {
  cookie.delete(accessTokenKey);
  localStorage.delete("bd_vid");
  localStorage.delete("user");
}

export function getUser(): User | undefined {
  if (!isBrowser()) {
    return undefined;
  }

  const userString = localStorage.get("user");
  if (userString) {
    return JSON.parse(userString);
  } else {
    return undefined;
  }
}

export function updateUser(user: any) {
  localStorage.set("user", user);
}

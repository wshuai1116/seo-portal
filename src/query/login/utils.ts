import { LoginResult } from "./types";
import { useMutation } from "react-query";
import { getQueryValueByQueryKey } from "@/utils";
import { User } from "@/query/user/types";

import { login as loginUtil } from "@/utils/auth";

import { NavigateFunction, useNavigate } from "react-router";
import * as notification from "@/components/display/Notification";
import localStorage from "@/utils/localStorage";

export const handleLoginDone = function (
  result: {
    accessToken: string;
    expireTime: number;
    refreshToken: string;
    user: User;
  },
  navigate: NavigateFunction
) {
  localStorage.delete("bd_vid");
  const storedRedirect = localStorage.get("redirect");
  const redirect = storedRedirect ? storedRedirect : getQueryValueByQueryKey("redirect", "/dashboard");
  loginUtil(
    result.accessToken,
    result.user,
    result.expireTime,
    result.refreshToken
  );

  localStorage.delete("redirect")
  
  window.location.href = redirect
};

export const createLoginMutation = <Params>(
  api: (options: Params) => Promise<{
    result: LoginResult;
  }>
) => {
  return (handlers?: {
    onSuccess?: (data: LoginResult) => void;
    onError?: (e: StdResponseErr) => void;
  }) => {
    const navigate = useNavigate();

    return useMutation<LoginResult, StdResponseErr, Params>(
      async (options) => {
        if (localStorage.get("bd_vid")) {
          options["bdVid"] = localStorage.get("bd_vid");
        }
        const rs = await api(options);
        return rs.result;
      },
      {
        onSuccess(data) {
          handleLoginDone(data, navigate);
          handlers?.onSuccess?.(data);
        },
        onError(e) {
          if (handlers?.onError) {
            handlers.onError(e);
          } else {
            notification.error(e.message);
          }
        },
      }
    );
  };
};

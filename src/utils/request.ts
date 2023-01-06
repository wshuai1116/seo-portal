import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { cloneDeep } from "lodash";
import { compile } from "path-to-regexp";
import qs from "query-string";
import { clearLoginInfo, loginRedirect } from "./auth";
import cookie from "./cookie";
import { isBrowser } from "./ssr";
import { v4 } from "uuid";
import localStorage from "./localStorage";
import { accessTokenKey } from "@/configs/constants";

export function getDeviceId() {
  let deviceId = localStorage.get("deviceId");
  if (!deviceId) {
    deviceId = v4();
    localStorage.set("deviceId", deviceId);
  }
  return deviceId;
}

axios.defaults.headers.common["Content-Type"] =
  "application/x-www-form-urlencoded";
const instance = axios.create({
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
  baseURL: `/api`,
});

if (isBrowser()) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  window.axios = instance;
}

instance.interceptors.request.use(
  (config: any) => {
    const accessToken = cookie.get(accessTokenKey);
    if (accessToken) {
      config.headers["Authorization"] = "Bearer " + accessToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const fetch = (options: any): Promise<AxiosResponse<any, any>> => {
  let { method = "get", data, fetchType, url, params, responseType } = options;

  const cloneData = cloneDeep(data);
  try {
    let domain = "";
    if (url.match(/[a-zA-z]+:\/\/[^/]*/)) {
      [domain] = url.match(/[a-zA-z]+:\/\/[^/]*/);
      url = url.slice(domain.length);
    }

    url = compile(url)(params);
    url = domain + url;
  } catch (e) {
    console.log(e);
  }

  switch (method.toLowerCase()) {
    case "get":
      return instance.get(url, {
        params: cloneData,
        responseType: responseType,
      });
    case "delete":
      url = url + "?" + qs.stringify(cloneData);
      return instance.delete(url, {
        data: cloneData,
      });
    case "post":
      return instance.post(url, qs.stringify(cloneData));
    case "put":
      return instance.put(url, qs.stringify(cloneData));
    case "patch":
      return instance.patch(url, cloneData);
    default:
      return instance(options);
  }
};

const request = async <T>(options: AxiosRequestConfig) => {
  if (options.data) {
    options.data.deviceId = getDeviceId();
  } else {
    options.data = {
      deviceId: getDeviceId(),
    };
  }

  if (options.url && options.url.indexOf("//") > -1) {
    const origin = `${options.url.split("//")[0]}//${
      options.url.split("//")[1].split("/")[0]
    }`;
  }

  if (!options.headers) {
    options.headers = {};
  }

  return fetch(options)
    .then((response) => {
      const { statusText, status } = response;
      const data = response.data;

      if (status === 200 && !data.errorCode) {
        return Promise.resolve({
          // success: true,
          status: "ok",
          statusCode: status,
          result: (data === 0 || data === "" ? undefined : data) as T,
          message: statusText,
        });
      } else {
        return Promise.reject({
          // success: false,
          status: "error",
          statusCode: status,
          result: data,
          message: data?.errorMsg || statusText,
          errorCode: data?.errorCode,
        });
      }
    })
    .catch((error) => {
      console.info(error);
      const { response } = error;
      let msg;
      let statusCode;
      let errorCode;
      if (response && response instanceof Object) {
        // checkStatus(response)
        const { data, statusText, config } = response;
        statusCode = response.status;

        if (statusCode === 401) {
          clearLoginInfo();

          if (
            config?.url !== "/verification/code/login" &&
            !config?.url?.startsWith?.("/user/auth")
          ) {
            loginRedirect();
          }

          return Promise.reject({
            success: false,
            statusCode,
            message: null,
            errorCode: errorCode,
          });
        } else {
          msg = data?.errorMsg || data?.message || statusText;
          errorCode = data?.errorCode;
        }
      } else {
        statusCode = 600;
        msg = error.message || "Network Error";
      }

      /* eslint-disable */
      return Promise.reject({
        success: false,
        statusCode,
        message: msg,
        errorCode: errorCode,
      });
    });
};

export default request;

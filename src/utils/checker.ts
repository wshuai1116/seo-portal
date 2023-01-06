import { isBrowser } from "./ssr";

export function isEmail(email: string) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}


export function isWechat() {
  if (
    window.navigator.userAgent.toLowerCase().indexOf("micromessenger") > -1 ||
    // @ts-ignore
    typeof navigator?.wxuserAgent !== "undefined"
  ) {
    return true;
  } else {
    return false;
  }
}

export function isMobileBrowser() {
  if (!isBrowser()) {
    return false;
  }

  return /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i.test(
    window.navigator.userAgent
  );
}

export function isChinaMobileNo(mobileNo: string) {
  const re = /^1[3-9]\d{9}$/;
  return re.test(String(mobileNo).toLowerCase());
}

export function isMac() {
  const ua = navigator.userAgent.toLowerCase();

  return ua.includes("macintosh") || ua.includes("mac os");
}
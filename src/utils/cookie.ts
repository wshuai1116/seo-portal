// 关于cookie的相关设置
const cookie = {
  set(name: string, value: string, expireTime: number) {
    const exp = new Date();
    if (expireTime) {
      exp.setTime(expireTime);
    }

    // exp.setTime(exp.getTime() + days * 24 * 60 * 60 * 1000);

    const hostname = window.location.hostname.split(".").slice(-3).join(".");
    if (hostname.indexOf(".seo-go.top") > 0) {
      document.cookie =
        name +
        "=" +
        encodeURIComponent(value) +
        ";expires=" +
        exp.toUTCString() +
        ";domain=" +
        hostname +
        "; path=/";
    } else {
      document.cookie =
        name +
        "=" +
        escape(value) +
        ";expires=" +
        exp.toUTCString() +
        ";path=/";
    }
  },
  delete(name: string) {
    const cval = cookie.get(name);
    if (cval !== null) {
      const hostname = window.location.hostname;
      if (hostname.indexOf(".seo-go.top") > 0) {
        document.cookie =
          name +
          "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;domain=" +
          hostname +
          "; path=/";
      } else {
        document.cookie =
          name + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/;";
      }
    }
  },
  get(name: string) {
    const reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    const arr = document.cookie.match(reg);
    if (arr) {
      return decodeURIComponent(arr[2]);
    } else {
      return null;
    }
  },
};

export default cookie;

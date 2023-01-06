import { isBrowser } from "./ssr";
import { parse, ParsedQuery } from "query-string";

const colorGroup = [
  ["#FFCC99", "black"],
  ["#99CC99", "black"],
  ["#FFFF99", "black"],
  ["#FF9966", "black"],
  ["#99CCCC", "black"],
  ["#FFCC33", "black"],
  ["#CCCC33", "black"],
  ["#FF6666", "black"],
  ["#99CC66", "black"],

  ["#0099CC", "white"],
  ["#FF6666", "white"],
  ["#666666", "white"],
  ["#CC9999", "white"],
  ["#990033", "white"],
  ["#333333", "white"],
  ["#333333", "white"],
  ["#CC6600", "white"],
  ["#993399", "white"],
];

export function getUniqueColorByNumber(rawNumber: number) {
  const arr = { backgroundColor: "#FFFFFF", color: "#000000" }; // 默认白底黑字
  let num = rawNumber;
  try {
    if (num) {
      num = num < 100 ? num * 100 : num; // 放大100倍
      const numStr = String(num);
      let index = Number(numStr.substring(numStr.length - 3)); // 取最后3位
      while (index > colorGroup.length) {
        // 超过数组的长度，再次取模
        index = index % colorGroup.length;
      }
      arr.backgroundColor = colorGroup[index][0];
      arr.color = colorGroup[index][1];
    }
  } catch (e) {
    console.log(e);
  }
  return arr;
}

export function getPageQuery(searchStr?: string) {
  return parse(searchStr || window.location.search.replace("?", ""));
}

export function getQueryValueByQueryKey(key: string, defaultValue?: string) {
  const getQsRsByKey = (parsed: ParsedQuery, key: string): string => {
    let rs = parsed[key];

    if (Array.isArray(rs)) {
      rs = rs[0];
    }

    if (typeof rs === "string") {
      return rs;
    } else {
      return rs ? getQsRsByKey(rs, key) : defaultValue || "";
    }
  };

  return getQsRsByKey(getPageQuery(), key);
}

export function isChinaMobileNo(mobileNo: string) {
  const re = /^1[3-9]\d{9}$/;
  return re.test(String(mobileNo).toLowerCase());
}

export function isMac() {
  const ua = navigator.userAgent.toLowerCase();

  return ua.includes("macintosh") || ua.includes("mac os");
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

export function isValidUrl(string: string) {
  if (!string) {
    return false;
  }

  if (!string.startsWith('http')) {
    string = "http://" + string
  }
  const pattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
    '(([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}' + // domain name
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
    '(\\#[-a-z\\d_]*)?$', // fragment locator
    'i'
  );
  return pattern.test(string);
}

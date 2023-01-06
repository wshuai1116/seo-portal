import {
  accessTokenKey,
  expireTimeKey,
} from "@/configs/constants";
import cookie from "./cookie";
import localStorage from "./localStorage";
import sessionStorage from "./sessionStorage";
import { isBrowser } from "./ssr";

import { parse } from "query-string";
import { ABTestGroup } from "@/query/abtest/types";

export function setGroup(groups: [ABTestGroup]) {
  return sessionStorage.set("abTestGroups", groups)
}
export function getGroup() {
  return JSON.parse(sessionStorage.get("abTestGroups"))
}

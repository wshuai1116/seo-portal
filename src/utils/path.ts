import { resolve } from "path-browserify";

export const getFileNameByPath = (path: string) => {
  const name = path.match(/\/([^/]+)$/)?.[1];
  return name || path;
};

export const getLocalFileNameByPath = (path: string) => {
  if (navigator.userAgent.toLowerCase().includes("windows")) {
    const name = path.match(/\\([^\\]+)$/)?.[1];
    return name || path;
  } else {
    const name = path.match(/\/([^/]+)$/)?.[1];
    return name || path;
  }
};

export const getParentPath = (path: string) => resolve(path, "..");

export const getFileExt = (path: string) => {
  const ext = path.match(/(\.[^.]+)$/)?.[1] || "";
  return ext;
};

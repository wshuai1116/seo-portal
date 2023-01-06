import moment from "moment";
import { camelCase, startCase } from "lodash";

export const pascalCase = (str: string) =>
  startCase(camelCase(str)).replace(/ /g, "");

export const fileNameRegex = /^[^\/\\:*\?"<>|\s]+$/;
export const folderNameRegex = /^[^\\:*\?"<>|\s]+$/;

export const bytesToSize = (bytes: number) => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const decimals = 2;
  const sizes = ['B', 'K', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)) + ' ' + sizes[i];
}

export const formatDateTime = (date?: string | number) => {
  if (!date) {
    return "-";
  }

  const dateObj = new Date(date);

  return moment(dateObj).format("YYYY/MM/DD HH:mm:ss");
};

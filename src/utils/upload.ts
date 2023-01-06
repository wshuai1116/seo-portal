import { FC, useState } from "react";
import AntdUpload from "antd/lib/upload";
import { UploadProps } from "antd/lib/upload";
import axios from "axios";

import request from "@/utils/request";
import * as notification from "@/components/display/Notification";

import { observer } from "mobx-react-lite";
import { AntAnchor } from "antd/lib/anchor/Anchor";

export const baseUrl = "https://static01.seo-go.top/";

const getPolicy = (data: { fileExtension: string; fileTag?: string }) => {
  return request<{
    expire: number;
    host: string;
    prefix: string;
    params: {
      AccessKeyId: string;
      key: string;
      policy: string;
      signature: string;
    };
  }>({
    url: "/upload/policy/obs",
    method: "get",
    data: data,
  });
};

export const uploadFile = (
  file: File,
  onSuccess?: (url: string) => void,
  onError?: (e: any) => void,
  onProgress?: (loaded: number, total: number) => void,
) => {
  const regex = /(?:\.([^.]+))?$/;

  const ext = regex.exec(file.name)?.[1];

  if (ext) {
    getPolicy({
      fileExtension: ext,
    }).then((rs) => {
      const data = rs.result;

      const formData = new FormData();
      Object.keys(data.params).map((k) =>
        formData.append(k, data.params[k as keyof typeof data.params])
      );
      formData.append("x-obs-acl", "public-read");
      formData.append("file", file);
      axios
        .post<{ url: string }>(data.host, formData, {
          onUploadProgress: (progressEvent) =>
            onProgress?.(progressEvent.loaded, progressEvent.total),
        })
        .then((res) => {
          const url = baseUrl + data.params.key;

          onSuccess?.(url);
        })
        .catch((err) => {
          console.log(err);
          onError?.(err);
        });
    });
  }
};

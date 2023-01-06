import { FC, useState } from "react";
import AntdUpload from "antd/lib/upload";
import { UploadProps } from "antd/lib/upload";
import axios from "axios";

import request from "@/utils/request";
import * as notification from "@/components/display/Notification";

import { observer } from "mobx-react-lite";
import { AntAnchor } from "antd/lib/anchor/Anchor";

export const baseUrl = "https://static01.seo-go.top/";

function bytesToBase64(bytes: Uint8Array) {
  let binary = "";
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}

function dataURLtoFile(dataurl: string, filename: string) {
  var arr = dataurl.split(","),
    mime = arr[0].match(/:(.*?);/)?.[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
}

export const getPolicy = (data: {
  fileExtension: string;
  fileTag?: string;
}) => {
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

export const UploadWrapper: FC<{
  disabled?: boolean;
  onSuccess?: (url: string, file: File) => void;
  onReceiveFile?: (file: File, FileList: any) => void;
  manualUpload?: boolean;
  shape?: "rect" | "round";
  title?: string;
  placeholder?: string;
  accept?: string;
}> = observer(
  ({
    disabled,
    onSuccess,
    onReceiveFile,
    manualUpload,
    shape,
    title,
    placeholder,
    accept,
    children,
  }) => {
    const [currentCallback, setCurrentCallback] = useState<() => void>();

    const uploadImageProps: UploadProps = {
      name: "file",
      accept: accept,
      onChange(info: any) {
        if (info.file.status === "error") {
          notification.error("上传失败");
        }
      },
      beforeUpload(file, FileList) {
        onReceiveFile?.(file, FileList);
      },
      // beforeUpload(file: File) {
      //   return new Promise((resolve, reject) => {
      //     file.arrayBuffer().then((rs) => {
      //       const data = new Uint8Array(rs);
      //       const image = bytesToBase64(data);

      //       const regex = /(?:\.([^.]+))?$/;
      //       const ext = regex.exec(file.name as string)?.[1];

      //       if (ext) {
      //         setCurrentCallback(() => {
      //           return (data: string) => {
      //             resolve(dataURLtoFile(data, file.name));
      //           };
      //         });
      //         // avatarCropperState.open(`data:image/${ext};base64,` + image, ext);
      //       }
      //     });
      //   });
      // },
      showUploadList: false,
      customRequest(files) {
        if (manualUpload) {
          return;
        }
        const { file } = files;
        const regex = /(?:\.([^.]+))?$/;

        if (file instanceof File) {
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
                .post<{ url: string }>(data.host, formData)
                .then((res) => {
                  const url = baseUrl + data.params.key;

                  files.onSuccess?.(url);
                  notification.success("上传成功");
                  // avatarCropperState.close();

                  onSuccess?.(url, file);
                })
                .catch((err) => {
                  console.log(err);
                });
            });
          }
        }
      },
    };

    return (
      <>
        <AntdUpload disabled={disabled} {...uploadImageProps}>
          {children}
        </AntdUpload>
        {/* {avatarCropperState.visible && (
        <AvatarCropper onSubmit={currentCallback} />
      )} */}
      </>
    );
  }
);

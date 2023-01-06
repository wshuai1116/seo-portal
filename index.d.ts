type StdResponseErr = {
  errorCode: string | number;
  message: string;
  statusCode: number;
  success: false;
};

interface Window {
}

declare const API_URL: string;
declare const WS_URL: string;
declare const WxLogin: any | undefined;
declare const APP_PLATFORM: string | undefined;

declare module "*.svg" {
  import * as React from "react";

  export const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & { title?: string }
  >;

  const src: string;

  export default src;
}

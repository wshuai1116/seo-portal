import SBFlex, { FlexColumn, FlexRow } from "@/components/display/Flex";
import iconNodata from "@/assets/common/icon-nodata.svg";
import { t } from "@lingui/macro";

export const Nodata = ({
  style,
  icon,
  desc,
}: {
  style?: React.CSSProperties;
  icon?: string;
  desc?: string;
}) => {
  return (
    <FlexColumn
      style={{
        alignItems: "center",
        justifyContent: "center",
        height: 400,
        ...style,
      }}
    >
      <div>
        <img src={icon ? icon : iconNodata} />
      </div>
      <div
        style={{
          fontSize: 20,
          color: "#1F1F1F",
        }}
      >
        {desc ? desc : t`暂无数据`}
      </div>
    </FlexColumn>
  );
};

export const structureList = [
  {
    objectKey: "totalUrl",
    desc: "所有URL",
  },
  {
    objectKey: "totalInternalUrlBlockedByRobots",
    desc: "被robots.txt阻止的内部链接",
  },
  {
    objectKey: "totalExternalUrlBlockedByRobots",
    desc: "被robots.txt阻止的外部链接",
  },
  {
    objectKey: "totalUrlCrawled",
    desc: "未被阻止的URL",
  },
  {
    objectKey: "totalInternalUrlCrawled",
    desc: "未被阻止的内部链接",
  },
  {
    objectKey: "totalExternalUrlCrawled",
    desc: "未被阻止的外部链接",
  },
  {
    objectKey: "totalInternalUrl",
    desc: "内部链接",
  },
  {
    objectKey: "totalInternalUrlNofollow",
    desc: "Nofolllow内部链接",
  },
  {
    objectKey: "totalExternalUrlNofollow",
    desc: "Nofolllow外部链接",
  },
];

export const securityList = [
  {
    objectKey: "totalUrlHttps",
    desc: "HTTPS链接",
  },
  { objectKey: "totalUrlHttp", desc: "HTTP链接" },
  {
    objectKey: "mixedContent",
    desc: "HTTPS和HTTP混合内容链接",
  },
  {
    objectKey: "formURLInsecure",
    desc: "Form URL Insecure",
  },
  {
    objectKey: "formOnHTTP",
    desc: "Form on HTTP URL",
  },
  {
    objectKey: "unsafeCrossOrigin",
    desc: "不安全的跨域链接",
  },
  {
    objectKey: "missingHSTSHeader",
    desc: "丢失HSTS Header",
  },
  {
    objectKey: "missingContentSecurityPolicyHeader",
    desc: "丢失Content-Security-Policy Header",
  },
  {
    objectKey: "missingContentTypeOptionsHeader",
    desc: "丢失X-Content-Type-Options Header",
  },
  {
    objectKey: "missingFrameOptionsHeader",
    desc: "丢失X-Frame-Options Header",
  },
  {
    objectKey: "missingSecureReferrerPolicyHeader",
    desc: "丢失Secure Referrer-Policy Header",
  },
];

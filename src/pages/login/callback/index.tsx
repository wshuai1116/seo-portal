import useLoginByWechat from "@/query/login/useLoginByWechat";
import useLoginByWechatMp from "@/query/login/useLoginByWechatMp";
import useLoginByQQ from "@/query/login/useLoginByQQ";
import qs from "query-string";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function LoginCallback() {
  const loginByWechatMutation = useLoginByWechat();
  const loginByWechatMpMutation = useLoginByWechatMp();
  const loginByQQMutation = useLoginByQQ();
  useEffect(() => {
    const queryParams = qs.parse(window.location.search);
    const authType = queryParams["authType"] as string;
    if (!authType) {
      return;
    }
    if (authType === "wx") {
      loginByWechatMutation.mutate({
        code: queryParams["code"] as string,
      });
    } else if (authType === "wxmp") {
      loginByWechatMpMutation.mutate({
        code: queryParams["code"] as string,
      });
    } else if (authType === "qq") {
      loginByQQMutation.mutate({
        code: queryParams["code"] as string,
        redirectUri: "https://www.seo-go.top/login/callback",
      });
    }
  }, []);
  return <></>;
}

export default LoginCallback;

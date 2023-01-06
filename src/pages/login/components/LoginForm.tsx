import { useNavigate } from "react-router";
import styled from "styled-components";
import { useEffect, useState } from "react";
import Form from "antd/lib/form";
import {
  getPageQuery,
  isChinaMobileNo,
  isMobileBrowser,
  isWechat,
} from "@/utils";
import Input from "@/components/form/NormalInput";
import Button from "@/components/base/Button";

import iconQQ from "@/assets/login/icon-qq.svg";
import iconWechat from "@/assets/login/icon-wechat.svg";

import useSendVerificationCode from "@/query/login/useSendVerificationCode";
import useLoginByMobile from "@/query/login/useLoginByMobile";

import { handleLoginDone } from "@/query/login/utils";
import { CenterItem, FlexRow } from "@/components/display/Flex";
import * as notification from "@/components/display/Notification";
import VerifyCodeForm from "./verify-code";
import AccountLoginForm from "./account-login";

const Root = styled.div`
  width: 400px;
`;
const LoginFormWrapper = styled.div`
  width: 100%;
  padding: 40px;
`;
const Title = styled.div`
  font-size: 28px;
  margin: 5px 0px 35px 0px;
`;
const Subtitle = styled.div`
  font-size: 14px;
  color: #060607;
  margin: 5px 0px 35px 0px;
`;
const SwitchLoginModel = styled.div`
  font-size: 14px;
  color: #5a65ea;
  font-weight: bold;
  margin-top: -10px;
  margin-bottom: 10px;
`;

const Bar = styled.div`
  border-top: 1px solid #ebebeb;
  height: 0;
  width: auto;
  flex: 1 1 0%;
`;

function LoginForm() {
  const navigate = useNavigate();
  const loginByMobileMutation = useLoginByMobile({
    onSuccess(rs) {},
  });
  const handleLoginByMobile = (params: { mobile: string; code: string }) => {
    loginByMobileMutation.mutate({
      mobileNo: params.mobile,
      isoCode: "86",
      verificationCode: params.code,
    });
  };
  const sendCodeMutation = useSendVerificationCode({
    onError(e) {
      setRemainingTime(0);
      if (e.message) {
        notification.error(e.message);
      }
    },
    onSuccess() {
      setRemainingTime(resendInterval);
    },
  });
  const handleSendCode = (mobile: string) => {
    if (!sendCodeMutation.isLoading) {
      sendCodeMutation.mutate({
        target: mobile,
        isoCode: "86",
        messageType: 1,
      });
    }
  };
  const resendInterval = 60;

  const [remainingTime, setRemainingTime] = useState(0);
  const hideWechat = isMobileBrowser() && !isWechat();

  useEffect(() => {
    let timer: any = null;
    if (remainingTime > 0) {
      timer = setTimeout(() => {
        if (remainingTime) {
          setRemainingTime(remainingTime - 1);
        } else {
          clearInterval(timer);
        }
      }, 1000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [remainingTime]);

  const qqWebLogin = () => {
    const target = getWebLoginTarget("qq");
    window.location.href = `https://graph.qq.com/oauth2.0/authorize?response_type=code&client_id=102019389&redirect_uri=${encodeURIComponent(
      target
    )}`;
  };

  const wxWebLogin = () => {
    const mobile = isMobileBrowser();
    const target = getWebLoginTarget(mobile ? "wxmp" : "wx");
    let wechatAuthUrl =
      "https://open.weixin.qq.com/connect/qrconnect?appid=wxc48fb7327f9ffdd2&redirect_uri=" +
      encodeURIComponent(target) +
      "&response_type=code&scope=snsapi_login&state=STATE#wechat_redirect";
    if (mobile) {
      wechatAuthUrl =
        "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx7733d4e9ae2fa271&redirect_uri=" +
        encodeURIComponent(target) +
        "&response_type=code&scope=snsapi_userinfo#wechat_redirect";
    }
    window.location.href = wechatAuthUrl;
  };

  const getWebLoginTarget = (type: string) => {
    const { redirect = "/" } = getPageQuery();
    return `https://www.seo-go.top/login/callback?redirect=${encodeURIComponent(
      redirect as string
    )}&authType=${type}`;
  };

  return (
    <Root>
      <LoginFormWrapper>
        <Title>登录账户</Title>
        {/* <Subtitle>
          还没有账户？<a>免费注册</a>
        </Subtitle> */}
        {/* <AccountLoginForm /> */}
        <VerifyCodeForm />
        {/* 
        <FlexRow
          center
          style={{
            textAlign: "center",
            marginTop: 48,
            marginBottom: 16,
          }}
        >
          <Bar />
          <div
            style={{
              margin: "0 16px",
            }}
          >
            其他登录方式
          </div>
          <Bar />
        </FlexRow>

        <CenterItem
          style={{
            marginBottom: 20,
          }}
        >
          {!hideWechat && (
            <div
              onClick={wxWebLogin}
              style={{
                cursor: "pointer",
                height: 42,
                width: 42,
                marginRight: 56,
              }}
            >
              <img src={iconWechat} alt="微信登录" />
            </div>
          )}
          <div
            onClick={qqWebLogin}
            style={{
              cursor: "pointer",
              height: 42,
              width: 42,
            }}
          >
            <img src={iconQQ} alt="QQ登录" />
          </div>
        </CenterItem> */}

        <div
          style={{
            marginTop: 60,
            textAlign: "center",
          }}
        >
          <span
            style={{
              fontSize: 14,
            }}
          >
            注册或登录则表示您已同意{" "}
            <a
              style={{
                color: "#5590FFh",
              }}
              href="https://www.seo-go.top/legal/tos"
              target="_blank"
            >
              服务条款
            </a>
            。
          </span>
        </div>
      </LoginFormWrapper>
    </Root>
  );
}

export default LoginForm;

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

const Root = styled.div``;
const LoginFormWrapper = styled.div`
  width: 100%;
  padding: 40px;
`;
const Title = styled.div`
  font-size: 28px;
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

function VerifyCodeForm() {
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

  return (
    <Root>
      <Form onFinish={handleLoginByMobile}>
        <Form.Item
          name="mobile"
          style={{
            marginBottom: 20,
          }}
          rules={[
            {
              validator: (_, value) => {
                if (isChinaMobileNo(value)) {
                  return Promise.resolve();
                } else {
                  return Promise.reject("请输入正确的手机号");
                }
              },
            },
          ]}
        >
          <Input small placeholder="手机号" />
        </Form.Item>

        <Form.Item shouldUpdate={() => true}>
          {({ getFieldValue, getFieldError }) => {
            const currentMobile = getFieldValue("mobile");
            const hasError = !currentMobile || !!getFieldError("mobile").length;

            return (
              <FlexRow>
                <Form.Item
                  name="code"
                  rules={[
                    {
                      required: true,
                      message: "请输入验证码",
                    },
                  ]}
                  style={{
                    marginBottom: 12,
                  }}
                >
                  <Input placeholder="验证码" small />
                </Form.Item>
                <Button
                  type="default"
                  onClick={() => handleSendCode(currentMobile)}
                  ghost
                  disabled={hasError || remainingTime > 0}
                  style={{
                    height: 40,
                    borderRadius: 10,
                    marginLeft: 16,
                    width: 118,
                    minWidth: "initial",
                  }}
                >
                  {remainingTime > 0 && <span>{remainingTime}s</span>}
                  {remainingTime === 0 && "获取验证码"}
                </Button>
              </FlexRow>
            );
          }}
        </Form.Item>

        {/* <SwitchLoginModel>密码登录</SwitchLoginModel> */}
        <Button
          htmlType="submit"
          type="primary"
          style={{
            width: "100%",
            height: 40,
            fontSize: 16,
          }}
        >
          登录
        </Button>
      </Form>
    </Root>
  );
}

export default VerifyCodeForm;

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
import useLoginByAccount from "@/query/login/useLoginByAccount";

const Root = styled.div``;
const SwitchLoginModel = styled.div`
  font-size: 14px;
  color: #5a65ea;
  font-weight: bold;
  margin-top: -10px;
  margin-bottom: 10px;
`;

function AccountLoginForm() {
  const navigate = useNavigate();
  const loginByAccountMutation = useLoginByAccount({
    onSuccess(rs) {},
  });
  const handleLoginByAccount = (params: {
    account: string;
    password: string;
  }) => {
    loginByAccountMutation.mutate({
      authAccount: params.account,
      password: params.password,
    });
  };

  return (
    <Root>
      <Form onFinish={handleLoginByAccount}>
        <Form.Item
          name="account"
          style={{
            marginBottom: 20,
          }}
          rules={[{ required: true, message: "请输入账号" }]}
        >
          <Input small placeholder="账号" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "请输入密码",
            },
          ]}
          style={{
            marginBottom: 12,
          }}
        >
          <Input type="password" placeholder="密码" small />
        </Form.Item>

        <SwitchLoginModel>验证码登录</SwitchLoginModel>
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

export default AccountLoginForm;

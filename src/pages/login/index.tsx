import { useState } from "react";
import styled from "styled-components";
import LoginForm from "./components/LoginForm";
import loginImage1 from "@/assets/login/login-image1.png";
import { Helmet } from "react-helmet";
import { CenterItem, FlexColumn, FlexRow } from "@/components/display/Flex";
import logoCN from "@/assets/logo-cn.svg";
import { useNavigate } from "react-router-dom";

const LogoText = styled.span`
  margin-left: 15px;
  height: 28px;
  font-family: "Sofia Pro", Roboto;
  font-style: normal;
  font-weight: 700;
  font-size: 22px;
  line-height: 28px;
  color: #000000;
  cursor: pointer;
`;

const Root = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: row;
`;

const MainWrapper = styled(CenterItem)`
  flex-grow: 1;
`;

const LoginContaner = styled.div`
  box-shadow: 0px 50px 60px rgba(0, 0, 0, 0.11);
  border-radius: 16px;
`;


function Login() {
  const navigate = useNavigate();
  return (
    <Root>
      <Helmet>
        <title>登录 - SEO-GO.top</title>
      </Helmet>
      <MainWrapper>
        <LoginContaner>
          <LoginForm />
        </LoginContaner>
      </MainWrapper>
    </Root>
  );
}

export default Login;

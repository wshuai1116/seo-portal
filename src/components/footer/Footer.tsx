import styled from "styled-components";
import { CenterItem, FlexColumn, FlexRow } from "../display/Flex";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/common/logo-light.svg";

const Root = styled.div`
  width: 100%;
  background: #5041bc;
  height: 320px;

  @media screen and (max-height: 900px) {
    height: 240px;
  }
`;

const ContentWrapper = styled(CenterItem)`
  height: 100%;
  width: 100%;
  max-width: 1280px;
  padding: 0 20px;
  color: white;
  display: flex;
  margin: 0 auto;
`;

const LogoText = styled(CenterItem)`
  width: 170px;
  margin: 20px auto;
  img {
    width: 100%;
  }
  @media screen and (max-width: 640px) {
    width: 220px;
  }
`;

const BottomLinkWrapper = styled(CenterItem)`
  margin: 10px auto;
`;

const BottomLink = styled.a`
  color: #ddd;
  margin: 0 10px;
  white-space: nowrap;
  :hover {
    color: #fff;
  }
`;
const BottomSeparator = styled.span`
  margin: 0 10px;
  color: #ddd;
`;

const CopyrightWrapper = styled(CenterItem)`
  width: 100%;
  padding: 16px 20px;
  color: #ddd;
  background-color: #000;
  height: auto;

  @media screen and (max-width: 640px) {
    display: flex;
    flex-direction: column;
    font-size: 12px;
    padding: 26px 10px;
  }
`;

const CopyrightText = styled(CenterItem)`
  color: #ddd;
`;

const Footer = () => {
  const navigate = useNavigate();
  return (
    <Root>
      <ContentWrapper>
        <FlexColumn>
          <LogoText>
            <img src={logo} alt="SEO-GO优化工具logo" />
          </LogoText>
          <BottomLinkWrapper>
            <BottomLink target="_blank" href="/contact">
              联系我们
            </BottomLink>
            <BottomSeparator>|</BottomSeparator>
            <BottomLink target="_blank" href="/legal/tos">
              服务条款
            </BottomLink>
            <BottomSeparator>|</BottomSeparator>
            <BottomLink target="_blank" href="/legal/privacy">
              隐私政策
            </BottomLink>
          </BottomLinkWrapper>
        </FlexColumn>
      </ContentWrapper>
      <CopyrightWrapper>
        <CopyrightText>
          Copyright © 2022 Seo-Go.top All rights reserved.{" "}
        </CopyrightText>
        <BottomLink target="_blank" href="https://beian.miit.gov.cn/">
          沪ICP备19019891号-12
        </BottomLink>
      </CopyrightWrapper>
    </Root>
  );
};

export default Footer;

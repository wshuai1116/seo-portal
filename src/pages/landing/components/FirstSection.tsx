import { CenterItem, FlexColumn, FlexRow } from "@/components/display/Flex";
import { useNavigate } from "react-router";
import styled from "styled-components";
import Button from "@/components/base/Button";
import Input, { InputProps } from "antd/lib/input";
import { isLogin } from "@/utils/auth";
// import sectionBg from "@/assets/landing/section-bg.svg";
import sectionBg from "@/assets/landing/bg-first-section.svg";

import { Form } from "antd";
import { isValidUrl } from "@/utils";
const Root = styled.div`
  width: 100%;
  background-image: url(${sectionBg});
  background-size: contain;
  height: calc(100vh - 60px);
  display: flex;
`;

const ContentWrapper = styled(CenterItem)`
  width: 1280px;
  margin: 0 auto;
`;

const Subject = styled.h1`
  font-size: 48px;
  color: #000;
  text-align: center;
  font-weight: bold;
`;

const Subtitle = styled.div`
  font-size: 26px;
  color: #000;
  margin-top: 36px;
  margin-bottom: 40px;
  text-align: center;
  font-weight: bold;
`;
const DomainInputWrapper = styled.div`
  display: flex;
  text-align: center;
  width: 100%;
  max-width: 720px;
  flex-direction: row;
  flex-wrap: nowrap;
  margin: 0 auto;
  margin-top: 36px;
  margin-bottom: 40px;
`;

const EnterButton = styled(Button)`
  width: fit-content;
  height: 60px !important;
  display: inline-block;
  font-size: 18px !important;
  gap: 10px;
  padding: 0 30px;
  margin: 0 auto;
  font-weight: bold;
`;

const FirstSection = ({}: {}) => {
  const navigate = useNavigate();

  return (
    <Root>
      <ContentWrapper>
        <FlexColumn>
          <Subject>自动帮您完成SEO的所有诊断和优化，无需任何SEO培训</Subject>
          <Subtitle>
            —— 让您的网站轻松被发现，告别SEO代理和大量广告成本，自然流量获取客户
          </Subtitle>
          {!isLogin() ? (
            <DomainInputWrapper>
              <Form
                style={{
                  width: "100%",
                }}
                layout="horizontal"
                onFinish={() => navigate("/login")}
              >
                <Input.Group
                  compact
                  style={{
                    display: "flex",
                  }}
                >
                  <Form.Item
                    name="siteUrl"
                    rules={[
                      {
                        validator: (_, value) => {
                          if (isValidUrl(value)) {
                            return Promise.resolve();
                          } else {
                            return Promise.reject("请输入正确的域名");
                          }
                        },
                      },
                    ]}
                    style={{
                      width: "90%",
                      height: 60,
                    }}
                  >
                    <Input
                      placeholder="输入站点域名 例如: www.example.com"
                      style={{
                        height: 60,
                        border: "2px #5041BC solid",
                        borderRadius: 0,
                        textAlign: "left",
                      }}
                    />
                  </Form.Item>
                  <Button
                    htmlType="submit"
                    type="primary"
                    style={{
                      width: 80,
                      height: 60,
                      borderRadius: 0,
                    }}
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12.0001 0.800049L10.0261 2.78805L17.8381 10.6H0.80011V13.4H17.8381L10.0261 21.226L12.0001 23.2L23.2001 12L12.0001 0.800049Z"
                        fill="white"
                      />
                    </svg>
                  </Button>
                </Input.Group>
              </Form>
            </DomainInputWrapper>
          ) : (
            <DomainInputWrapper>
              <EnterButton
                type="primary"
                onClick={() => {
                  navigate("/dashboard");
                }}
              >
                进入我的项目
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.0001 0.800049L10.0261 2.78805L17.8381 10.6H0.80011V13.4H17.8381L10.0261 21.226L12.0001 23.2L23.2001 12L12.0001 0.800049Z"
                    fill="white"
                  />
                </svg>
              </EnterButton>
            </DomainInputWrapper>
          )}
        </FlexColumn>
      </ContentWrapper>
    </Root>
  );
};

export default FirstSection;

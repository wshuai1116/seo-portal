import SBFlex, {
  CenterItem,
  FlexColumn,
  FlexRow,
} from "@/components/display/Flex";
import { useNavigate } from "react-router";
import styled from "styled-components";
import Button from "@/components/base/Button";
import { isLogin } from "@/utils/auth";
import Input, { InputProps } from "antd/lib/input";
import { Form } from "antd";
import { isValidUrl } from "@/utils";

const Root = styled.div`
  width: 100%;
  background: #f9fafe;
`;

const ContentWrapper = styled(CenterItem)`
  width: 100%;
  padding: 70px;
  overflow: hidden;
  margin: 0 auto;
`;

const Subject = styled.div`
  font-size: 28px;
  text-align: center;
  font-weight: 700;
`;

const Subtitle = styled.div`
  font-size: 24px;
  margin-top: 30px;
  margin-bottom: 50px;
  text-align: center;
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

const LastSection = ({}: {}) => {
  const navigate = useNavigate();

  return (
    <Root>
      <ContentWrapper>
        <FlexColumn center style={{ width: "45%" }}>
          <Subject>现在就对您的网站进行优化</Subject>
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

export default LastSection;

import img404 from "@/assets/404/img-404.png";
import BodyWrapper from "@/components/body-wrapper/BodyWrapper";
import { CenterItem, FlexColumn } from "@/components/display/Flex";
import Nav from "@/components/nav/Nav";
import { ArrowRightOutlined } from "@ant-design/icons";
import { Helmet } from "react-helmet";
import styled from "styled-components";

const Root = styled.div``;

const Title = styled.div`
  font-size: 60px;
  color: #1f1f1f;
  margin-bottom: 20px;
  font-weight: bold;

  @media screen and (max-width: 1280px) {
    font-size: 40px;
    margin-bottom: 0px;
  }
  @media screen and (max-width: 640px) {
    font-size: 18px;
    margin-bottom: 10px;
  }
`;

const SubTitle = styled.div`
  font-size: 20px;
  margin-bottom: 35px;

  @media screen and (max-width: 1280px) {
    margin-bottom: 15px;
    font-size: 16px;
  }
  @media screen and (max-width: 640px) {
    font-size: 14px;
    margin-bottom: 10px;
  }
`;

function NotFound() {
  return (
    <Root>
      <Helmet>
        <meta name="not-found-page" content="true" />
      </Helmet>
      <Nav />
      <BodyWrapper
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <CenterItem
          style={{
            height: "100%",
            maxWidth: 1440,
          }}
        >
          <CenterItem
            style={{
              flex: 1,
            }}
          >
            <FlexColumn
              style={{
                paddingBottom: 40,
              }}
            >
              <Title>找不到页面......</Title>
              <SubTitle>抱歉，您要查找的页面不存在</SubTitle>
              <div>
                <a href="/">
                  返回首页 <ArrowRightOutlined />
                </a>
              </div>
            </FlexColumn>
          </CenterItem>
          <FlexColumn
            style={{
              width: "40%",
            }}
          >
            <img
              style={{
                width: "100%",
              }}
              src={img404}
            />
          </FlexColumn>
        </CenterItem>
      </BodyWrapper>
    </Root>
  );
}

export default NotFound;

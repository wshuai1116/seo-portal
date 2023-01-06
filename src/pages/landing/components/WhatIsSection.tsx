import SBFlex, {
  CenterItem,
  FlexColumn,
  FlexRow,
} from "@/components/display/Flex";
import { useNavigate } from "react-router";
import styled from "styled-components";
import Button from "@/components/base/Button";
import { isLogin } from "@/utils/auth";
import imageFeature1 from "@/assets/landing/image-feature-1.png";
import imageFeature2 from "@/assets/landing/image-feature-2.png";
import imageFeature3 from "@/assets/landing/image-feature-3.png";

const Root = styled.div`
  width: 100%;
  background-color: #5041bc;
  margin-bottom: 220px;
`;

const ContentWrapper = styled(CenterItem)`
  max-width: 1280px;
  width: 100%;
  margin: 0 auto;
  min-height: 500px;
  position: relative;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
`;

const Subject = styled.div`
  font-size: 36px;
  font-weight: bold;
  text-align: center;
  color: #fff;
  margin-top: 80px;
`;
const FeatureItem = styled(FlexColumn)`
  width: 325px;
  margin-left: 40px;
  margin-right: 40px;
  border-radius: 8px;
  background: #ffffff;
  box-shadow: 0px 8px 35px 3px rgba(200, 200, 200, 0.25);
  position: relative;
`;
const FeatureImage = styled(CenterItem)`
  margin-bottom: 15px;
  width: 100%;
  img {
    width: 100%;
  }
`;
const FeatureTitle = styled.div`
  font-size: 18px;
  color: #000;
  line-height: 1.4;
  position: absolute;
  top: 300px;
  padding: 30px;
`;

const WhatIsSection = ({}: {}) => {
  const navigate = useNavigate();
  return (
    <Root>
      <ContentWrapper>
        <Subject>SEO-Go.Top产品介绍</Subject>
        <FlexRow style={{ top: 220, position: "absolute" }}>
          <FeatureItem>
            <FeatureImage>
              <img src={imageFeature1} alt="网站TDK优化" />
            </FeatureImage>
            <FeatureTitle>
              自动帮您优化您的网站结构，所有的网页信息（如：标题，描述，关键词，图片，内容等等）
            </FeatureTitle>
          </FeatureItem>
          <FeatureItem>
            <FeatureImage>
              <img src={imageFeature2} alt="网站关键词与安全分析优化" />
            </FeatureImage>
            <FeatureTitle>
              帮您选择关键词选择与布局，全面检测您网站的安全与速度，全面提升您的搜索引擎用户体验
            </FeatureTitle>
          </FeatureItem>
          <FeatureItem>
            <FeatureImage>
              <img src={imageFeature3} alt="使用SEO-GO提高网站排名" />
            </FeatureImage>
            <FeatureTitle>让您轻松获取自然流量，减少您的推广成本</FeatureTitle>
          </FeatureItem>
        </FlexRow>
      </ContentWrapper>
    </Root>
  );
};

export default WhatIsSection;

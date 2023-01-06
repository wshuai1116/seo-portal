import SBFlex, {
  CenterItem,
  FlexColumn,
  FlexRow,
} from "@/components/display/Flex";
import { useNavigate } from "react-router";
import styled from "styled-components";
import Button from "@/components/base/Button";
import { isLogin } from "@/utils/auth";
import arrowStart from "@/assets/landing/arrow-start.svg";
import imageFeature4 from "@/assets/landing/image-feature-4.png";
import imageFeature5 from "@/assets/landing/image-feature-5.png";

const Root = styled.div`
  width: 100%;
  margin-top: 320px;
  margin-bottom: 100px;
`;

const ContentWrapper = styled(CenterItem)`
  max-width: 1280px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-content: center;
  align-items: center;
  justify-content: center;
`;

const Subject = styled.div`
  font-size: 36px;
  font-weight: bold;
  text-align: center;
`;

const FeatureWrapper = styled.div`
  margin-top: 50px;
  margin-bottom: 150px;
  display: flex;
  position: relative;
  width: 90%;
  max-width: 1020px;
  border-radius: 36px;
  padding: 90px 70px;
  min-height: 450px;
`;

const FeatureItem = styled(FlexColumn)`
  padding: 3px 0;
  margin-left: 10px;
  margin-right: 10px;
`;
const FeatureImage = styled(CenterItem)`
  position: absolute;
  border-radius: 10px;
  img {
    width: 100%;
  }
`;
const FeatureList = styled.div`
  font-weight: 600;
  font-size: 20px;
`;
const FeatureSection = ({}: {}) => {
  const navigate = useNavigate();
  return (
    <Root>
      <ContentWrapper>
        <Subject>优化核心功能介绍</Subject>
        <FeatureWrapper style={{ backgroundColor: "#F1FBF4" }}>
          <FeatureList>
            <FeatureItem>· 自动网站结构分析</FeatureItem>
            <FeatureItem>· 核心文件自动生成</FeatureItem>
            <FeatureItem>· 网页核心信息自动检查与优化</FeatureItem>
            <FeatureItem>· 重复页面优化</FeatureItem>
            <FeatureItem>· 关键词选择与布局推荐</FeatureItem>
          </FeatureList>
          <FeatureImage style={{ width: 700, top: 30, right: -100 }}>
            <img src={imageFeature4} alt="SEO-GO诊断并优化网站SEO问题" />
          </FeatureImage>
        </FeatureWrapper>
        <FeatureWrapper
          style={{ backgroundColor: "#F4FBFE", justifyContent: "right" }}
        >
          <FeatureImage style={{ width: 800, top: 60, left: -100 }}>
            <img src={imageFeature5} alt="搜索引擎SEO优化工具" />
          </FeatureImage>
          <FeatureList>
            <FeatureItem>· 自动检测速度</FeatureItem>
            <FeatureItem>· 安全检查</FeatureItem>
            <FeatureItem>· 搜索引擎用户体验核心优化</FeatureItem>
          </FeatureList>
        </FeatureWrapper>
      </ContentWrapper>
    </Root>
  );
};

export default FeatureSection;

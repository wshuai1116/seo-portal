import BodyWrapper from "@/components/body-wrapper/BodyWrapper";
import Footer from "@/components/footer/Footer";
import Nav from "@/components/nav/Nav";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import WhatIsSection from "./components/WhatIsSection";
import FeatureSection from "./components/FeatureSection";
import FirstSection from "./components/FirstSection";
import LastSection from "./components/LastSection";

const Root = styled.div``;

function Landing() {
  useEffect(() => {}, []);

  return (
    <Root>
      <Helmet>
        <title>SEO-GO.Top-网站SEO优化分析-搜索引擎优化工具</title>
        <meta
          name="keywords"
          content="SEO优化,搜索引擎SEO,网站优化,网站排名,关键词排名,站长工具"
        />
        <meta
          name="description"
          content="SEO-GO网站优化工具，自动分析优化您网站SEO的所有问题（结构、标签、关键词、图片等）并提供SEO优化方案，检测网站安全与速度，提升网站排名与流量，支持多人协作。"
        />
        <meta http-equiv="content-language" content="zh-cn" />
      </Helmet>
      <Nav />
      <BodyWrapper>
        <FirstSection />
        <WhatIsSection />
        <FeatureSection />
        <LastSection />
      </BodyWrapper>
      <Footer />
    </Root>
  );
}

export default Landing;

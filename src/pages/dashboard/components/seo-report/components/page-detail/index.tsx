import { FlexColumn, FlexRow } from "@/components/display/Flex";
import { Drawer } from "antd";
import { observer } from "mobx-react-lite";
import { useEffect, useMemo, useState } from "react";
import styled, { css } from "styled-components";
import DeadLink from "./dead-link";
import Description from "./description";
import H1 from "./h1";
import ImgAlt from "./img-alt";
import MetaLanguage from "./meta-language";
import NotFoundLink from "./notfound-link";
import Redirection from "./redirection";
import RenderPattern from "./render-pattern";
import RobotsTxt from "./robots";
import Sitemap from "./sitemap";
import { pageDrawer } from "./states";
import Title from "./title";
import UrlDepth from "./url-depth";

const SideBar = styled(FlexColumn)`
  width: 280px;
  border-right: 1px solid #e1e3e6;
  gap: 5px;
  padding: 8px;
`;

const StyledMetricsItem = styled(FlexRow)<{
  active?: boolean;
}>`
  padding: 8px 14px;
  border-radius: 5px;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  :hover {
    background: #dee0fa;
  }
  ${(props) =>
    props.active
      ? css`
          background: #dee0fa;
        `
      : ""}
`;

const MainContainer = styled(FlexColumn)`
  overflow: auto;
  flex: 1;
`;

function PageDetail({ onClose }: { onClose?: () => void }) {
  const onDrawerClose = () => {
    pageDrawer.close();
    setCurrentMetrics(null);
    if (onClose) {
      onClose();
    }
  };

  const [currentMetrics, setCurrentMetrics] = useState<string | null>(null);

  useEffect(() => {
    if (pageDrawer.visible) {
      if (pageDrawer.currentPage?.redirectLocation) {
        setCurrentMetrics("REDIRECTION");
      } else if (!pageDrawer.metricsCategory) {
        setCurrentMetrics("URL_DEPTH");
      } else {
        setCurrentMetrics(pageDrawer.metricsCategory);
      }
    }
  }, [pageDrawer.visible]);

  const content = useMemo(() => {
    if (currentMetrics === "URL_DEPTH") {
      return <UrlDepth />;
    }
    if (currentMetrics === "NOTFOUND_LINK") {
      return <NotFoundLink />;
    }
    if (currentMetrics === "DEAD_LINK") {
      return <DeadLink />;
    }
    if (currentMetrics === "RENDER_PATTERN") {
      return <RenderPattern />;
    }
    if (currentMetrics === "ROBOTS") {
      return <RobotsTxt />;
    }
    if (currentMetrics === "SITEMAP") {
      return <Sitemap />;
    }
    if (currentMetrics === "H1") {
      return <H1 />;
    }
    if (currentMetrics === "TITLE") {
      return <Title />;
    }
    if (currentMetrics === "DESCRIPTION") {
      return <Description />;
    }
    if (currentMetrics === "META_LANGUAGE") {
      return <MetaLanguage />;
    }
    if (currentMetrics === "IMG_ALT") {
      return <ImgAlt />;
    }
    if (currentMetrics === "REDIRECTION") {
      return <Redirection />;
    }
    return <></>;
  }, [currentMetrics]);

  const MetricsItem = ({
    metrics,
    desc,
  }: {
    metrics: string;
    desc: string;
  }) => {
    return (
      <StyledMetricsItem
        active={currentMetrics === metrics}
        onClick={() => setCurrentMetrics(metrics)}
      >
        {desc}
      </StyledMetricsItem>
    );
  };

  const sidebar = useMemo(() => {
    if (currentMetrics === "NOTFOUND_LINK") {
      return <MetricsItem metrics="NOTFOUND_LINK" desc="失效链接未返回404" />;
    }
    if (currentMetrics === "SITEMAP") {
      return <MetricsItem metrics="SITEMAP" desc="sitemap.xml" />;
    }
    if (currentMetrics === "ROBOTS") {
      return <MetricsItem metrics="ROBOTS" desc="robots.txt" />;
    }
    if (currentMetrics === "DEAD_LINK") {
      return <MetricsItem metrics="DEAD_LINK" desc="损坏的链接（死链）" />;
    }
    if (currentMetrics === "RENDER_PATTERN") {
      return <MetricsItem metrics="RENDER_PATTERN" desc="页面渲染模式" />;
    }
    if (pageDrawer.currentPage?.redirectLocation) {
      return (
        <MetricsItem
          metrics="REDIRECTION"
          desc={`${pageDrawer.currentPage.statusCode}重定向页面`}
        />
      );
    }
    return (
      <>
        <MetricsItem metrics="URL_DEPTH" desc="页面深度" />
        <MetricsItem metrics="IMG_ALT" desc="图片Alt" />
        <MetricsItem metrics="TITLE" desc="标题" />
        <MetricsItem metrics="DESCRIPTION" desc="描述" />
        <MetricsItem metrics="H1" desc="H1" />
        <MetricsItem metrics="META_LANGUAGE" desc="Meta Langauge" />
      </>
    );
  }, [pageDrawer.currentPage, currentMetrics]);

  return (
    <Drawer
      title={
        <>
          <a href={pageDrawer.currentPage?.url} target="_blank">
            {pageDrawer.currentPage?.url}
          </a>
        </>
      }
      placement="right"
      onClose={onDrawerClose}
      open={pageDrawer.visible}
      maskStyle={{
        opacity: 0.5,
      }}
      bodyStyle={{
        padding: 0,
      }}
      headerStyle={{
        borderBottom: "1px solid #e1e3e6",
      }}
      width={"70%"}
    >
      <FlexRow
        style={{
          height: "100%",
        }}
      >
        <SideBar>{sidebar}</SideBar>
        <MainContainer>{content}</MainContainer>
      </FlexRow>
    </Drawer>
  );
}

export default observer(PageDetail);

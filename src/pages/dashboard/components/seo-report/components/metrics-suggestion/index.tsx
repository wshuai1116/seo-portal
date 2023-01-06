import { CenterItem, FlexColumn, FlexRow } from "@/components/display/Flex";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import iconDescription from "@/assets/seo/icon-metrics-description.svg";
import iconSuggestion from "@/assets/seo/icon-metrics-suggestion.svg";
import { TaskSummary } from "@/query/analysis/types";
import TextArea from "antd/lib/input/TextArea";
import { Divider } from "antd";

const Root = styled(FlexColumn)`
  width: 100%;
  border: 1px solid #e1e3e6;
  border-radius: 8px;
`;

const SuggestionContainer = styled.div`
  padding: 15px;
  background: rgba(90, 138, 234, 0.1);
  color: #1a315e;
`;

const TitleRow = styled(FlexRow)`
  align-items: center;
  margin-bottom: 4px;
`;

const Content = styled(FlexColumn)`
  margin-left: 29px;
  font-weight: 400;
  font-size: 14px;
`;

const StyledIcon = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 10px;
`;

const ExampleBlock = styled(FlexRow)`
  background: #f8f9fc;
  border: 1px solid #e1e3e6;
  border-radius: 8px;
  padding: 10px;
  margin-top: 4px;
  flex: 1;

  pre {
    margin-bottom: 0;
  }
`;

function MetricsSuggestion({
  metricsCategory,
  taskSummary,
  style,
}: {
  metricsCategory: string;
  taskSummary: TaskSummary;
  style?: React.CSSProperties;
}) {
  const navigate = useNavigate();

  const content = useMemo(() => {
    if (metricsCategory === "URL_DEPTH") {
      return (
        <>
          <div>扁平化结构有助于搜索引擎更快发现页面内容，建议不超过3个层级</div>
          <div>
            示例：将 https://www.example.com/product/hot/shoes/Nike 改为
            https://www.example.com/product/hot-shoes-nike
          </div>
        </>
      );
    }
    if (metricsCategory === "URL_NAMING") {
      return (
        <>
          <div>
            遵循命名规范：小写字母，保持在100个字符以下，使用连字符而不是下划线，避免使用非
            ASCII 字符，避免在URL末尾添加不必要的扩展名如：.htm, .html, .shtml,
            .php, .jsp ,.asp,避免使用URL参数，避免使用符号：$ + *
            %,避免使用长ID。
          </div>
        </>
      );
    }
    if (metricsCategory === "SITEMAP") {
      return (
        <>
          <div>
            在网站根目录放置正确的sitemap.xml文件，方便网站管理员通知搜索引擎网站上有哪些可供抓取的网页
          </div>
          <FlexRow>
            <ExampleBlock>
              <pre>{`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>https://www.example.com</loc>
        <lastmod>2022-07-15T16:32:39+08:00</lastmod>
    </url>
    <url>
        <loc>https://www.example.com/blog</loc>
        <lastmod>2022-07-15T16:32:39+08:00</lastmod>
    </url>
</urlset>`}</pre>
            </ExampleBlock>
          </FlexRow>
        </>
      );
    }
    if (metricsCategory === "ROBOTS") {
      return (
        <>
          <div>
            在网站根目录设置正确的robots.txt文件，用于管理搜索引擎爬虫爬取网站时的流量，防止某些文件被搜索引擎发现
          </div>
          <FlexRow>
            <ExampleBlock>
              <pre>{`Sitemap: https://www.example.com/sitemap.xml 

User-agent: * 
Allow: /$ 
Allow: /blog 
Allow: /contact 
Disallow: /login 
Disallow: /pay`}</pre>
            </ExampleBlock>
          </FlexRow>
        </>
      );
    }
    if (metricsCategory === "NOTFOUND_LINK") {
      return (
        <>
          <div>网站设置统一的404页面，并返回404状态码</div>
        </>
      );
    }
    if (metricsCategory === "DEAD_LINK") {
      return (
        <>
          <div>删除或修复这些链接</div>
        </>
      );
    }
    if (metricsCategory === "RENDER_PATTERN") {
      return (
        <>
          <div>修改页面的渲染模式为服务端渲染</div>
        </>
      );
    }
    if (metricsCategory === "H1") {
      return (
        <>
          <div>一个页面必须有且仅有一个H1标签，将关键词用于H1标签中</div>
        </>
      );
    }
    if (metricsCategory === "META_LANGUAGE") {
      return (
        <>
          <div>根据当前页面语言填写lang属性，便于搜索引擎辨认页面语言</div>
        </>
      );
    }
    if (metricsCategory === "IMG_ALT") {
      return (
        <>
          <div>
            每张图片都必须要有alt信息（描述图片含义，可适当放置关键词），装饰性图像不可过度描述，应该将alt属性设置为空（alt="")
            图片文件名也可放置关键词。
          </div>
          <FlexRow>
            <ExampleBlock>
              <pre>{`<img src="/images/logo" alt="example.com logo" />`}</pre>
            </ExampleBlock>
          </FlexRow>
        </>
      );
    }
    if (metricsCategory === "TITLE") {
      if (taskSummary.isChinese === 1) {
        return (
          <>
            <div>
              标题的长度应在15-30个字符，内容不能和已有页面重复，核心关键词铺设1-3个（词组重复不能超过3次）
            </div>
          </>
        );
      } else {
        return (
          <>
            <div>
              标题的长度应在30-60个字符，内容不能和已有页面重复，核心关键词铺设1-3个（词组重复不能超过3次）
            </div>
          </>
        );
      }
    }
    if (metricsCategory === "DESCRIPTION") {
      if (taskSummary.isChinese === 1) {
        return (
          <>
            <div>
              长度在78个字以内，内容不能和已有页面重复，核心关键词铺设3-5个（词组重复不能超过3次）
            </div>
          </>
        );
      } else {
        return (
          <>
            <div>
              长度在110-160字符，内容不能和已有页面重复，核心关键词铺设3-5个（词组重复不能超过3次）
            </div>
          </>
        );
      }
    }
  }, [metricsCategory, taskSummary]);

  return (
    <Root
      style={{
        ...style,
      }}
    >
      <SuggestionContainer>
        <TitleRow>
          <StyledIcon src={iconSuggestion} /> <span>修改建议</span>
        </TitleRow>
        <Content>{content}</Content>
      </SuggestionContainer>
    </Root>
  );
}

export default MetricsSuggestion;

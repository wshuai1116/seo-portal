import { CenterItem, FlexColumn, FlexRow } from "@/components/display/Flex";
import * as notification from "@/components/display/Notification";
import { useGetLatestTask } from "@/query/analysis";
import { AnalysisItem, AnalysisMetrics } from "@/query/analysis/types";
import { useOrganization } from "@/query/organization";
import { useProject } from "@/query/project";
import {
  ArrowRightOutlined,
  CopyOutlined,
  InfoCircleOutlined
} from "@ant-design/icons";
import { Divider, Input } from "antd";
import copy from "copy-to-clipboard";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate, useSearchParams } from "react-router-dom";
import styled from "styled-components";

const Root = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  overflow-y: auto;
`;

const ViewSwitch = styled(CenterItem)`
  width: 100%;
  height: 44px;
  background: #edf8ff;
  position: fixed;
  top: 0;
  text-align: center;
  text-decoration-line: underline;
  color: #49a8ff;
  cursor: pointer;
`;

const MetricsItem = styled.div`
  margin: 10px 0px;
`;

const PreviewArea = styled(FlexRow)`
  border-radius: 4px;
  border: 1px solid black;
  margin-bottom: 10px;
  position: relative;
`;

const UrlTitle = styled.span`
  font-size: 16px;
  font-weight: bold;
  color: black;
  margin-right: 15px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 500px;
`;

const ItemCount = styled(CenterItem)`
  font-size: 12px;
  font-weight: bold;
  color: black;
  padding: 0 8px;
  border-radius: 100px;
  background: #ffd9d7;
`;

const ToolArea = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
  cursor: pointer;
`;

const Arrow = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
  background-color: white;
  border: 1px solid #b0b0b0;
  border-radius: 4px;
  padding: 3px 10px;
`;

const textAreaProps = {
  autoFocus: true,
  rows: 4,
  autoSize: { minRows: 4, maxRows: 10 },
  bordered: false,
  style: {
    color: "black",
    padding: 15,
  },
};

function SeoDeveloperView() {
  const [params, setParams] = useSearchParams();

  const { data: organization } = useOrganization();
  const { data: project, remove } = useProject();

  const { data: taskSummary, refetch } = useGetLatestTask(project?.projectId);
  const navigate = useNavigate();

  const [urlMap, setUrlMap] = useState<Map<any, any>>();

  useEffect(() => {
  }, []);

  useEffect(() => {
    if (!taskSummary) {
      return;
    }
    groupList();
  }, [taskSummary]);

  const groupList = () => {
    let urlMap = new Map();
    taskSummary?.metricsList.forEach((metrics: AnalysisMetrics) => {
      metrics.items.forEach((item: AnalysisItem) => {
        if (urlMap.has(item.url)) {
          urlMap.get(item.url).forEach((m) => {
            if (item.metricsId === m.metrics.metricsId) {
              m.items.push(item);
            } else {
              let filter = urlMap
                .get(item.url)
                .find((v: any) => v.metrics.metricsId === metrics.metricsId);
              if (!filter) {
                urlMap.get(item.url).push({
                  metrics: metrics,
                  items: [item],
                });
              }
            }
          });
        } else {
          urlMap.set(item.url, [
            {
              metrics: metrics,
              items: [item],
            },
          ]);
        }
      });
    });
    setUrlMap(urlMap);
  };

  const getItemCount = (urlKey: string) => {
    let count = 0;
    urlMap.get(urlKey).forEach((v) => {
      count += v.items.length;
    });
    return count;
  };

  const getMetrics = (mapItem: any) => {
    return (
      <MetricsItem>
        <FlexRow
          center
          style={{
            marginBottom: 10,
          }}
        >
          <InfoCircleOutlined
            style={{
              marginRight: 20,
              color: "red",
            }}
          />
        </FlexRow>
        <FlexRow
          style={{
            marginBottom: 10,
          }}
        >
          建议 : {mapItem.metrics.suggestion}
        </FlexRow>
        {mapItem.items.map((item: AnalysisItem) => {
          if (mapItem.metrics.metricsCategory === "TITLE") {
            return getPreview(item.data?.title, item.comment?.title);
          }
          if (mapItem.metrics.metricsCategory === "DESCRIPTION") {
            return getPreview(
              item.data?.description,
              item.comment?.description
            );
          }
          if (mapItem.metrics.metricsCategory === "META_LANGUAGE") {
            return getPreview(item.data?.element, item.comment?.element);
          }
          if (mapItem.metrics.metricsCategory === "H1") {
            return <></>;
          }
          if (mapItem.metrics.metricsCategory === "IMG_ALT") {
            return getPreview(item.data?.element, item.comment?.element);
          }
          if (mapItem.metrics.metricsCategory === "SITEMAP") {
            return getPreview(item.data?.sitemap, item.comment?.sitemap);
          }
          if (mapItem.metrics.metricsCategory === "ROBOTS") {
            return getPreview(item.data?.robotsTxt, item.comment?.robotsTxt);
          }
          if (mapItem.metrics.metricsCategory === "NOTFOUND_LINK") {
            return <></>;
          }
          if (mapItem.metrics.metricsCategory === "URL_DEPTH") {
            return getPreview(item.data?.url, item.comment?.url);
          }
          if (mapItem.metrics.metricsCategory === "DEAD_LINK") {
            return <></>;
          }
          return <></>;
        })}
      </MetricsItem>
    );
  };

  const getPreview = (
    prev: string,
    after: string,
    toolButton?: React.ReactNode
  ) => {
    return (
      <PreviewArea>
        <Input.TextArea
          {...textAreaProps}
          readOnly={true}
          value={prev ? prev : "未发现"}
        />
        <div
          style={{
            position: "relative",
          }}
        >
          <Divider
            type="vertical"
            style={{
              height: "100%",
              backgroundColor: "#b0b0b0",
            }}
          />
          <Arrow>
            <ArrowRightOutlined />
          </Arrow>
        </div>
        <Input.TextArea {...textAreaProps} readOnly={true} value={after} />
        <ToolArea>
          {toolButton ? (
            toolButton
          ) : (
            <CopyOutlined
              onClick={() => {
                copy(after, {
                  format: "text/plain",
                });
                notification.success("复制成功");
              }}
            />
          )}
        </ToolArea>
      </PreviewArea>
    );
  };

  if(!project) {
    return <></>
  }

  return (
    <Root>
      <Helmet>
        <title>SeoReport</title>
      </Helmet>
      {urlMap ? (
        <>
          <FlexColumn
            style={{
              width: "100%",
              overflowY: "auto",
            }}
          >
            {Array.from(urlMap.entries()).map((entry) => {
              const [key, value] = entry;
              return (
                <FlexColumn
                  style={{
                    marginTop: 50,
                    width: "100%",
                  }}
                >
                  <FlexRow
                    style={{
                      width: "100%",
                    }}
                  >
                    <UrlTitle>{key}</UrlTitle>
                    <ItemCount>{getItemCount(key)}</ItemCount>
                  </FlexRow>
                  <Divider />
                  {value.map((v) => {
                    return getMetrics(v);
                  })}
                </FlexColumn>
              );
            })}
          </FlexColumn>
          <ViewSwitch
            onClick={() =>
              navigate(
                `/organization/${organization.organizationId}/project/${project.projectId}/seo-report`
              )
            }
          >
            切换到修改者视图
          </ViewSwitch>
        </>
      ) : null}
    </Root>
  );
}

export default SeoDeveloperView;

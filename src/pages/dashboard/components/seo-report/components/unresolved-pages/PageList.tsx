import iconHistory from "@/assets/seo/icon-history.svg";
import SBFlex, { FlexColumn, FlexRow } from "@/components/display/Flex";
import * as notification from "@/components/display/Notification";
import { listAnalysisPages } from "@/query/analysis";
import {
  AnalysisPage,
  AnalysisPagePaginationResult,
  TaskSummary,
} from "@/query/analysis/types";
import { List } from "antd";
import moment from "moment";
import { useEffect, useState, useMemo } from "react";
import styled from "styled-components";
import MetricsLevelIcon from "../metrics-level-icon";
import { pageDrawer } from "../page-detail/states";

import { observer } from "mobx-react-lite";
import { getIssueByCodes } from "@/utils/issue";
import { useOrganization } from "@/query/organization";
import StatusCodeIcon from "../status-code-icon";

const PageItem = styled(FlexColumn)`
  border: 1px solid #e1e3e6;
  border-radius: 8px;
  padding: 14px;
  gap: 10px;
  margin-bottom: 6px;
`;

const PageUrl = styled(FlexRow)`
  max-width: 80%;
  white-space: pre-wrap;
  cursor: pointer;
`;

const PageList = ({
  taskSummary,
  initPages,
  metricsCategory,
}: {
  taskSummary: TaskSummary;
  initPages: AnalysisPagePaginationResult;
  metricsCategory: string;
}) => {
  const pageSize = 20;
  const [pageNum, setPageNum] = useState(1);
  const [pages, setPages] = useState(initPages);
  const [openedPage, setOpenedPage] = useState<AnalysisPage | undefined>(
    undefined
  );

  const { data: organization } = useOrganization();

  useEffect(() => {
    if (!pageDrawer.currentPage) {
      return;
    }
    if (pages.result.find((p) => p.url === pageDrawer.currentPage?.url)) {
      setOpenedPage(pageDrawer.currentPage);
    }
  }, [pageDrawer.currentPage]);

  useEffect(() => {
    if (!pageDrawer.visible && openedPage) {
      // refresh current page with same url
      fetchPage(pageNum);
      setOpenedPage(undefined);
    }
  }, [pageDrawer.visible]);

  const fetchPage = (pageNum: number) => {
    setPageNum(pageNum);
    listAnalysisPages({
      taskId: taskSummary.taskId,
      metricsCategory: metricsCategory,
      passStatus: "NO_PASS",
      pageNum: pageNum,
      pageSize: pageSize,
    })
      .then(({ result }) => {
        setPages(result);
      })
      .catch((err) => {
        notification.error(err.message);
      });
  };

  const isFree = useMemo(() => {
    return (
      organization.userSubscription.subscription.subscriptionType === "FREE"
    );
  }, [organization]);

  const openDetail = (page: AnalysisPage) => {
    if (isFree) {
      return;
    }
    pageDrawer.open(page, taskSummary, metricsCategory);
    setOpenedPage(page);
  };

  return (
    <>
      <List
        dataSource={pages.result}
        renderItem={(page: AnalysisPage) => (
          <PageItem>
            <FlexRow
              center
              style={{
                gap: 8,
              }}
            >
              <StatusCodeIcon statusCode={page.statusCode} />
              <PageUrl onClick={() => openDetail(page)}>{page.url}</PageUrl>
            </FlexRow>
            <SBFlex>
              <FlexRow
                style={{
                  flexWrap: "wrap",
                  gap: 12,
                }}
              >
                {page.metricsList.map((metrics) => {
                  return (
                    <>
                      <FlexRow
                        center
                        style={{
                          color: "rgba(31, 31, 31, 0.6)",
                        }}
                      >
                        <MetricsLevelIcon level={metrics.metricsLevel} />
                        {getIssueByCodes(metrics.issueCodes)}
                      </FlexRow>
                    </>
                  );
                })}
              </FlexRow>
              {page.commentUser ? (
                <FlexRow
                  center
                  style={{
                    gap: 6,
                    fontSize: 12,
                  }}
                >
                  <img src={iconHistory} />{" "}
                  <span>{page.commentUser.nickname}</span>
                  <span>·</span>
                  <span
                    style={{
                      color: "rgba(31, 31, 31, 0.6)",
                    }}
                  >
                    {moment(page.commentTime).format("YYYY/MM/DD HH:mm:ss")}
                  </span>
                </FlexRow>
              ) : null}
            </SBFlex>
          </PageItem>
        )}
        pagination={
          pages.total <= pageSize
            ? false
            : {
                total: pages.total,
                pageSize: pageSize,
                showSizeChanger: false,
                style: {
                  textAlign: "center",
                },
                onChange(page) {
                  fetchPage(page);
                },
              }
        }
      />
    </>
  );
};

export default observer(PageList);

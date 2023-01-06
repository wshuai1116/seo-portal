import iconPass from "@/assets/seo/icon-pass.svg";
import SBFlex, { FlexColumn, FlexRow } from "@/components/display/Flex";
import { useListAnalysisPage } from "@/query/analysis";
import {
  AnalysisMetrics,
  AnalysisPage,
  TaskSummary,
} from "@/query/analysis/types";
import { useOrganization } from "@/query/organization";
import { getIssueByCodes } from "@/utils/issue";
import { List } from "antd";
import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Nodata } from "../../../shared";
import MetricsLevelIcon from "../metrics-level-icon";
import PageDetail from "../page-detail";
import { pageDrawer } from "../page-detail/states";
import StatusCodeIcon from "../status-code-icon";

const Root = styled.div`
  border: 1px solid #e1e3e6;
  border-radius: 8px;
  border-top-left-radius: 0;
`;

const MainContainer = styled(FlexColumn)`
  padding: 14px;
`;

const PageItem = styled(FlexColumn)`
  border: 1px solid #e1e3e6;
  border-radius: 8px;
  padding: 14px;
  gap: 10px;
  margin-bottom: 6px;
`;

const PageUrl = styled(FlexRow)`
  width: 80%;
  white-space: pre-wrap;
  cursor: pointer;
`;

function AllPages({ taskSummary }: { taskSummary: TaskSummary }) {
  const navigate = useNavigate();

  const [currentCategory, setCurrentCategory] = useState<string | undefined>(
    undefined
  );

  const pageSize = 20;
  const [pageNum, setPageNum] = useState(1);

  const { data: pages, refetch } = useListAnalysisPage({
    taskId: taskSummary.taskId,
    analysisCategory: currentCategory,
    pageNum: pageNum,
    pageSize: pageSize,
  });

  const { data: organization } = useOrganization();

  useEffect(() => {
    refetch();
  }, [currentCategory]);

  useEffect(() => {
    refetch();
  }, [pageNum]);

  const isAllPass = (metricsList: AnalysisMetrics[]) => {
    const noPass = metricsList.find((m) => m.passStatus === "NO_PASS");
    if (noPass) {
      return false;
    } else {
      return true;
    }
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
    if (page.metricsList.length) {
      const noPassList = page.metricsList.filter((m) => {
        return m.passStatus === "NO_PASS";
      });
      pageDrawer.open(
        page,
        taskSummary,
        noPassList.length > 0
          ? noPassList[0].metricsCategory
          : page.metricsList[0].metricsCategory
      );
    } else {
      pageDrawer.open(page, taskSummary, null);
    }
  };

  if (!pages) {
    return <></>;
  }

  return (
    <Root>
      {/* <AnalysisCategorySelector
        onSelect={(analysisCategory) => {
          setCurrentCategory(analysisCategory);
        }}
      /> */}
      <MainContainer>
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
                  {isAllPass(page.metricsList) ? (
                    <>
                      <span>
                        <img src={iconPass} />
                        检查通过
                      </span>
                    </>
                  ) : (
                    page.metricsList.map((metrics) => {
                      return (
                        <>
                          {metrics.passStatus === "NO_PASS" ? (
                            <FlexRow
                              center
                              style={{
                                color: "rgba(31, 31, 31, 0.6)",
                              }}
                            >
                              <MetricsLevelIcon level={metrics.metricsLevel} />
                              {getIssueByCodes(metrics.issueCodes)}
                            </FlexRow>
                          ) : null}
                        </>
                      );
                    })
                  )}
                </FlexRow>
              </SBFlex>
            </PageItem>
          )}
          locale={{
            emptyText: <Nodata />,
          }}
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
                    setPageNum(page);
                  },
                }
          }
        />
      </MainContainer>
      <PageDetail />
    </Root>
  );
}

export default AllPages;

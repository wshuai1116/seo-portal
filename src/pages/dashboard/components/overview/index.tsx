import iconSecurity from "@/assets/audit/icon-security.svg";
import iconStatusCode from "@/assets/audit/icon-status-code.svg";
import iconStructure from "@/assets/audit/icon-structure.png";
import iconRedo from "@/assets/common/icon-redo.svg";
import iconFixActive from "@/assets/dashboard/icon-fix-active.svg";
import iconScore from "@/assets/dashboard/icon-score.svg";
import iconLink from "@/assets/seo/icon-link-open.svg";
import Button from "@/components/base/Button";
import SBFlex, {
  CenterItem,
  FlexColumn,
  FlexRow,
} from "@/components/display/Flex";
import * as notification from "@/components/display/Notification";
import {
  analysisSite,
  useGetLatestTask,
  useGetTaskLinkLatestStatistic,
} from "@/query/analysis";
import queryClient from "@/query/client";
import { useOrganization } from "@/query/organization";
import { useProject } from "@/query/project/useProject";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Gauge, Pie } from "@ant-design/plots";
import { Modal } from "antd";
import { useEffect, useMemo } from "react";
import { Helmet } from "react-helmet";
import { useNavigate, useParams } from "react-router-dom";
import styled, { css } from "styled-components";
import DashboardNav from "../nav";
import { Nodata, securityList, structureList } from "../shared";

const Root = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #fcfcfc;
`;

const MainContainer = styled(FlexColumn)`
  width: 100%;
  padding: 20px;
  overflow-y: auto;
  flex: 1;
`;

const TitleBar = styled(SBFlex)`
  background-color: white;
  padding: 12px 20px;
  width: 100%;
  align-items: center;
  border-bottom: 1px solid #e1e3e6;
`;

const SectionTitle = styled.span`
  color: #000000;
  font-size: 28px;
`;

const ProjectLink = styled.span`
  padding: 5px 10px;
  background: rgba(31, 31, 31, 0.06);
  border-radius: 4px;
  margin-left: 18px;
  cursor: pointer;
`;

const StatisticContainer = styled(FlexColumn)`
  border: 1px solid #e1e3e6;
  border-radius: 8px;
  overflow: hidden;
`;

const StatisticTitle = styled(FlexRow)`
  font-size: 16px;
  font-weight: 500;
  color: #1f1f1f;
  padding: 15px;
  border-bottom: 1px solid #e1e3e6;
  align-items: center;
  img {
    margin-right: 4px;
    width: 24px;
    height: 24px;
  }
`;

const StatisticContent = styled(FlexColumn)`
  padding: 15px 0px;
  font-weight: 400;
  font-size: 12px;
`;

const StyledStatisticRow = styled(SBFlex)`
  font-weight: 400;
  font-size: 12px;
  padding: 7px 15px;
`;

const StatisticValue = styled(SBFlex)`
  width: 80px;
  font-weight: 400;
  font-size: 12px;
  color: rgba(31, 31, 31, 0.6);
`;

const ScoreProgress = styled(Gauge)`
  width: 220px;
  height: 110px !important;
`;

const ScoreItemDot = styled.div<{
  color?: string;
}>`
  ${(props) =>
    css`
      background: ${props.color};
    `}
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 10px;
  margin-right: 5px;
`;

const FixBtn = styled(Button)`
  width: 114px;
  cursor: pointer;
  color: #5a65ea;
`;

function Overview() {
  const { data: organization } = useOrganization();
  const { data: project } = useProject();
  const { projectId } = useParams();
  const {
    data: statistic,
    refetch: statisticRefetch,
    isFetched: statisticFetched,
  } = useGetTaskLinkLatestStatistic(projectId);

  const {
    data: taskSummary,
    refetch: taskRefetch,
    isFetched: taskFetched,
  } = useGetLatestTask(projectId);

  const navigate = useNavigate();

  useEffect(() => {
    statisticRefetch();
    taskRefetch();
  }, [projectId]);

  const showReCrawlConfirm = () => {
    Modal.confirm({
      title: "重新爬取 - 确认",
      icon: <ExclamationCircleOutlined />,
      content: <p>重新爬取将清空之前的历史数据，您确认要执行吗？</p>,
      maskClosable: true,
      onOk() {
        analysisSite(organization!.organizationId, project!.siteUrl)
          .then(({ result }) => {
            queryClient.invalidateQueries("listOrgRunningTask");
          })
          .catch((err) => {
            notification.error(err.message);
          });
      },
      okText: "确认",
      cancelText: "取消",
      zIndex: 9999,
    });
  };

  const pieData = useMemo(() => {
    let arr = [];
    if (!!statistic?.totalUrlStatusCode1xx) {
      arr.push({
        type: "消息响应 1xx",
        value: statistic?.totalUrlStatusCode1xx,
        objectKey: "totalUrlStatusCode1xx",
      });
    }
    if (!!statistic?.totalUrlStatusCode2xx) {
      arr.push({
        type: "成功响应 2xx",
        value: statistic?.totalUrlStatusCode2xx,
        objectKey: "totalUrlStatusCode2xx",
      });
    }
    if (!!statistic?.totalUrlStatusCode3xx) {
      arr.push({
        type: "重定向 3xx",
        value: statistic?.totalUrlStatusCode3xx,
        objectKey: "totalUrlStatusCode3xx",
      });
    }
    if (!!statistic?.totalUrlStatusCode4xx) {
      arr.push({
        type: "客户端错误 4xx",
        value: statistic?.totalUrlStatusCode4xx,
        objectKey: "totalUrlStatusCode4xx",
      });
    }
    if (!!statistic?.totalUrlStatusCode5xx) {
      arr.push({
        type: "服务器端错误 5xx",
        value: statistic?.totalUrlStatusCode5xx,
        objectKey: "totalUrlStatusCode5xx",
      });
    }
    return arr;
  }, [statistic]);

  const isEmpty = useMemo(() => {
    return statisticFetched && taskFetched && (!statistic || !taskSummary);
  }, [statisticFetched, taskFetched, statistic, taskSummary]);

  const getProportion = (count?: number) => {
    if (!statistic || !count) {
      return "0%";
    }
    return parseFloat(((count / statistic.totalUrl) * 100).toFixed(2)) + "%";
  };

  const StatisticRow = ({
    objectKey,
    desc,
  }: {
    objectKey: string;
    desc: string;
  }) => {
    if (!statistic) {
      return <></>;
    }
    type ObjectKey = keyof typeof statistic;

    return (
      <StyledStatisticRow>
        <span>{desc}</span>
        <StatisticValue>
          <span>{statistic[objectKey as ObjectKey]}</span>
          <span>{getProportion(statistic[objectKey as ObjectKey])}</span>
        </StatisticValue>
      </StyledStatisticRow>
    );
  };

  const StatusCodePie = useMemo(
    () => (
      <Pie
        data={pieData}
        angleField="value"
        colorField="type"
        appendPadding={50}
        radius={1}
        innerRadius={0.8}
        label={{
          type: "inner",
          content: "",
        }}
        statistic={{
          title: false,
          content: {
            style: {
              whiteSpace: "pre-wrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            },
            content: "",
          },
        }}
      />
    ),
    [pieData]
  );

  if (!taskFetched || !statisticFetched) {
    return <></>;
  }

  return (
    <Root>
      <Helmet>
        <title>概览</title>
      </Helmet>
      {project ? (
        <>
          <DashboardNav title="概览" />
          <TitleBar>
            <FlexRow center>
              <SectionTitle>概览</SectionTitle>
              <ProjectLink onClick={() => window.open(project.siteUrl)}>
                {project.siteUrl} <img src={iconLink} />
              </ProjectLink>
            </FlexRow>
            <FlexRow center>
              <Button type="default" onClick={() => showReCrawlConfirm()}>
                <img src={iconRedo} /> 重新爬取
              </Button>
              <Button
                type="primary"
                onClick={() => {
                  navigate(
                    `/organization/${organization.organizationId}/seo-create-project`
                  );
                }}
                style={{
                  marginLeft: 8,
                }}
              >
                创建新项目
              </Button>
            </FlexRow>
          </TitleBar>
          <MainContainer>
            <FlexRow
              style={{
                gap: 20,
              }}
            >
              <FlexColumn
                style={{
                  width: "60%",
                  gap: 20,
                }}
              >
                <StatisticContainer>
                  <StatisticTitle
                    style={{
                      justifyContent: "space-between",
                    }}
                  >
                    <FlexRow>
                      <img src={iconScore} />
                      网站得分
                    </FlexRow>
                    <FixBtn
                      type="text"
                      onClick={() => {
                        navigate(
                          `/organization/${organization.organizationId}/project/${projectId}/seo-report`
                        );
                      }}
                    >
                      <img src={iconFixActive} /> 立即修复
                    </FixBtn>
                  </StatisticTitle>
                  <StatisticContent
                    style={{
                      minHeight: "auto",
                    }}
                  >
                    {!isEmpty ? (
                      <>
                        <FlexRow
                          center
                          style={{
                            justifyContent: "space-evenly",
                          }}
                        >
                          <ScoreProgress
                            startAngle={Math.PI}
                            endAngle={2 * Math.PI}
                            innerRadius={0.7}
                            indicator={false}
                            range={{
                              color: "#5A65EA",
                              width: 30,
                            }}
                            percent={taskSummary?.totalScore}
                            statistic={{
                              title: {
                                offsetY: -12,
                                style: {
                                  fontSize: "54px",
                                  fontWeight: "500",
                                },
                                content: taskSummary?.totalScore + "",
                              },
                            }}
                          />
                          <FlexColumn
                            style={{
                              gap: 10,
                            }}
                          >
                            <div>
                              问题{" "}
                              {taskSummary?.criticalCount +
                                taskSummary?.mediumCount +
                                taskSummary?.lowCount +
                                taskSummary?.optionalCount}
                            </div>
                            <div>
                              <ScoreItemDot color="#FC7E7E" />
                              严重 ({taskSummary?.criticalCount})
                            </div>
                            <div>
                              <ScoreItemDot color="linear-gradient(0deg, #F4D072, #F4D072), #BCD1FF;" />
                              中等 ({taskSummary?.mediumCount})
                            </div>
                            <div>
                              <ScoreItemDot color="#93AEE3" />
                              轻度 ({taskSummary?.lowCount})
                            </div>
                            <div>
                              <ScoreItemDot color="linear-gradient(0deg, #E0E0E0, #E0E0E0), #FFD978;" />
                              可选 ({taskSummary?.optionalCount})
                            </div>
                          </FlexColumn>
                        </FlexRow>
                      </>
                    ) : (
                      <Nodata />
                    )}
                  </StatisticContent>
                </StatisticContainer>
                <FlexRow
                  style={{
                    gap: 20,
                  }}
                >
                  <StatisticContainer
                    style={{
                      flex: 1,
                    }}
                  >
                    <StatisticTitle>
                      <img src={iconStructure} />
                      网站结构
                    </StatisticTitle>
                    <StatisticContent>
                      {!isEmpty ? (
                        <>
                          {structureList.map((i) => {
                            return (
                              <StatisticRow
                                key={i.objectKey}
                                objectKey={i.objectKey}
                                desc={i.desc}
                              />
                            );
                          })}
                        </>
                      ) : (
                        <Nodata />
                      )}
                    </StatisticContent>
                  </StatisticContainer>
                  <StatisticContainer
                    style={{
                      flex: 1,
                    }}
                  >
                    <StatisticTitle>
                      <img src={iconSecurity} />
                      安全
                    </StatisticTitle>
                    <StatisticContent>
                      {!isEmpty ? (
                        <>
                          {securityList.map((i) => {
                            return (
                              <StatisticRow
                                key={i.objectKey}
                                objectKey={i.objectKey}
                                desc={i.desc}
                              />
                            );
                          })}
                        </>
                      ) : (
                        <Nodata />
                      )}
                    </StatisticContent>
                  </StatisticContainer>
                </FlexRow>
              </FlexColumn>
              <StatisticContainer
                style={{
                  flex: 1,
                }}
              >
                <StatisticTitle>
                  <img src={iconStatusCode} />
                  返回码
                </StatisticTitle>
                <StatisticContent
                  style={{
                    height: "100%",
                  }}
                >
                  {!isEmpty ? StatusCodePie : <Nodata />}
                </StatisticContent>
              </StatisticContainer>
            </FlexRow>
          </MainContainer>
        </>
      ) : null}
    </Root>
  );
}

export default Overview;

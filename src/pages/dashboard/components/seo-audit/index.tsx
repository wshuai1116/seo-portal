import iconRedo from "@/assets/common/icon-redo.svg";
import iconLink from "@/assets/seo/icon-link-open.svg";
import iconCollapse from "@/assets/audit/icon-collapse.svg";
import iconDatalist from "@/assets/audit/icon-datalist.svg";
import iconExpand from "@/assets/audit/icon-expand.svg";
import iconSecurity from "@/assets/audit/icon-security.svg";
import iconStatusCode from "@/assets/audit/icon-status-code.svg";
import iconStructure from "@/assets/audit/icon-structure.png";
import iconFilter from "@/assets/common/icon-filter.svg";
import iconFilterActive from "@/assets/common/icon-filter-active.svg";
import iconVisit from "@/assets/common/icon-visit.svg";
import iconVisitActive from "@/assets/common/icon-visit-active.svg";
import iconChecked from "@/assets/common/icon-checked.svg";
import Button from "@/components/base/Button";
import SBFlex, {
  CenterItem,
  FlexColumn,
  FlexRow,
} from "@/components/display/Flex";
import * as notification from "@/components/display/Notification";
import {
  analysisSite,
  useGetTaskLinkLatestStatistic,
  useListTaskLatestLinks,
} from "@/query/analysis";
import { TaskLink } from "@/query/analysis/types";
import queryClient from "@/query/client";
import { useOrganization } from "@/query/organization";
import { useProject } from "@/query/project/useProject";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Modal, Popover, Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate, useParams } from "react-router-dom";
import styled, { css } from "styled-components";
import DashboardNav from "../nav";
import { Pie } from "@ant-design/plots";
import { bytesToSize } from "@/utils/format";
import { linkDrawer } from "./states";
import LinkDetail from "./link-detail";
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

const UrlTableCell = styled.div`
  display: inline-block;
  width: 300px;
`;

const UrlText = styled.span`
  cursor: pointer;
  :hover {
    text-decoration: underline;
  }
`;

const SectionSubTitle = styled(SBFlex)`
  font-size: 18px;
  align-items: center;
  margin-bottom: 14px;

  img {
    cursor: pointer;
    margin-right: 8px;
  }
`;

const StatisticContainer = styled(FlexColumn)`
  border: 1px solid #e1e3e6;
  border-radius: 8px;
  overflow: hidden;
  margin-right: 20px;
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
  cursor: pointer;
  padding: 7px 15px;

  :hover {
    background: rgba(222, 224, 250, 0.6);
  }
`;

const StatisticValue = styled(SBFlex)`
  width: 80px;
  font-weight: 400;
  font-size: 12px;
  color: rgba(31, 31, 31, 0.6);
`;

const FilterBtn = styled(FlexRow)<{
  active?: boolean;
}>`
  align-items: center;
  cursor: pointer;
  padding: 6px 8px;
  font-size: 14px;
  font-weight: 400;
  :hover {
    ${(props) =>
      props.active
        ? css`
            background: rgba(90, 101, 234, 0.15);
          `
        : css`
            background: rgba(31, 31, 31, 0.07);
          `}
    border-radius: 4px;
  }
  ${(props) =>
    props.active
      ? css`
          color: #5a65ea;
        `
      : css`
          color: rgba(31, 31, 31, 0.75);
        `}
`;

const StyledFilterRow = styled(SBFlex)<{
  active?: boolean;
}>`
  text-align: left;
  align-items: center;
  cursor: pointer;
  color: rgba(31, 31, 31, 0.75);
  padding: 8px 10px;
  font-size: 14px;
  font-weight: 400;
  width: 350px;
  :hover {
    background: rgba(222, 224, 250, 0.6);
  }
  ${(props) =>
    props.active
      ? css`
          background: rgba(222, 224, 250, 0.6);
        `
      : ""}
`;

const VisitIcon = styled.div`
  display: inline-block;
  width: 20px;
  height: 20px;
  background-image: url(${iconVisit});
  cursor: pointer;
  margin-left: 5px;
  vertical-align: middle;
  :hover {
    background-image: url(${iconVisitActive});
  }
`;

function SeoAudit() {
  const { data: organization } = useOrganization();
  const { data: project } = useProject();
  const [filterKey, setFilterKey] = useState("");
  const [statisticExpand, setStatisticExpand] = useState(true);
  const [pageNum, setPageNum] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const { projectId } = useParams();

  const {
    data: statistic,
    refetch: statisticRefetch,
    remove: statisticRemove,
    isFetched,
  } = useGetTaskLinkLatestStatistic(projectId);

  const {
    data: links,
    refetch,
    remove,
  } = useListTaskLatestLinks({
    projectId: projectId,
    filterKey: filterKey,
    pageNum: pageNum,
    pageSize: pageSize,
  });

  const navigate = useNavigate();

  useEffect(() => {
    statisticRefetch();
    refetch();
  }, [projectId]);

  useEffect(() => {
    refetch();
  }, [pageNum, pageSize, filterKey]);

  const openDetail = (link: TaskLink) => {
    linkDrawer.open(link);
  };

  const getColumns: () => ColumnsType<TaskLink> = () => [
    {
      key: "url",
      title: "地址",
      fixed: "left",
      render: (link) => (
        <UrlTableCell>
          <UrlText
            onClick={() => {
              // openDetail(link);
            }}
          >
            {link.url}
          </UrlText>
          <VisitIcon
            onClick={() => {
              window.open(link.url);
            }}
          />
        </UrlTableCell>
      ),
    },
    {
      key: "title",
      title: "标题",
      width: 300,
      render: (link) => {
        return link.titleRawData.title;
      },
    },
    {
      key: "description",
      title: "描述",
      width: 300,
      render: (link) => {
        return link.descriptionRawData.description;
      },
    },
    {
      key: "keywords",
      title: "关键词",
      width: 300,
      render: (link) => {
        return link.keywordsRawData.keywords;
      },
    },
    {
      key: "contentType",
      title: "内容类型",
      dataIndex: "contentType",
    },
    {
      key: "contentLength",
      title: "大小",
      dataIndex: "contentLength",
      render: (contentLength) => {
        if (!contentLength) {
          return "";
        }
        return bytesToSize(contentLength);
      },
    },
    {
      key: "statusCode",
      title: "状态码",
      dataIndex: "statusCode",
    },
    {
      key: "blockedByRobots",
      title: "被阻止",
      render: (link) => {
        if (link.blockedByRobots === 1) {
          return "YES";
        } else {
          return "NO";
        }
      },
    },
    {
      key: "internal",
      title: "内部链接",
      render: (link) => {
        if (link.internal === 1) {
          return "YES";
        } else {
          return "NO";
        }
      },
    },
    {
      key: "nofollow",
      title: "Nofollow",
      render: (link) => {
        if (link.nofollow === 1) {
          return "YES";
        } else {
          return "NO";
        }
      },
    },
    {
      key: "wordCount",
      title: "字数",
      dataIndex: "wordCount",
    },
    {
      key: "textRatio",
      title: "字数占比",
      dataIndex: "textRatio",
      render: (textRatio) => {
        if (!textRatio) {
          return "";
        }
        return parseFloat((textRatio * 100).toFixed(2)) + "%";
      },
    },
    {
      key: "status",
      title: "损坏",
      render: (urlInfo) => {
        if (urlInfo.broken == 1) {
          return "YES";
        }
        return "NO";
      },
    },
  ];

  const columns = useMemo(() => {
    return getColumns();
  }, [links]);

  const isEmpty = useMemo(() => {
    return isFetched && !statistic;
  }, [isFetched, statistic]);

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

  const getProportion = (count?: number) => {
    if (!statistic || !count) {
      return "0%";
    }
    return parseFloat(((count / statistic.totalUrl) * 100).toFixed(2)) + "%";
  };

  const updateFilterKey = (filterKey: string) => {
    setPageNum(1);
    setFilterKey(filterKey);
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
      <StyledStatisticRow
        onClick={() => {
          if (objectKey === "totalUrl") {
            updateFilterKey("");
          } else {
            updateFilterKey(objectKey);
          }
        }}
      >
        <span>{desc}</span>
        <StatisticValue>
          <span>{statistic[objectKey as ObjectKey]}</span>
          <span>{getProportion(statistic[objectKey as ObjectKey])}</span>
        </StatisticValue>
      </StyledStatisticRow>
    );
  };

  const FilterRow = ({
    objectKey,
    desc,
  }: {
    objectKey: string;
    desc: string;
  }) => {
    return (
      <StyledFilterRow
        active={filterKey === objectKey}
        onClick={() => updateFilterKey(objectKey)}
      >
        <span>{desc}</span>{" "}
        {filterKey === objectKey ? <img src={iconChecked} /> : ""}
      </StyledFilterRow>
    );
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
        onReady={(plot) => {
          plot.on("plot:click", (e) => {
            updateFilterKey(e.data.data.objectKey);
          });
        }}
      />
    ),
    [pieData]
  );

  if (!isFetched) {
    return <></>;
  }

  return (
    <Root>
      <Helmet>
        <title>SeoAudit</title>
      </Helmet>
      {project ? (
        <>
          <DashboardNav title="网站审计" />
          <TitleBar>
            <FlexRow center>
              <SectionTitle>网站审计</SectionTitle>
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
            <SectionSubTitle>
              <FlexRow center>
                <img
                  src={statisticExpand ? iconExpand : iconCollapse}
                  onClick={() => {
                    setStatisticExpand((prev) => !prev);
                  }}
                />
                统计
              </FlexRow>
            </SectionSubTitle>
            <FlexRow
              style={{
                marginBottom: 70,
                display: statisticExpand ? "flex" : "none",
              }}
            >
              <StatisticContainer
                style={{
                  width: "30%",
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
                  width: "30%",
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
              <StatisticContainer
                style={{
                  flex: 1,
                }}
              >
                <StatisticTitle>
                  <img src={iconStatusCode} />
                  返回码
                </StatisticTitle>
                <StatisticContent>
                  {!isEmpty ? StatusCodePie : <Nodata />}
                </StatisticContent>
              </StatisticContainer>
            </FlexRow>
            <SectionSubTitle>
              <FlexRow center>
                <img src={iconDatalist} /> 所有数据
              </FlexRow>
              <FlexRow>
                <Popover
                  placement="bottomLeft"
                  content={
                    <>
                      <FlexColumn>
                        <SBFlex
                          style={{
                            padding: "10px",
                          }}
                        >
                          <span>Filter</span>
                          <FlexRow
                            style={{
                              cursor: "pointer",
                            }}
                            onClick={() => updateFilterKey("")}
                            center
                          >
                            <img
                              src={iconRedo}
                              style={{
                                marginRight: 5,
                              }}
                            />
                            重置
                          </FlexRow>
                        </SBFlex>
                        <FlexColumn
                          style={{
                            height: 300,
                            overflowY: "auto",
                          }}
                        >
                          {structureList.map((i) => {
                            if (i.objectKey === "totalUrl") {
                              return "";
                            }
                            return (
                              <FilterRow
                                key={i.objectKey}
                                objectKey={i.objectKey}
                                desc={i.desc}
                              />
                            );
                          })}
                          {securityList.map((i) => {
                            return (
                              <FilterRow
                                key={i.objectKey}
                                objectKey={i.objectKey}
                                desc={i.desc}
                              />
                            );
                          })}
                          {pieData.map((i) => {
                            return (
                              <FilterRow
                                key={i.objectKey}
                                objectKey={i.objectKey}
                                desc={i.type}
                              />
                            );
                          })}
                        </FlexColumn>
                      </FlexColumn>
                    </>
                  }
                  trigger="click"
                  showArrow={false}
                  overlayClassName={"popover-nonpadding"}
                >
                  <FilterBtn active={!!filterKey}>
                    {filterKey ? (
                      <img src={iconFilterActive} />
                    ) : (
                      <img src={iconFilter} />
                    )}
                    Filter
                  </FilterBtn>
                </Popover>
              </FlexRow>
            </SectionSubTitle>
            <Table
              rowKey={(link) => link.url}
              columns={columns}
              locale={{
                emptyText: () => <Nodata />,
              }}
              bordered={true}
              dataSource={links?.result}
              scroll={{ x: "max-content" }}
              pagination={{
                total: links?.total,
                pageSize: pageSize,
                current: pageNum,
                onChange(page) {
                  setPageNum(page);
                },
                onShowSizeChange(current, size) {
                  setPageSize(size);
                },
              }}
            />
            <LinkDetail />
          </MainContainer>
        </>
      ) : null}
    </Root>
  );
}

export default SeoAudit;

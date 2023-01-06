import detect from "@/assets/seo/img-detect.svg";
import taskStop from "@/assets/seo/task-stop.svg";
import taskOpen from "@/assets/seo/task-open.svg";
import taskFail from "@/assets/seo/task-fail.svg";
import SBFlex, { FlexColumn, FlexRow } from "@/components/display/Flex";
import * as notification from "@/components/display/Notification";
import { abortAnalysis, getTaskProgress } from "@/query/analysis";
import { TaskProgress } from "@/query/analysis/types";
import queryClient from "@/query/client";
import { Message, useEventEmitter } from "@/states/ws";
import { CloseOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import moment from "moment";
import { useEffect, useState, useMemo } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import Button from "@/components/base/Button";
import { Organization } from "@/query/organization/types";
import { useOrganization } from "@/query/organization";

const Root = styled.div`
  width: 100%;
  height: 100%;
  padding: 10px 20px;
  background-color: transparent;
  z-index: 999;
`;

const Main = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  padding: 6px 20px;
  background-color: white;
  box-shadow: 0px 0px 22px rgba(145, 145, 145, 0.25);
`;

const TopNav = styled(SBFlex)`
  align-items: center;
  width: 100%;
  height: 64px;
  color: #5041bc;
  position: relative;
`;

const SiteTitleSection = styled(FlexRow)`
  width: 30%;
  height: 100%;
  align-items: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const SiteTitle = styled.span`
  font-size: 16px;
`;

const SiteSubTitle = styled.span<{
  color: string;
}>`
  font-size: 12px;
  ${(props) => css`
    color: ${props.color};
  `};
`;

const SiteActionIcon = styled.img`
  margin-right: 10px;
`;

const SiteLiveData = styled(FlexRow)`
  flex: 1;
  justify-content: space-around;
  align-items: center;
  font-size: 16px;
`;

const SiteLiveText = styled.span`
  font-size: 30px;
  line-height: 30px;
`;

const SiteLiveUnit = styled.span`
  font-size: 14px;
  color: #808080;
  margin-left: 5px;
`;

const CloseButton = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  cursor: pointer;
`;

function SeoRunningTask({ task }: { task: TaskProgress }) {
  const navigate = useNavigate();

  const { data: organization } = useOrganization();
  const [progress, setProgress] = useState<TaskProgress>();
  const [visible, setVisible] = useState(true);
  const [timerStart, setTimerStart] = useState(false);
  const [progressSyncer, setProgressSyncer] = useState<any>(null);
  const [durationSeconds, setDurationSeconds] = useState<number>(0);

  useEffect(() => {
    if (!task) {
      return;
    }
    setVisible(true);
    setProgress(undefined);
    setTimerStart(false);
    setDurationSeconds(0);
    fetchProgress();
    let syncer: any = setInterval(() => {
      fetchProgress();
    }, 2000);

    setProgressSyncer(syncer);

    return () => {
      clearInterval(syncer);
    };
  }, [task]);

  useEffect(() => {
    if (!visible) {
      clearInterval(progressSyncer);
      return;
    }
  }, [visible]);

  useEffect(() => {
    if (!progress) {
      return;
    }
    if (progress.status !== "PROCESSING") {
      setTimerStart(false);
      clearInterval(progressSyncer);
      return;
    }
    if (durationSeconds === 0) {
      setDurationSeconds(progress.durationSeconds);
    }
    setTimerStart(true);
  }, [progress]);

  useEffect(() => {
    if (!timerStart) {
      return;
    }
    let timer: any = setInterval(() => {
      setDurationSeconds((prev) => prev + 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [timerStart]);

  const fetchProgress = () => {
    getTaskProgress(task.taskId)
      .then(({ result }) => {
        setProgress(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const openTask = () => {
    queryClient.invalidateQueries("listOrgRunningTask");
    queryClient.invalidateQueries("getLatestTask");
    queryClient.invalidateQueries("getTaskLinkLatestStatistic");
    queryClient.invalidateQueries("listTaskLatestLinks");
    navigate(
      `/organization/${organization?.organizationId}/project/${progress?.projectId}/overview`
    );
  };

  const SiteLiveItem = ({ text, unit }: { text: any; unit: string }) => {
    return (
      <FlexRow
        style={{
          alignItems: "end",
          justifyContent: "right",
          width: 170,
        }}
      >
        <SiteLiveText>{text}</SiteLiveText>
        <SiteLiveUnit>{unit}</SiteLiveUnit>
      </FlexRow>
    );
  };

  const SubTitle = useMemo(() => {
    if (progress?.status === "PROCESSING") {
      return <SiteSubTitle color="#808080">SCANNING WEBSITE...</SiteSubTitle>;
    }
    if (progress?.status === "COMPLETED") {
      return (
        <SiteSubTitle color="#52BD73">WEBSITE AUDIT COMPLETED</SiteSubTitle>
      );
    }
    if (progress?.status === "FAILED") {
      return <SiteSubTitle color="#DE5241">WEBSITE AUDIT ERROR</SiteSubTitle>;
    }
    return <></>;
  }, [progress]);

  const ActionBtn = useMemo(() => {
    if (progress?.status === "PROCESSING") {
      return (
        <Button type="primary" danger onClick={() => stopTask()}>
          <SiteActionIcon src={taskStop} /> 取消
        </Button>
      );
    }
    if (progress?.status === "COMPLETED") {
      return (
        <Button
          type="primary"
          onClick={() => openTask()}
        >
          <SiteActionIcon src={taskOpen} /> 打开
        </Button>
      );
    }
    if (progress?.status === "FAILED") {
      return (
        <FlexRow
          style={{
            color: "#DE5241",
          }}
        >
          <SiteActionIcon src={taskFail} /> 失败
        </FlexRow>
      );
    }
    return <></>;
  }, [progress]);

  const stopTask = () => {
    Modal.confirm({
      icon: <ExclamationCircleOutlined />,
      content: `确定终止该任务吗`,
      maskClosable: true,
      onOk() {
        abortAnalysis(task.taskId as string)
          .then(({ result }) => {
            queryClient.invalidateQueries("listProjects");
            queryClient.invalidateQueries("listOrgRunningTask");
            queryClient.invalidateQueries("listTaskLinks");
            queryClient.invalidateQueries("getProject");
          })
          .catch((err) => {
            notification.error(err.message);
          });
      },
      zIndex: 9999,
    });
  };

  if (!progress || !visible) {
    return <></>;
  }

  return (
    <Root>
      <Helmet>
        <title>SeoAnalysis</title>
      </Helmet>
      <Main
        style={{
          width: "100%",
        }}
      >
        <TopNav>
          {progress.status !== "PROCESSING" ? (
            <CloseButton onClick={() => setVisible(false)}>
              <CloseOutlined />
            </CloseButton>
          ) : null}
          <SiteTitleSection>
            <img
              src={detect}
              style={{
                height: "100%",
                marginRight: 10,
              }}
            />
            <FlexColumn>
              <SiteTitle>{progress.siteUrl}</SiteTitle>
              {SubTitle}
            </FlexColumn>
          </SiteTitleSection>
          <SiteLiveData>
            <SiteLiveItem text={progress.depth} unit="深度" />
            <SiteLiveItem text={progress.pageCount} unit="页" />
            <SiteLiveItem
              text={moment.utc(durationSeconds * 1000).format("HH:mm:ss")}
              unit="用时"
            />
            {ActionBtn}
          </SiteLiveData>
        </TopNav>
      </Main>
    </Root>
  );
}

export default SeoRunningTask;

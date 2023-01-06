import { FlexColumn } from "@/components/display/Flex";
import { useListProjects, useProject } from "@/query/project";
import { getUser } from "@/utils/auth";
import { useEffect, useMemo } from "react";
import { Helmet } from "react-helmet";
import { useNavigate, useParams } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import SeoReport from "./components/seo-report";

import { useListOrgRunningTask } from "@/query/analysis";
import queryClient from "@/query/client";
import { useOrganization } from "@/query/organization";
import { useGetUserSubscription } from "@/query/subscription";
import CompetitorPage from "./components/competitor";
import SeoAudit from "./components/seo-audit";
import SeoCreateProject from "./components/seo-create-project";
import SeoDeveloperView from "./components/seo-developer-view";
import Sidebar from "./components/sidebar";
import SeoRunningTask from "./components/seo-running-task";
import DashboardNav from "./components/nav";
import Overview from "./components/overview";

const GlobalStyle = createGlobalStyle`
  body {
    .popover-nonpadding {
      .ant-popover-inner-content {
          padding: 0;
      }
      &.ant-popover-placement-bottom {
          padding: 0 !important;
      }
    }
  }
`;
const Root = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: row;
  overflow-y: hidden;
  background: #fcfcfc;
`;

const MainWrapper = styled(FlexColumn)`
  flex: 1;
  position: relative;
  background-color: #fcfcfc;
  overflow-x: auto;
`;

function Dashboard({ type }: { type?: string }) {
  const userInfo = getUser();
  const navigate = useNavigate();
  const { organizationId, projectId } = useParams();

  const { data: userSubscription } = useGetUserSubscription();

  const { data: runningTask, refetch: runningTaskRefetch } = useListOrgRunningTask(organizationId);

  const { data: projects, refetch: projectsRefetch } = useListProjects({
    organizationId: organizationId,
    pageNum: 1,
    pageSize: 999,
  });

  const {
    data: project,
    refetch: projectRefetch,
    isFetched: projectIsFetched,
  } = useProject(projectId ? projectId : projects?.result[0]?.projectId);

  const { data: organization, refetch: orgRefetch } =
    useOrganization(organizationId);

  useEffect(() => {}, []);

  useEffect(() => {
    if (!projects) {
      return;
    }
    if (projects?.total === 0 && type !== "seo-create-project") {
      window.location.href = `/organization/${organizationId}/seo-create-project`;
      return;
    }
    if (!projectId) {
      projectRefetch();
    }
  }, [projects]);

  useEffect(() => {
    if (!project && projectIsFetched && type !== "seo-create-project") {
      // delete project refresh
      window.location.href = `/organization/${organizationId}`;
    }
  }, [project]);

  useEffect(() => {
    orgRefetch();
    projectsRefetch();
    runningTaskRefetch()
  }, [organizationId]);

  useEffect(() => {
    if (!projectId) {
      return;
    }
    projectRefetch();
  }, [projectId]);

  if (!organization || !userSubscription) {
    return <></>;
  }

  return (
    <Root>
      <GlobalStyle />
      <Helmet>
        <title>Seogo</title>
      </Helmet>
      <Sidebar type={type} />
      <MainWrapper>
        {runningTask && runningTask.length > 0 ? (
          <FlexColumn>
            {runningTask.map((task) => {
              return <SeoRunningTask task={task} />;
            })}
          </FlexColumn>
        ) : null}
        <div
          style={{
            width: "100%",
            height: "100%",
            overflowY: "hidden",
          }}
        >
          {type === "seo-audit" ? <SeoAudit /> : null}
          {type === "seo-report" ? <SeoReport /> : null}
          {type === "seo-create-project" ? <SeoCreateProject /> : null}
          {type === "seo-developer-view" ? <SeoDeveloperView /> : null}
          {type === "competitor" ? <CompetitorPage /> : null}
          {type === "overview" ? <Overview /> : null}
        </div>
      </MainWrapper>
    </Root>
  );
}

export default Dashboard;

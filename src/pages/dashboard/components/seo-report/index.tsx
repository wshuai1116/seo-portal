import SBFlex, {
  CenterItem,
  FlexColumn,
  FlexRow,
} from "@/components/display/Flex";
import { useGetLatestTask } from "@/query/analysis";
import { useOrganization } from "@/query/organization";
import { useProject } from "@/query/project/useProject";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import DashboardNav from "../nav";
import ReportCategory from "./components/report-category";
import ReportContent from "./components/report-content";
import ScoreSummary from "./components/score-summary";
import iconLink from "@/assets/seo/icon-link-open.svg";
import iconDeveloper from "@/assets/seo/icon-developer.svg";
import Button from "@/components/base/Button";

const Root = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
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

function SeoReport() {
  const { data: organization } = useOrganization();
  const { data: project, remove } = useProject();
  const { projectId } = useParams();

  const { data: taskSummary, refetch, isFetched } = useGetLatestTask(projectId);

  const navigate = useNavigate();

  useEffect(() => {
    refetch();
  }, [projectId]);

  if (!isFetched || !project) {
    return <></>;
  }

  return (
    <Root>
      <Helmet>
        <title>SeoReport</title>
      </Helmet>
      <DashboardNav title="SEO优化" />
      <TitleBar>
        <FlexRow center>
          <SectionTitle>SEO优化</SectionTitle>
          <ProjectLink onClick={() => window.open(project.siteUrl)}>
            {project.siteUrl} <img src={iconLink} />
          </ProjectLink>
        </FlexRow>
        <FlexRow center>
          {/* <Button
            type="primary"
            onClick={() =>
              navigate(
                `/organization/${organization.organizationId}/project/${projectId}/seo-developer-view`
              )
            }
          >
            <img
              src={iconDeveloper}
              style={{
                marginRight: 6,
              }}
            />
            开发者视图
          </Button> */}
        </FlexRow>
      </TitleBar>
      <MainContainer>
        <ScoreSummary taskSummary={taskSummary} />
        <FlexRow>
          <ReportContent taskSummary={taskSummary} />
        </FlexRow>
      </MainContainer>
    </Root>
  );
}

export default SeoReport;

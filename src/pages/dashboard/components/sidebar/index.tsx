import iconDown from "@/assets/common/icon-down.svg";
import logo from "@/assets/common/logo-light.svg";
import iconAuditActive from "@/assets/dashboard/icon-audit-active.svg";
import iconAudit from "@/assets/dashboard/icon-audit.svg";
import iconCompetitorAnalysisActive from "@/assets/dashboard/icon-competitor-analysis-active.svg";
import iconCompetitorAnalysis from "@/assets/dashboard/icon-competitor-analysis.svg";
import iconHelpActive from "@/assets/dashboard/icon-help-active.svg";
import iconHelp from "@/assets/dashboard/icon-help.svg";
import iconMemberActive from "@/assets/dashboard/icon-member-active.svg";
import iconMember from "@/assets/dashboard/icon-member.svg";
import iconOverviewActive from "@/assets/dashboard/icon-overview-active.svg";
import iconOverview from "@/assets/dashboard/icon-overview.svg";
import iconPlanActive from "@/assets/dashboard/icon-plan-active.svg";
import iconPlan from "@/assets/dashboard/icon-plan.svg";
import iconSeoActive from "@/assets/dashboard/icon-seo-active.svg";
import iconSeo from "@/assets/dashboard/icon-seo.svg";
import iconSidebarClose from "@/assets/dashboard/icon-sidebar-close.svg";
import iconSidebarDropdown from "@/assets/dashboard/icon-sidebar-dropdown.svg";
import Avatar from "@/components/display/Avatar";
import SBFlex, {
  CenterItem,
  FlexColumn,
  FlexRow,
} from "@/components/display/Flex";
import { useListProjects, useProject } from "@/query/project";
import { getUser } from "@/utils/auth";
import { useNavigate, useParams } from "react-router-dom";
import styled, { createGlobalStyle, css } from "styled-components";

import { useListOrganizations, useOrganization } from "@/query/organization";
import { OrganizationUser } from "@/query/organization/types";
import { useGetUserSubscription } from "@/query/subscription";
import { getPlanName } from "@/query/subscription/types";
import { Popover } from "antd";
import ProjectPopup from "../project-popup";
import UserPopup from "../user-popup";
import { t } from "@lingui/macro";

const Root = styled.div`
  position: relative;
  display: inline-block;
  width: 20%;
  height: 100%;
  background: #f7f8fa;
  border-right: 1px solid #e1e3e6;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-content: center;
  justify-content: flex-start;
  align-items: center;
  color: var(--main-text-color);

  :hover > div:first-child {
    display: flex;
  }
`;

const SectionTitle = styled.div`
  padding: 14px;
  font-weight: 500;
  font-size: 14px;
  color: rgba(31, 31, 31, 0.6);
`;

const Separator = styled.div`
  background-color: #e1e3e6;
  height: 1px;
  width: 100%;
`;

const MenuWrapper = styled.div`
  padding: 8px;
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-content: center;
  justify-content: flex-start;
`;

const MenuIcon = styled(CenterItem)`
  width: 24px;
  height: 24px;
  margin-right: 8px;
`;

const MenuItem = styled(CenterItem)<{
  active?: boolean;
  icon: string;
  iconActive: string;
}>`
  border-radius: 5px;
  padding: 9px 16px;
  font-size: 14px;
  font-weight: 400;
  display: flex;
  flex-direction: row;
  cursor: pointer;
  margin-bottom: 2px;
  :hover {
    background: rgba(234, 236, 241, 0.8);

    ${MenuIcon} {
      ${(props) => css`
        background-image: url(${props.iconActive});
      `}
    }
  }

  ${MenuIcon} {
    ${(props) =>
      props.active
        ? css`
            background-image: url(${props.iconActive});
          `
        : css`
            background-image: url(${props.icon});
          `}
  }

  ${(props) =>
    props.active
      ? css`
          background: #dee0fa;
          :hover {
            background: #dee0fa;
          }
        `
      : ""}
`;

const BottomMenuItem = styled(MenuItem)`
  font-size: 16px;
  font-weight: 500;
`;

const MenuText = styled(CenterItem)`
  flex-grow: 1;
  justify-content: left;
`;

const UserInfoWrapper = styled.div`
  border-radius: 4px;
  padding: 5px 0px 5px 14px;
  margin-bottom: 10px;
  cursor: pointer;

  :hover {
    background: rgba(234, 236, 241, 0.8);
  }
`;

const UserInfoText = styled.div`
  font-weight: 500;
  font-size: 12px;
`;

const ProjectBar = styled(FlexRow)`
  width: 100%;
  overflow: hidden;
  height: 42px;
  align-items: center;
`;

const Logo = styled.a`
  width: 25px;
  height: 28px;
  margin: 0px 8px;

  img {
    width: 100%;
  }
`;

const IconSitebarDropdown = styled.span`
  width: 24px;
  height: 24px;
  margin-left: 12px;
  cursor: pointer;
  img {
    width: 100%;
  }
`;

const IconSitebarClose = styled.span`
  width: 24px;
  height: 24px;
  margin-left: 12px;
  cursor: pointer;
  img {
    width: 100%;
  }
  :hover {
    background: rgba(31, 31, 31, 0.07);
  }
`;

const ProjectSwitch = styled(FlexRow)`
  border-left: 1px solid #e1e3e6;
  flex: 1;
  height: 100%;
  align-items: center;
  padding: 8px;
  cursor: pointer;
  :hover {
    background: rgba(31, 31, 31, 0.05);
  }
`;

function Sidebar({ type }: { type?: string }) {
  const userInfo = getUser();
  const navigate = useNavigate();
  const { organizationId, projectId } = useParams();

  const { data: organizations } = useListOrganizations();

  const { data: userSubscription } = useGetUserSubscription();

  const { data: projects } = useListProjects({
    organizationId: organizationId,
    pageNum: 1,
    pageSize: 999,
  });

  const { data: project } = useProject(
    projectId ? projectId : projects?.result[0]?.projectId
  );

  const { data: organization } = useOrganization();

  if (!organization || !userSubscription) {
    return <></>;
  }

  return (
    <Root>
      <ProjectBar>
        <Logo href="/">
          <img src={logo} />
        </Logo>
        <>
          <Popover
            placement="bottom"
            content={
              <ProjectPopup
                organizations={organizations}
                projects={projects?.result}
              />
            }
            trigger={["hover"]}
            showArrow={false}
            overlayClassName={"popover-nonpadding"}
          >
            <ProjectSwitch>
              <SBFlex
                style={{
                  width: "100%",
                }}
              >
                <MenuText>
                  {projects?.total === 0 ? "无项目" : project?.siteUrl}
                </MenuText>
                <IconSitebarDropdown>
                  <img src={iconSidebarDropdown} />
                </IconSitebarDropdown>
                {/* <IconSitebarClose>
                    <img src={iconSidebarClose} />
                  </IconSitebarClose> */}
              </SBFlex>
            </ProjectSwitch>
          </Popover>
        </>
      </ProjectBar>

      <Separator />

      <MenuWrapper style={{ height: "fit-content" }}>
        <SectionTitle>项目</SectionTitle>
        {projects?.total === 0 ? (
          <>
            <MenuItem
              icon={iconOverview}
              iconActive={iconOverviewActive}
              active={type === "seo-create-project"}
              onClick={() => {
                navigate(
                  `/organization/${organization.organizationId}/seo-create-project`
                );
              }}
            >
              <MenuIcon />
              <MenuText>创建项目</MenuText>
            </MenuItem>
          </>
        ) : (
          <>
            <MenuItem
              icon={iconOverview}
              iconActive={iconOverviewActive}
              active={type === "overview"}
              onClick={() => {
                navigate(
                  `/organization/${organization.organizationId}/project/${project?.projectId}/overview`
                );
              }}
            >
              <MenuIcon />
              <MenuText>{t`概览`}</MenuText>
            </MenuItem>
            <MenuItem
              icon={iconAudit}
              iconActive={iconAuditActive}
              active={type === "seo-audit"}
              onClick={() => {
                navigate(
                  `/organization/${organization.organizationId}/project/${project?.projectId}/seo-audit`
                );
              }}
            >
              <MenuIcon />
              <MenuText>{t`网站审计`}</MenuText>
            </MenuItem>
            <MenuItem
              icon={iconSeo}
              iconActive={iconSeoActive}
              active={type === "seo-report" || type === "seo-developer-view"}
              onClick={() => {
                navigate(
                  `/organization/${organization.organizationId}/project/${project?.projectId}/seo-report`
                );
              }}
            >
              <MenuIcon />
              <MenuText>SEO 优化</MenuText>
            </MenuItem>
          </>
        )}
      </MenuWrapper>

      <Separator />

      <MenuWrapper style={{ height: "inherit", flex: "1" }}>
        <SectionTitle>工具</SectionTitle>
        <MenuItem
          icon={iconCompetitorAnalysis}
          iconActive={iconCompetitorAnalysisActive}
          active={type === "competitor"}
          onClick={() =>
            navigate(`/organization/${organization.organizationId}/competitor`)
          }
        >
          <MenuIcon />
          <MenuText>竞品分析</MenuText>
        </MenuItem>
      </MenuWrapper>

      <Separator />

      <MenuWrapper style={{ height: "fit-content" }}>
        <BottomMenuItem icon={iconMember} iconActive={iconMemberActive}>
          <MenuIcon />
          <MenuText>
            成员 (
            {
              organization.users.filter((user: OrganizationUser) => {
                return user.status === "APPROVED";
              }).length
            }
            )
          </MenuText>
        </BottomMenuItem>
        <BottomMenuItem
          icon={iconPlan}
          iconActive={iconPlanActive}
          onClick={() => navigate("/pricing")}
        >
          <MenuIcon />
          <MenuText>订阅</MenuText>
        </BottomMenuItem>
        <BottomMenuItem
          icon={iconHelp}
          iconActive={iconHelpActive}
          onClick={() => navigate("/contact")}
        >
          <MenuIcon />
          <MenuText>帮助</MenuText>
        </BottomMenuItem>
      </MenuWrapper>

      <MenuWrapper style={{ height: "fit-content" }}>
        <Popover
          placement="rightTop"
          content={<UserPopup userSubscription={userSubscription} />}
          trigger={["hover"]}
          showArrow={false}
          overlayClassName={"popover-nonpadding"}
        >
          <UserInfoWrapper>
            <FlexRow style={{ width: "100%" }}>
              <Avatar
                shape="square"
                size={32}
                id={userInfo?.uid}
                icon={userInfo?.avatar}
                key={userInfo?.uid}
                label={userInfo?.nickname}
              />
              <FlexColumn
                style={{
                  flexGrow: 1,
                  paddingLeft: 8,
                  justifyContent: "center",
                }}
              >
                <UserInfoText>{userInfo?.nickname}</UserInfoText>
                <UserInfoText
                  style={{
                    color: "rgba(31, 31, 31, 0.5)",
                  }}
                >
                  {getPlanName(
                    organization.userSubscription.subscription.subscriptionType
                  )}
                </UserInfoText>
              </FlexColumn>
              <img src={iconDown} />
            </FlexRow>
          </UserInfoWrapper>
        </Popover>
      </MenuWrapper>
    </Root>
  );
}

export default Sidebar;

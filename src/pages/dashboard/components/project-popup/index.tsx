import Avatar from "@/components/display/Avatar";
import SBFlex, {
  CenterItem,
  FlexColumn,
  FlexRow,
} from "@/components/display/Flex";
import { Organization } from "@/query/organization/types";
import {
  getPlanName,
  isFree,
  UserSubscription,
} from "@/query/subscription/types";
import { clearLoginInfo, getUser } from "@/utils/auth";
import { CheckOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { Divider, Modal, Popover } from "antd";
import Button from "@/components/base/Button";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import { useOrganization } from "@/query/organization";
import { useMemo } from "react";
import { Project } from "@/query/project/types";
import { useGetUserSubscription } from "@/query/subscription";
import iconSwitch from "@/assets/dashboard/icon-switch.svg";
import iconChecked from "@/assets/common/icon-checked.svg";
import iconTrash from "@/assets/common/icon-trash.svg";
import iconRedo from "@/assets/common/icon-redo.svg";
import iconCheckedActive from "@/assets/common/icon-checked-active.svg";
import { useProject } from "@/query/project";
import OrganizationPopup from "../organization-popup";
import { useDeleteProject } from "@/query/project/useDeleteProject";
import { analysisSite } from "@/query/analysis";
import queryClient from "@/query/client";
import * as notification from "@/components/display/Notification";

const Root = styled.div`
  display: flex;
  flex-direction: row;
  width: 278px;
  text-align: left;
`;

const SectionTitleContainer = styled(SBFlex)`
  padding: 13px 14px 0px 14px;
`;

const SectionTitle = styled.div`
  font-weight: 400;
  font-size: 14px;
  color: rgba(31, 31, 31, 0.6);
`;

const OrgInfoWrapper = styled.div`
  border-radius: 4px;
  padding: 5px 12px 5px 12px;
  margin-top: 10px;
  margin-bottom: 10px;
  cursor: pointer;

  :hover {
    background: rgba(234, 236, 241, 0.8);
  }
`;

const OrgInfoText = styled.div`
  font-weight: 500;
  font-size: 12px;
`;

const ProjectInfoWrapper = styled.div`
  padding: 0px;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const ProjectCreate = styled(CenterItem)`
  cursor: pointer;
  font-size: 12px;
  color: #5a65ea;
  border-radius: 4px;
  width: 116px;
  height: 24px;

  :hover {
    background: rgba(90, 101, 234, 0.15);
  }
`;

const ProjectContainer = styled.div``;

const ProjectCheckIcon = styled.span`
  width: 24px;
  height: 24px;
  margin-right: 6px;
`;

const ProjectURL = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
  margin-right: 4px;
`;

const ProjectActionIcon = styled.span`
  width: 24px;
  height: 24px;
  margin-right: 4px;
  display: none;

  :hover {
    background: rgba(31, 31, 31, 0.11);
    border-radius: 3px;
  }

  img {
    width: 100%;
  }
`;

const ProjectItem = styled(FlexRow)<{
  active?: boolean;
}>`
  width: 100%;
  cursor: pointer;
  padding: 5px;
  font-weight: 400;
  font-size: 14px;
  color: rgba(31, 31, 31, 0.75);

  :hover {
    background: rgba(222, 224, 250, 0.6);

    ${ProjectActionIcon} {
      display: inline-block;
    }
  }

  ${ProjectCheckIcon} {
    ${(props) =>
      props.active
        ? css`
            background-image: url(${iconChecked});
          `
        : ""}
  }

  ${(props) =>
    props.active
      ? css`
          opacity: 0.5;
        `
      : ""}
`;

function ProjectPopup({
  organizations,
  projects,
}: {
  organizations?: [Organization];
  projects?: [Project];
}) {
  const navigate = useNavigate();

  const { data: userSubscription } = useGetUserSubscription();

  const { data: organization } = useOrganization();

  const { data: project } = useProject();

  const userInfo = getUser();

  const deleteProjectMutation = useDeleteProject({
    onSuccess(data, params) {
      notification.success("删除成功");
    },
  });

  const showReCrawlConfirm = (project: Project) => {
    Modal.confirm({
      title: "重新爬取 - 确认",
      icon: <ExclamationCircleOutlined />,
      content: <p>重新爬取将清空之前的历史数据，您确认要执行吗？</p>,
      maskClosable: true,
      onOk() {
        analysisSite(project.organizationId, project.siteUrl)
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

  const handleDelete = (project: Project) => {
    Modal.confirm({
      icon: <ExclamationCircleOutlined />,
      content: `确定删除该项目吗`,
      maskClosable: true,
      onOk() {
        deleteProjectMutation.mutate({
          organizationId: project.organizationId,
          projectId: project.projectId,
        });
      },
      zIndex: 9999,
    });
  };

  const goPricing = () => {
    window.location.href = "/pricing";
  };

  if (!organization || !organizations || !projects) {
    return <></>;
  }

  return (
    <Root>
      <FlexColumn
        style={{
          width: "100%",
        }}
      >
        <SectionTitleContainer>
          <SectionTitle>组织</SectionTitle>
        </SectionTitleContainer>
        <Popover
          placement="right"
          content={<OrganizationPopup organizations={organizations} />}
          trigger={["hover"]}
          showArrow={false}
          overlayClassName={"popover-nonpadding"}
        >
          <OrgInfoWrapper>
            <FlexRow style={{ width: "100%" }}>
              <Avatar
                shape="square"
                size={32}
                id={organization?.organizationId}
                icon={undefined}
                key={organization?.organizationId}
                label={organization?.name}
              />
              <FlexColumn
                style={{
                  flexGrow: 1,
                  paddingLeft: 8,
                  justifyContent: "center",
                }}
              >
                <OrgInfoText>{organization?.name}</OrgInfoText>
                <OrgInfoText
                  style={{
                    color: "rgba(31, 31, 31, 0.5)",
                  }}
                >
                  {getPlanName(
                    organization.userSubscription.subscription.subscriptionType
                  )}
                </OrgInfoText>
              </FlexColumn>
              <img src={iconSwitch} />
            </FlexRow>
          </OrgInfoWrapper>
        </Popover>
        <Divider
          style={{
            margin: 0,
            backgroundColor: "#E1E3E6",
          }}
        />
        <SectionTitleContainer>
          <SectionTitle>项目({projects.length})</SectionTitle>
          <ProjectCreate
            type="text"
            ghost
            onClick={() => {
              navigate(
                `/organization/${organization.organizationId}/seo-create-project`
              );
            }}
          >
            + 创建项目
          </ProjectCreate>
        </SectionTitleContainer>
        <ProjectInfoWrapper>
          {projects.map((p) => {
            return (
              <ProjectItem
                key={p.projectId}
                active={project?.projectId === p.projectId}
                onClick={() =>
                  navigate(
                    `/organization/${p.organizationId}/project/${p.projectId}/overview`
                  )
                }
              >
                <ProjectCheckIcon />
                <ProjectURL>{p.siteUrl}</ProjectURL>
                <FlexRow>
                  <ProjectActionIcon
                    onClick={(e) => {
                      e.stopPropagation();
                      showReCrawlConfirm(p);
                    }}
                  >
                    <img src={iconRedo} />
                  </ProjectActionIcon>
                  <ProjectActionIcon
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(p);
                    }}
                  >
                    <img src={iconTrash} />
                  </ProjectActionIcon>
                </FlexRow>
              </ProjectItem>
            );
          })}
        </ProjectInfoWrapper>
      </FlexColumn>
    </Root>
  );
}

export default ProjectPopup;

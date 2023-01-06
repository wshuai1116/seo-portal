import SBFlex, { FlexColumn, FlexRow } from "@/components/display/Flex";
import * as notification from "@/components/display/Notification";
import { analysisSite } from "@/query/analysis";
import queryClient from "@/query/client";
import { Organization } from "@/query/organization/types";
import { getDuplicatedProject, useCreateProject } from "@/query/project";
import Button from "@/components/base/Button";
import { Form, Modal } from "antd";
import Input from "antd/lib/input";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Project } from "@/query/project/types";
import { useOrganization } from "@/query/organization";
import iconCreate from "@/assets/dashboard/icon-create-project.svg";

const Root = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  position: absolute;
  left: 0;
  top: 0;
`;

const CreateIcon = styled.div`
  width: 126px;
  height: 126px;
  margin-bottom: 20px;

  img {
    width: 100%;
  }
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const DomainInputWrapper = styled.div`
  display: flex;
  text-align: center;
  width: 100%;
  max-width: 720px;
  flex-direction: row;
  flex-wrap: nowrap;
  margin: 0 auto;
`;

const Subject = styled.div`
  font-size: 42px;
  text-align: center;
  font-weight: 500;
  margin-bottom: 20px;
`;

function SeoCreateProject() {
  const [taskId, setTaskId] = useState<string>();
  const [confirmOpen, setConfirmOpen] = useState<boolean>(false);
  const [duplicatedProject, setDuplicatedProject] = useState<Project>();
  const navigate = useNavigate();

  const { data: organization } = useOrganization();

  const createProjectMutation = useCreateProject({
    onSuccess(data, params) {
      analysisSite(organization.organizationId, params.siteUrl)
        .then(({ result }) => {
          notification.success("创建成功");
          queryClient.invalidateQueries("listOrgRunningTask");
          navigate(
            `/organization/${organization?.organizationId}/project/${data.projectId}/overview`,
            {
              replace: true,
            }
          );
        })
        .catch((err) => {
          notification.error(err.message);
        });
    },
  });

  const handleSubmit = (params: any) => {
    getDuplicatedProject(organization.organizationId, params.siteUrl)
      .then(({ result }) => {
        if (result?.projectId) {
          setConfirmOpen(true);
          setDuplicatedProject(result);
        } else {
          createProjectMutation.mutate({
            organizationId: organization.organizationId,
            siteUrl: params.siteUrl,
          });
        }
      })
      .catch((err) => {
        notification.error(err.message);
      });
  };

  if (!organization) {
    return <></>;
  }

  return (
    <Root>
      <Helmet>
        <title>创建新项目</title>
      </Helmet>
      <MainContainer>
        <FlexColumn center style={{ width: 543 }}>
          <CreateIcon>
            <img src={iconCreate} />
          </CreateIcon>
          <Subject>创建新项目</Subject>
          <DomainInputWrapper>
            <Form
              style={{
                width: "100%",
                marginBottom: 0,
                position: "relative",
              }}
              layout="horizontal"
              onFinish={handleSubmit}
            >
              <Form.Item
                name="siteUrl"
                style={{
                  width: "100%",
                  border: "1px solid #E1E3E6",
                  borderRadius: 8,
                  textAlign: "left",
                  backgroundColor: "white",
                  marginBottom: 0,
                }}
              >
                <Input
                  placeholder="输入站点域名 例如: www.example.com"
                  bordered={false}
                  style={{
                    height: 52,
                    paddingLeft: 14,
                    width: "72%",
                  }}
                />
              </Form.Item>
              <Button
                htmlType="submit"
                type="primary"
                loading={createProjectMutation.isLoading}
                style={{
                  width: 130,
                  height: 32,
                  fontSize: 14,
                  position: "absolute",
                  top: "50%",
                  transform: "translateY(-50%)",
                  right: 14,
                }}
              >
                继续
              </Button>
            </Form>
          </DomainInputWrapper>
        </FlexColumn>
        <Modal
          open={confirmOpen}
          title="项目已存在"
          onCancel={() => setConfirmOpen(false)}
          footer={[
            <Button
              type="default"
              style={{
                display: "inline-block",
              }}
              loading={createProjectMutation.isLoading}
              disabled={createProjectMutation.isLoading}
              onClick={() => {
                createProjectMutation.mutate({
                  organizationId: organization.organizationId,
                  siteUrl: duplicatedProject.siteUrl as string,
                });
              }}
            >
              重新创建
            </Button>,
            <Button
              type="primary"
              style={{
                display: "inline-block",
              }}
              onClick={() => {
                navigate(
                  `/organization/${organization.organizationId}/project/${duplicatedProject?.projectId}/seo-report`,
                  {
                    replace: true,
                  }
                );
              }}
            >
              直接进入
            </Button>,
          ]}
        >
          <p>项目{duplicatedProject?.siteUrl}已存在</p>
          <p>请选择【直接进入】或覆盖原有数据【重新创建】</p>
        </Modal>
      </MainContainer>
    </Root>
  );
}

export default SeoCreateProject;

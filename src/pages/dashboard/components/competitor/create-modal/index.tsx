import Avatar from "@/components/display/Avatar";
import SBFlex, { FlexColumn, FlexRow } from "@/components/display/Flex";
import { Organization } from "@/query/organization/types";
import { Project } from "@/query/project/types";
import { getUser } from "@/utils/auth";
import {
  CloseCircleFilled,
  ExportOutlined,
  PlusOutlined,
  ReloadOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { Form, Input, Modal, Popover, Tooltip } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import Button from "@/components/base/Button";
import { createCompetitorModal } from "../states";
import { useCreateCompetitor } from "@/query/competitor";
import * as notification from "@/components/display/Notification";
import { observer } from "mobx-react-lite";
import { useOrganization } from "@/query/organization";

const Root = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;

function CompetitorCreateModal() {
  const navigate = useNavigate();

  const { data: organization } = useOrganization();

  const createCompetitorMutation = useCreateCompetitor({
    onSuccess(data, params) {
      notification.success("创建成功");
      createCompetitorModal.close();
    },
  });

  const handleCancel = () => createCompetitorModal.close();

  const handleSubmit = (params: any) => {
    createCompetitorMutation.mutate({
      organizationId: organization.organizationId,
      siteUrl: params.siteUrl,
    });
  };

  return (
    <Modal
      open={createCompetitorModal.visible}
      centered={true}
      maskClosable={true}
      onCancel={handleCancel}
      footer={false}
      width={710}
      closable={true}
      title={"新增竞品"}
      closeIcon={
        <CloseCircleFilled
          style={{
            fontSize: 20,
          }}
        />
      }
    >
      <FlexColumn
        style={{
          flexGrow: 1,
          padding: 8,
        }}
      >
        <Form
          onFinish={handleSubmit}
          style={{
            marginTop: 20,
          }}
        >
          <Form.Item
            name="siteUrl"
            rules={[{ required: true, message: "请输入主题" }]}
          >
            <Input
              maxLength={200}
              placeholder="输入竞品网址 例如： www.example.com/product/shoes"
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              <PlusOutlined /> 创建
            </Button>
          </Form.Item>
        </Form>
      </FlexColumn>
    </Modal>
  );
}

export default observer(CompetitorCreateModal);

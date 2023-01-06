import Avatar from "@/components/display/Avatar";
import SBFlex, { FlexRow } from "@/components/display/Flex";
import { Organization } from "@/query/organization/types";
import { Project } from "@/query/project/types";
import { getUser } from "@/utils/auth";
import {
  ExportOutlined,
  PlusOutlined,
  ReloadOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { Divider, Modal, Popover, Tooltip } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import InviteMember from "../invite";

import Button from "@/components/base/Button";
import { analysisSite } from "@/query/analysis";
import * as notification from "@/components/display/Notification";
import queryClient from "@/query/client";
import { useProject } from "@/query/project";
import { useOrganization } from "@/query/organization";
import iconInvite from "@/assets/dashboard/icon-invite.svg";
import iconSwitch from "@/assets/dashboard/icon-switch.svg";

const Root = styled(SBFlex)`
  width: 100%;
  height: 40px;
  background: white;
  align-items: center;
  padding: 0 20px;
`;

const Navigation = styled.div`
  font-size: 14px;
  color: rgba(31, 31, 31, 0.6);
`;

const NavigationItem = styled.span`
  margin: 0 16px;
`;

const InviteIcon = styled.span`
  width: 24px;
  height: 24px;
  cursor: pointer;
  img {
    width: 100%;
  }
`;

const ToolWrapper = styled(FlexRow)`
  align-items: center;
`;

function DashboardNav({
  title,
  projectName,
}: {
  title: string;
  projectName?: string;
}) {
  const navigate = useNavigate();
  const userInfo = getUser();

  const { data: project } = useProject();

  const { data: organization } = useOrganization();
  const [inviteVisiable, setInviteVisiable] = useState(false);

  if (!organization) {
    return <></>;
  }

  return (
    <Root>
      <Navigation>
        <NavigationItem>{organization.name}</NavigationItem>/
        <NavigationItem>
          {projectName ? projectName : project?.siteUrl}
        </NavigationItem>
        /
        <NavigationItem
          style={{
            color: "#1F1F1F",
          }}
        >
          {title}
        </NavigationItem>
      </Navigation>
      <ToolWrapper>
        {organization.users.map((user) => (
          <span
            style={{
              marginLeft: 6,
            }}
          >
            <Avatar
              shape="square"
              size={24}
              id={user.uid}
              icon={user.avatar}
              key={user.uid}
              label={user.nickname}
            />
          </span>
        ))}

        <Divider
          type="vertical"
          style={{
            margin: "0px 8px",
            height: "20px",
          }}
        />
        <Popover
          placement="bottom"
          content={
            <InviteMember
              onClose={() => {
                setInviteVisiable(false);
              }}
            />
          }
          trigger="click"
          showArrow={false}
          open={inviteVisiable}
        >
          <InviteIcon>
            <img
              src={iconInvite}
              onClick={() => {
                setInviteVisiable(true);
              }}
            />
          </InviteIcon>
        </Popover>
      </ToolWrapper>
    </Root>
  );
}

export default DashboardNav;

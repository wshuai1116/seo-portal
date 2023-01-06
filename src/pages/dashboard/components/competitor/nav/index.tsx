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
import { Modal, Popover, Tooltip } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import Button from "@/components/base/Button";
import InviteMember from "../../invite";
import { useOrganization } from "@/query/organization";

const Root = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;

const Navigation = styled.div`
  font-weight: 700;
  font-size: 18px;
  color: #19253d;
`;

const ToolWrapper = styled(FlexRow)`
  > div {
    margin-left: 8px;
  }
  button {
    margin-left: 8px;
  }
`;

function CompetitorNav() {
  const navigate = useNavigate();

  const { data: organization } = useOrganization();

  const [inviteVisiable, setInviteVisiable] = useState(false);

  return (
    <Root>
      <SBFlex
        style={{
          width: "100%",
          marginBottom: 20,
        }}
      >
        <Navigation>
          <span>竞品分析</span>
        </Navigation>
        <ToolWrapper>
          {organization.users.map((user) => (
            <Avatar
              shape="square"
              size={32}
              id={user.uid}
              icon={user.avatar}
              key={user.uid}
              label={user.nickname}
            />
          ))}
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
            <Button
              type="default"
              onClick={() => {
                setInviteVisiable(true);
              }}
              onBlur={() => {
                // setInviteVisiable(false);
              }}
            >
              <UserAddOutlined /> 邀请成员
            </Button>
          </Popover>
        </ToolWrapper>
      </SBFlex>
    </Root>
  );
}

export default CompetitorNav;

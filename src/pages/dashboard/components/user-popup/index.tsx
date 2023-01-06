import Avatar from "@/components/display/Avatar";
import SBFlex, { FlexColumn, FlexRow } from "@/components/display/Flex";
import { Organization } from "@/query/organization/types";
import {
  getPlanName,
  isFree,
  UserSubscription,
} from "@/query/subscription/types";
import { clearLoginInfo, getUser } from "@/utils/auth";
import { CheckOutlined } from "@ant-design/icons";
import { Divider } from "antd";
import Button from "@/components/base/Button";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import { useOrganization } from "@/query/organization";
import { useMemo } from "react";
import iconLogout from "@/assets/common/icon-logout.svg";

const Root = styled.div`
  display: flex;
  flex-direction: row;
  width: 240px;
  text-align: left;
`;

const UserInfoText = styled.div`
  font-weight: 500;
  font-size: 12px;
`;

const ActionItem = styled.div`
  font-weight: 400;
  padding: 12px;
  cursor: pointer;
  font-size: 14px;

  img {
    margin-right: 5px;
  }
`;

function UserPopup({
  userSubscription,
}: {
  userSubscription: UserSubscription;
}) {
  const navigate = useNavigate();

  const userInfo = getUser();

  const handleLogout = () => {
    clearLoginInfo();
    window.location.href = "/";
  };

  if (!userSubscription) {
    return <></>;
  }

  return (
    <Root>
      <FlexColumn>
        <FlexRow
          center
          style={{
            padding: 12,
          }}
        >
          <Avatar
            shape="square"
            size={32}
            id={userInfo?.uid}
            icon={userInfo?.avatar}
            key={userInfo?.uid}
            label={userInfo?.nickname}
          />
          <FlexColumn
            style={{ flexGrow: 1, paddingLeft: 8, justifyContent: "center" }}
          >
            <UserInfoText>{userInfo?.nickname}</UserInfoText>
            <UserInfoText
              style={{
                color: "rgba(31, 31, 31, 0.5)",
              }}
            >
              {getPlanName(userSubscription.subscription.subscriptionType)}
            </UserInfoText>
          </FlexColumn>
        </FlexRow>
        <Divider
          style={{
            margin: "0px",
          }}
        />
        <ActionItem onClick={() => handleLogout()}>
          <img src={iconLogout} />
          退出登录
        </ActionItem>
      </FlexColumn>
    </Root>
  );
}

export default UserPopup;

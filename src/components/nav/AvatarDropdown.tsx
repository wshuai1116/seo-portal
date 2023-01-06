import {
  BaseMenuItem,
  BaseContextMenu,
  BaseContextMenuSection,
  BaseContextMenuSeperator,
} from "@/components/base/Dropdown";

import styled from "styled-components";
import Avatar from "@/components/display/Avatar";
import Button from "@/components/base/Button";
import { useUpdateUserInfo, useUserInfo } from "@/query/user";
import { clearLoginInfo, getToken, getUser, updateUser } from "@/utils/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Wrapper = styled(BaseContextMenu)`
  background-color: #fff;
  position: relative;
  right: 20px;
  padding: 12px 12px;
  margin-right: 20px;
`;

const ItemWrapper = styled(BaseMenuItem)`
  padding: 18px 10px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: bold;
  display: flex;
  margin: 4px 0px;
  color: var(--text-color-bold);
`;

const MenuSection = styled(BaseContextMenuSection)`
  padding: 4px 0;
`;

const MenuSeperator = styled(BaseContextMenuSeperator)`
  margin: 4px 0;
`;

const Nickname = styled.span`
  padding: 12px 12px;
  font-size: 14px;
  font-weight: bold;
  color: var(--text-color-bold);
`;

const ItemText = styled.span`
  padding: 12px 12px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: bold;
  color: var(--text-color-bold);
  display: flex;
  flex-direction: row;
  white-space: nowrap;
  align-items: center;

  Button {
    margin-left: 20px;
  }
`;

const ItemButton = styled.div`
  padding: 12px 12px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: bold;
  color: var(--text-color-bold);
`;

const AvatarDropdown = ({ afterAction }: { afterAction?: () => void }) => {
  const userInfo = getUser();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const navigate = useNavigate();

  const updateUserInfoMutation = useUpdateUserInfo({
    onSuccess(data) {
      updateUser(data);
    },
  });

  const handleLogout = () => {
    setShowLogoutConfirm(false);
    clearLoginInfo();
    window.location.href = "/";
  };

  return (
    <Wrapper>
      <MenuSection>
        <ItemText>
          <Avatar
            shape="square"
            size={32}
            id={userInfo?.uid}
            icon={userInfo?.avatar}
            key={userInfo?.uid}
            label={userInfo?.nickname}
          />
          <Nickname>{userInfo?.nickname}</Nickname>
        </ItemText>
      </MenuSection>

      <MenuSeperator />

      <MenuSection>
        <ItemWrapper
          onClick={() => {
            navigate("/dashboard");
          }}
        >
          进入我的项目
        </ItemWrapper>
      </MenuSection>

      <MenuSeperator />

      <MenuSection>
        <ItemWrapper onClick={() => {}}>修改密码</ItemWrapper>
        <ItemWrapper onClick={() => handleLogout()}>退出登录</ItemWrapper>
      </MenuSection>
    </Wrapper>
  );
};

export default AvatarDropdown;

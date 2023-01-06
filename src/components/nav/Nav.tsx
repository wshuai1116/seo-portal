import logo from "@/assets/common/logo.svg";
import Button from "@/components/base/Button";
import Avatar from "@/components/display/Avatar";
import { getUser, isLogin } from "@/utils/auth";
import { BoldOutlined } from "@ant-design/icons";
import { Dropdown } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useWindowScrollPosition } from "rooks";
import styled from "styled-components";
import SBFlex, { FlexColumn, FlexRow } from "../display/Flex";
import AvatarDropdown from "./AvatarDropdown";

const Root = styled.div`
  width: 100%;
  height: 60px;
  margin: 0 auto;
  overflow: hidden;
  position: fixed;
  display: flex;
  align-items: center;
  z-index: 999;
`;

const NavContent = styled(SBFlex)`
  max-width: 1280px;
  width: 100%;
  margin: 0px auto;
  padding: 0 20px;
  overflow: hidden;
  display: flex;
  align-items: center;
`;

const LogoText = styled.span`
  margin-left: 15px;
  height: 28px;
  font-style: normal;
  font-weight: 700;
  font-size: 22px;
  line-height: 28px;
  color: #000000;
  cursor: pointer;
`;

const NavMenu = styled(FlexRow)`
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: #091429;
  margin-left: 30px;
  cursor: pointer;
  align-items: center;
  :hover {
    color: rgba(9, 20, 41, 0.6);
  }
`;

const NavLink = styled.a`
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: #091429;
  margin-right: 40px;
  :hover {
    color: rgba(9, 20, 41, 0.6);
  }
  :last-child {
    margin-right: 0px;
  }
`;
const NavButton = styled(Button)`
  width: 110px;
  font-size: 14px !important;
  font-weight: bold;
  background-color: rgb(0 0 0 / 100%)
  box-shadow: rgb(0 0 0 / 25%) 0px 2px 6px 0px;
  &:hover {
    background-color: rgb(0 0 0 / 80%);
    color: #FFF !important;
  }
`;

const StyledAvatar = styled(FlexRow)`
  height: 32px;
  gap: 6px;
  overflow: hidden;
  justify-content: center;
`;
const UserAvatar = () => {
  const userInfo = getUser();
  const [avatarDropdownVisible, setAvatarDropdownVisible] = useState(false);
  return (
    <FlexRow center>
      <Dropdown
        trigger={["click", "hover"]}
        placement="bottom"
        visible={avatarDropdownVisible}
        onVisibleChange={(v) => setAvatarDropdownVisible(v)}
        overlay={
          <AvatarDropdown afterAction={() => setAvatarDropdownVisible(false)} />
        }
      >
        <div>
          <StyledAvatar center>
            <Avatar
              shape="square"
              size={32}
              id={userInfo?.uid}
              icon={userInfo?.avatar}
              key={userInfo?.uid}
              label={userInfo?.nickname}
            />
            {userInfo?.nickname}
          </StyledAvatar>
        </div>
      </Dropdown>
    </FlexRow>
  );
};

const Nav = () => {
  const { scrollY: rawScrollY } = useWindowScrollPosition();
  const navigate = useNavigate();
  const scrollY = rawScrollY || 0;

  return (
    <Root
      style={{
        transition: "all 0.2s ease-out",
        background: "white",
        boxShadow: scrollY > 1 ? "rgb(0 0 0 / 9%) 0px 2px 6px 0px" : "none",
      }}
    >
      <NavContent>
        <FlexRow center>
          <a href="/">
            <img style={{ width: 130 }} src={logo} alt="SEO-GO Logo" />
          </a>
        </FlexRow>
        <FlexRow>
          <NavMenu>
            <NavLink onClick={() => navigate("/pricing")}>会员订阅</NavLink>
            {isLogin() ? (
              <Button type="primary" onClick={() => navigate("/dashboard")}>
                进入我的项目
              </Button>
            ) : (
              <>
                <NavLink onClick={() => navigate("/login")}>注册/登录</NavLink>
                <NavLink>
                  <NavButton type="primary" onClick={() => navigate("/login")}>
                    免费试用
                  </NavButton>
                </NavLink>
              </>
            )}
          </NavMenu>
        </FlexRow>
      </NavContent>
    </Root>
  );
};

export default Nav;

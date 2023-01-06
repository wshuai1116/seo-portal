import Button from "@/components/base/Button";
import Avatar from "@/components/display/Avatar";
import SBFlex, { FlexColumn, FlexRow } from "@/components/display/Flex";
import * as notification from "@/components/display/Notification";
import {
  useApproveUser,
  useDisableInvite,
  useEnableInvite,
  useGetInviteCode,
  useListOrganizationUsers,
  useOrganization,
  useQuit,
  useRejectUser,
  useRemoveUser,
} from "@/query/organization";
import { Organization, OrganizationUser } from "@/query/organization/types";
import { Message, useEventEmitter } from "@/states/ws";
import { getUser } from "@/utils/auth";
import {
  CheckOutlined,
  CloseOutlined,
  ExclamationCircleOutlined,
  LoadingOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import { Divider, Modal, Switch } from "antd";
import copy from "copy-to-clipboard";
import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";

const Root = styled.div`
  display: flex;
  flex-direction: row;
  padding: 20px;
  width: 520px;
`;

const Title = styled.span`
  font-size: 16px;
  font-weight: bold;
  color: #5041bc;
  display: flex;
  flex-direction: row;
  align-content: center;
  align-items: center;
`;

const UserItem = styled(SBFlex)`
  margin-top: 15px;
  align-items: center;
  margin-bottom: 15px;
`;

const Nickname = styled.span`
  margin-left: 10px;
  font-weight: bold;
`;

const Role = styled.span`
  color: #b8b8b8;
  font-size: 14px;
  margin-left: 10px;
`;

const InviteLink = styled.div`
  padding: 5px;
  background: #f3f3f3;
  border-radius: 4px;
  color: #6f6f6f;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const ActionBtn = styled(Button)`
  margin-left: 10px;
  font-weight: bold;
  font-size: 14px !important;
  align-items: center;
`;

const Counter = styled.span`
  background-color: #5041bc;
  padding: 1px 8px;
  border-radius: 100px;
  color: #fff;
  font-size: 12px;
  letter-spacing: 2px;
  margin-left: 8px;
`;

function InviteMember({ onClose }: { onClose: () => void }) {
  const navigate = useNavigate();
  const userInfo = getUser();
  const { data: organization } = useOrganization();
  const [switchOn, setSwitchOn] = useState(false);
  const [inviteLink, setInviteLink] = useState<string>("");

  const {
    data: users,
    refetch,
    remove,
  } = useListOrganizationUsers(organization.organizationId);

  const { data: inviteDetail } = useGetInviteCode(organization.organizationId);

  const enableInviteMutation = useEnableInvite({
    onSuccess(data, params) {
      setSwitchOn(true);
      setInviteLink(getInviteLink(data.inviteCode));
      notification.success("操作成功");
    },
  });

  const disableInviteMutation = useDisableInvite({
    onSuccess(data, params) {
      setSwitchOn(false);
      notification.success("操作成功");
    },
  });

  const approveUserMutation = useApproveUser({
    onSuccess(data, params) {
      notification.success("操作成功");
    },
  });

  const rejectUserMutation = useRejectUser({
    onSuccess(data, params) {
      notification.success("操作成功");
    },
  });

  const quitMutation = useQuit({
    onSuccess(data, params) {
      window.location.href = "/dashboard";
    },
  });

  const removeUserMutation = useRemoveUser({
    onSuccess(data, params) {
      notification.success("操作成功");
    },
  });

  const eventEmitter = useEventEmitter();

  useEffect(() => {
    return () => {
      remove();
    };
  }, []);

  useEffect(() => {
    const listener = (message: Message) => {
      if (message.topic === "organization-apply") {
        if (message.params.organizationId !== organization.organizationId) {
          return;
        }
        refetch();
      }
    };

    if (eventEmitter) {
      eventEmitter.addListener("message", listener);
    }

    return () => {
      eventEmitter?.removeListener("message", listener);
    };
  }, [eventEmitter]);

  const approvedUsers = useMemo(() => {
    return organization.users.filter((user: OrganizationUser) => {
      return user.status === "APPROVED";
    });
  }, [organization]);

  const isSelfAdmin = useMemo(() => {
    return organization.uid === userInfo?.uid;
  }, [organization]);

  const onSwitchChange = (v: boolean) => {
    if (v) {
      enableInviteMutation.mutate({
        organizationId: organization.organizationId,
      });
    } else {
      disableInviteMutation.mutate({
        organizationId: organization.organizationId,
      });
    }
  };
  const getInviteLink = (inviteCode: string) => {
    return `https://www.seo-go.top/organization/${organization.organizationId}/invite?code=${inviteCode}`;
  };

  useEffect(() => {
    if (inviteDetail?.inviteCode) {
      setInviteLink(getInviteLink(inviteDetail.inviteCode));
      setSwitchOn(true);
    } else {
      setSwitchOn(false);
    }
  }, [inviteDetail]);

  const getUserAction = (user: OrganizationUser) => {
    if (user.role === "ADMIN") {
      return <Role>管理员</Role>;
    }
    if (user.role === "MEMBER") {
      if (user.status === "PENDING") {
        return (
          <FlexRow center>
            <ActionBtn type="primary" onClick={() => handleApprove(user.uid)}>
              <CheckOutlined /> 同意加入
            </ActionBtn>
            <ActionBtn
              type="primary"
              danger
              onClick={() => handleReject(user.uid)}
            >
              <CloseOutlined /> 拒绝加入
            </ActionBtn>
          </FlexRow>
        );
      }
      if (user.status === "APPROVED") {
        if (isSelfAdmin) {
          return (
            <FlexRow center>
              <ActionBtn
                type="primary"
                danger
                onClick={() => handleRemove(user)}
              >
                <MinusCircleOutlined /> 移除
              </ActionBtn>
              <Role>成员</Role>
            </FlexRow>
          );
        } else {
          return (
            <FlexRow center>
              <ActionBtn type="text" onClick={() => handleQuit()}>
                退出
              </ActionBtn>
              <Role>成员</Role>
            </FlexRow>
          );
        }
      }
    }
  };

  const handleApprove = (targetUid: string) => {
    approveUserMutation.mutate({
      organizationId: organization.organizationId,
      targetUid: targetUid,
    });
  };

  const handleReject = (targetUid: string) => {
    rejectUserMutation.mutate({
      organizationId: organization.organizationId,
      targetUid: targetUid,
    });
  };

  const handleQuit = () => {
    Modal.confirm({
      icon: <ExclamationCircleOutlined />,
      content: `确定退出该组织吗`,
      maskClosable: true,
      onOk() {
        quitMutation.mutate({
          organizationId: organization.organizationId,
        });
      },
      zIndex: 9999,
    });
  };

  const handleRemove = (user: OrganizationUser) => {
    Modal.confirm({
      icon: <ExclamationCircleOutlined />,
      content: `确定移除${user.nickname}吗`,
      maskClosable: true,
      onOk() {
        removeUserMutation.mutate({
          organizationId: organization.organizationId,
          targetUid: user.uid,
        });
      },
      zIndex: 9999,
    });
  };

  if (!inviteDetail || !users) {
    return (
      <Root
        style={{
          justifyContent: "center",
        }}
      >
        <LoadingOutlined />
      </Root>
    );
  }

  return (
    <Root>
      <FlexColumn
        style={{
          width: "100%",
        }}
      >
        <SBFlex>
          <Title>
            成员{" "}
            <Counter>
              {approvedUsers.length}/{users.length}
            </Counter>
          </Title>
          <CloseOutlined
            style={{ fontSize: 16, color: "#ccc" }}
            onClick={() => onClose()}
          />
        </SBFlex>
        <Divider style={{ margin: "12px 0" }} />
        <div>
          {users.map((user: OrganizationUser) => {
            return (
              <UserItem>
                <FlexRow center>
                  <Avatar
                    shape="square"
                    size={30}
                    id={user?.uid}
                    icon={user?.avatar}
                    key={user?.uid}
                    label={user?.nickname}
                  />
                  <Nickname>{user.nickname}</Nickname>
                </FlexRow>
                <FlexRow>{getUserAction(user)}</FlexRow>
              </UserItem>
            );
          })}
        </div>
        <Divider style={{ margin: "12px 0" }} />
        <div
          style={{
            marginBottom: 10,
            fontWeight: "bold",
          }}
        >
          邀请新成员
        </div>
        <FlexRow
          style={{
            marginBottom: 10,
          }}
        >
          <Switch
            checked={switchOn}
            onChange={onSwitchChange}
            loading={
              enableInviteMutation.isLoading || disableInviteMutation.isLoading
            }
          />
          <span
            style={{
              marginLeft: 10,
              color: "#b8b8b8",
            }}
          >
            {switchOn
              ? "已开启邀请链接，任何获得该链接的人可以申请，管理员审核后加入"
              : "未开启，只有已添加的协作者可访问此项目"}
          </span>
        </FlexRow>
        {switchOn ? (
          <FlexRow>
            <InviteLink>{inviteLink}</InviteLink>
            <Button
              type="primary"
              onClick={() => {
                copy(inviteLink, {
                  format: "text/plain",
                });
                notification.success("复制成功");
              }}
              style={{
                marginLeft: 10,
              }}
            >
              复制链接
            </Button>
          </FlexRow>
        ) : null}
      </FlexColumn>
    </Root>
  );
}

export default InviteMember;

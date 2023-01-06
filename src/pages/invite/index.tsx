import SBFlex, { FlexColumn } from "@/components/display/Flex";
import LoginForm from "@/pages/login/components/LoginForm";
import { useApply, useGetOrganizationSimple } from "@/query/organization";
import { Message, useEventEmitter } from "@/states/ws";
import { getUser, isLogin } from "@/utils/auth";
import localStorage from "@/utils/localStorage";
import {
  CloseOutlined,
  HourglassOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import Button from "@/components/base/Button";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import styled from "styled-components";

const Root = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: row;
`;

const MainWrapper = styled(FlexColumn)`
  align-items: center;
  justify-content: center;
  flex-grow: 1;
`;

const Container = styled.div`
  box-shadow: 0px 0px 22px rgba(169, 169, 169, 0.25);
  border-radius: 10px;
  width: 480px;
  min-height: 280px;
  padding: 30px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  font-size: 16px;
  font-weight: bold;
`;
const Desc = styled(FlexColumn)`
  align-items: center;
  flex-grow: 1;
  justify-content: center;
`;
const IconWrapper = styled.div`
  font-size: 18px;
  padding: 20px 0;
  color: #483aa9;
`;
const Subtitle = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: #483aa9;
`;
const ButtonWrapper = styled.div`
  margin: 30px 0 0 0;
`;

function Invite() {
  const [params] = useSearchParams();
  const { organizationId } = useParams();
  const [errorMessage, setErrorMessage] = useState<string>();

  const { data: organization } = useGetOrganizationSimple(
    organizationId as string,
    {
      onSuccess(data) {
        if (!isLogin()) {
          localStorage.set(
            "redirect",
            window.location.pathname + window.location.search
          );
        }
      },
    }
  );

  const applyMutation = useApply({
    onSuccess(data) {
      setErrorMessage(undefined);
    },
    onError(e) {
      if (e.errorCode === "9004") {
        window.location.href = `/organization/${organizationId}`;
      } else {
        setErrorMessage("链接已关闭或不存在");
      }
    },
  });

  const eventEmitter = useEventEmitter();

  useEffect(() => {
    const listener = (message: Message) => {
      if (
        message.params.organizationId !== organizationId ||
        message.params.uid !== getUser()?.uid
      ) {
        return;
      }
      if (message.topic === "organization-approve") {
        window.location.href = `/organization/${message.params.organizationId}`;
      }
      if (message.topic === "organization-reject") {
        setErrorMessage("您的申请未通过，请于项目管理员联系");
      }
    };

    if (eventEmitter) {
      eventEmitter.addListener("message", listener);
    }

    return () => {
      eventEmitter?.removeListener("message", listener);
    };
  }, [eventEmitter]);

  useEffect(() => {
    if (!isLogin()) {
      return;
    }
    applyMutation.mutate({
      organizationId: organizationId as string,
      inviteCode: params.get("code") as string,
    });
  }, []);

  const getError = () => {
    return (
      <Root>
        <MainWrapper>
          <Container>
            <SBFlex>
              <Title>申请加入</Title>
              <CloseOutlined onClick={() => (window.location.href = "/")} />
            </SBFlex>
            <Desc>
              <IconWrapper>
                <WarningOutlined style={{ fontSize: 38, color: "#ff7875" }} />
              </IconWrapper>
              <Subtitle>{errorMessage}</Subtitle>
              <ButtonWrapper>
                <Button
                  type="primary"
                  onClick={() => (window.location.href = "/")}
                >
                  返回首页
                </Button>
              </ButtonWrapper>
            </Desc>
          </Container>
        </MainWrapper>
      </Root>
    );
  };

  if (!organization) {
    return <></>;
  }

  if (!isLogin()) {
    return (
      <Root>
        <MainWrapper>
          <div
            style={{ marginBottom: 30, fontSize: 16, fontWeight: "bold" }}
          >{`“${organization.name}” 邀请你加入，请先登录您的账号`}</div>
          <Container>
            <LoginForm />
          </Container>
        </MainWrapper>
      </Root>
    );
  }

  if (errorMessage) {
    return getError();
  }

  return (
    <Root>
      <MainWrapper>
        <Container>
          <SBFlex>
            <Title>
              <span
                style={{
                  fontWeight: "bold",
                }}
              >
                申请加入
              </span>{" "}
              {organization.name}
            </Title>
            <CloseOutlined
              style={{ fontSize: 16 }}
              onClick={() => (window.location.href = "/")}
            />
          </SBFlex>
          <Desc>
            <IconWrapper>
              <HourglassOutlined style={{ fontSize: 38 }} />
            </IconWrapper>
            <Subtitle>正在等待管理员审核</Subtitle>
          </Desc>
        </Container>
      </MainWrapper>
    </Root>
  );
}

export default Invite;

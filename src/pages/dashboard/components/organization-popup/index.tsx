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
import { CheckOutlined } from "@ant-design/icons";
import { Divider, Popover } from "antd";
import Button from "@/components/base/Button";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import { useOrganization } from "@/query/organization";
import { useMemo } from "react";
import { Project } from "@/query/project/types";
import { useGetUserSubscription } from "@/query/subscription";
import iconSwitch from "@/assets/dashboard/icon-switch.svg";
import iconChecked from "@/assets/common/icon-checked.svg";
import iconCheckedActive from "@/assets/common/icon-checked-active.svg";
import { useProject } from "@/query/project";

const Root = styled.div`
  display: flex;
  flex-direction: row;
  width: 278px;
  text-align: left;
`;

const SectionTitleContainer = styled(SBFlex)`
  padding: 13px 16px 0px 16px;
`;

const SectionTitle = styled.div`
  font-weight: 400;
  font-size: 14px;
  color: rgba(31, 31, 31, 0.6);
`;

const OrgInfoText = styled.div`
  font-weight: 500;
  font-size: 12px;
`;

const OrgInfoWrapper = styled.div`
  padding: 0px;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const ProjectContainer = styled.div``;

const OrgCheckIcon = styled.span`
  width: 24px;
  height: 24px;
  margin-right: 6px;
`;

const OrgItem = styled(FlexRow)<{
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
  }

  ${OrgCheckIcon} {
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

function OrganizationPopup({
  organizations,
}: {
  organizations?: [Organization];
}) {
  const navigate = useNavigate();

  const { data: userSubscription } = useGetUserSubscription();

  const { data: organization } = useOrganization();

  const { data: project } = useProject();

  const userInfo = getUser();

  const selfOrg = useMemo(() => {
    return organizations.find((v) => v.uid === userInfo?.uid);
  }, [organizations]);

  const joinedOrg = useMemo(() => {
    return organizations.filter((v) => {
      return v.uid != userInfo?.uid;
    });
  }, [organizations]);

  if (!organization || !organizations) {
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
          <SectionTitle>已加入的组织</SectionTitle>
        </SectionTitleContainer>
        <OrgInfoWrapper>
          {joinedOrg.length > 0 ? (
            joinedOrg.map((o) => {
              return (
                <OrgItem
                  active={organization.organizationId === o.organizationId}
                  onClick={() =>
                    (window.location.href = `/organization/${o.organizationId}`)
                  }
                >
                  <OrgCheckIcon /> <span>{o.name}</span>
                </OrgItem>
              );
            })
          ) : (
            <CenterItem
              style={{
                textAlign: "center",
              }}
            >
              <div>
                未加入任何组织
                <br /> <a href="/pricing" target="_blank">点击开通</a> 团队版或企业版
              </div>
            </CenterItem>
          )}
        </OrgInfoWrapper>
        <Divider
          style={{
            margin: 0,
            backgroundColor: "#E1E3E6",
          }}
        />
        <OrgItem
          active={organization.organizationId === selfOrg?.organizationId}
          onClick={() => navigate(`/organization/${selfOrg?.organizationId}`)}
        >
          <OrgCheckIcon /> <span>{selfOrg?.name}</span>
        </OrgItem>
      </FlexColumn>
    </Root>
  );
}

export default OrganizationPopup;

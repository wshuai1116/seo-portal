import iconAllPageActive from "@/assets/seo/icon-allpage-active.svg";
import iconAllPage from "@/assets/seo/icon-allpage.svg";
import iconUnResolvedActive from "@/assets/seo/icon-unresolved-active.svg";
import iconUnResolved from "@/assets/seo/icon-unresolved.svg";
import { CenterItem, FlexRow } from "@/components/display/Flex";
import { TaskSummary } from "@/query/analysis/types";
import { useOrganization } from "@/query/organization";
import { Modal, Tabs } from "antd";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import AllPages from "../all-pages";
import UnResolvedPages from "../unresolved-pages";
import Button from "@/components/base/Button";
import { Nodata } from "../../../shared";

const Root = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 30px;
  flex-grow: 1;
  position: relative;

  .ant-collapse-header-text {
    flex-grow: 1 !important;
  }
`;

const TabTitle = styled.span`
  font-size: 14px;
  color: rgba(31, 31, 31, 0.75);
`;

const TabIcon = styled.div`
  display: inline-block;
  width: 24px;
  height: 24px;
  margin-right: 6px;
`;

const AllPageIcon = styled(TabIcon)`
  background-image: url(${iconAllPage});
`;

const UnResovledIcon = styled(TabIcon)`
  background-image: url(${iconUnResolved});
`;

const StyledTabs = styled(Tabs)`
  width: 100%;
  font-size: 14px;

  .ant-tabs-nav {
    margin: 0;
  }

  .ant-tabs-nav::before {
    border: none;
  }

  .ant-tabs-tab {
    border-width: 1px 1px 0px 1px !important;
    border-style: solid !important;
    border-color: transparent !important;
    border-radius: 4px 4px 0px 0px !important;
    background: transparent !important;
  }

  .ant-tabs-tab-active {
    background: #f7f8fa !important;
    border-color: #e1e3e6 !important;
  }

  .ant-tabs-tab-active {
    ${TabTitle} {
      color: #5a65ea;
    }
    ${AllPageIcon} {
      background-image: url(${iconAllPageActive});
    }
    ${UnResovledIcon} {
      background-image: url(${iconUnResolvedActive});
    }
  }
  .ant-tabs-nav-list .ant-tabs-tab {
    transition: none !important;
  }
  .ant-tabs-tab-btn {
    transition: none;
    :hover {
      ${TabTitle} {
        color: #5a65ea;
      }
      ${AllPageIcon} {
        background-image: url(${iconAllPageActive});
      }
      ${UnResovledIcon} {
        background-image: url(${iconUnResolvedActive});
      }
    }
  }
`;

const ShowMoreMask = styled(FlexRow)`
  position: absolute;
  left: 0;
  bottom: 0;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0) 0%,
    #ffffff 70.31%,
    #ffffff 100%
  );
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 400px;
`;

function ReportContent({ taskSummary }: { taskSummary?: TaskSummary }) {
  const navigate = useNavigate();

  const { data: organization } = useOrganization();

  const isFree = useMemo(() => {
    return (
      organization.userSubscription.subscription.subscriptionType === "FREE"
    );
  }, [organization]);

  const handleShowMore = () => {
    Modal.info({
      title: "升级你的订阅计划以获得更多的会员权益",
      okText: "升级",
      centered: true,
      closable: true,
      maskClosable: true,
      onOk: () => {
        window.location.href = "/pricing";
      },
    });
  };

  return (
    <Root>
      <StyledTabs
        defaultActiveKey="2"
        type="card"
        animated={false}
        items={[
          {
            label: (
              <CenterItem>
                <AllPageIcon />
                <TabTitle>所有页面</TabTitle>
              </CenterItem>
            ),
            key: "all-pages",
            children: (
              <>
                {taskSummary ? (
                  <AllPages taskSummary={taskSummary} />
                ) : (
                  <Nodata />
                )}
              </>
            ),
          },
          {
            label: (
              <CenterItem>
                <UnResovledIcon />
                <TabTitle>待解决</TabTitle>
              </CenterItem>
            ),
            key: "unresolved-pages",
            children: (
              <>
                {taskSummary ? (
                  <UnResolvedPages taskSummary={taskSummary} />
                ) : (
                  <Nodata />
                )}
              </>
            ),
          },
        ]}
      />
      {isFree ? (
        <ShowMoreMask>
          <Button
            type="primary"
            onClick={() => handleShowMore()}
            style={{
              width: 216,
            }}
          >
            展示更多
          </Button>
        </ShowMoreMask>
      ) : null}
    </Root>
  );
}

export default ReportContent;

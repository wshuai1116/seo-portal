import Button from "@/components/base/Button";
import BodyWrapper from "@/components/body-wrapper/BodyWrapper";
import { CenterItem, FlexColumn, FlexRow, SBFlex } from "@/components/display/Flex";
import Footer from "@/components/footer/Footer";
import Nav from "@/components/nav/Nav";
import { isLogin } from "@/utils/auth";
import { Segmented } from "antd";
import { useState, useEffect } from "react";
import styled from "styled-components";
import QASection from "./components/QASection";
import SubscriptionModal from "./components/SubscriptionModal";
import { subscriptionModal } from "./states";
import {
  useSubscriptionList,
  useGetUserSubscription,
} from "@/query/subscription";
import {
  getPlanName,
  getPlanRank,
  Subscription,
  getPeriodName,
  PlanType,
} from "@/query/subscription/types";
import { Helmet } from "react-helmet";
import * as notification from "@/components/display/Notification";

const Root = styled.div``;

const Title = styled.div`
  margin-top: 113px;
  font-family: "Sofia Pro", Roboto;
  color: #091429;
  font-size: 48px;
  margin-bottom: 20px;
  text-align: center;
`;

const SubTitle = styled.div`
  color: #091429;
  font-size: 20px;
  margin-bottom: 34px;
  text-align: center;
`;

const DurationSegment = styled.div`
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 50px;

  .ant-segmented {
    border-radius: 100px;
  }

  .ant-segmented-thumb {
    border-radius: 100px;
    border: 2px solid #2d66f4;
  }

  .ant-segmented-item {
    border-radius: 100px;
    .ant-segmented-item-label {
      border: 2px solid transparent;
    }
  }

  .ant-segmented-item-selected {
    .ant-segmented-item-label {
      border: 2px solid #2d66f4;
      border-radius: 100px;
    }
  }
`;

const SegmentItem = styled(CenterItem)`
  width: 156px;
  height: 48px;
  font-size: 18px;
  color: #091429;
`;

const PricingSection = styled(FlexRow)`
  align-items: start;
  justify-content: center;
  margin-bottom: 150px;
`;

const PricingItem = styled(FlexColumn)`
  padding: 24px;
  width: 285px;
  background: rgba(255, 255, 255, 0.5);
  border: 1px solid #eeeeee;
  box-shadow: 0px 50px 60px rgba(0, 0, 0, 0.04);
  margin-left: 16px;
  margin-right: 16px;
  color: #091429;
  border-radius: 16px;
  text-align: center;

  :hover {
  }
`;

const PricingTitle = styled.div`
  font-weight: 500;
  font-size: 32px;
  margin-bottom: 17px;
`;
const PricingFee = styled(FlexColumn)`
  height: 180px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  margin-bottom: 38px;
  justify-content: center;
  padding: 25px;
`;
const PricingButton = styled(Button)`
  width: 100%;
  border: 2px solid #091429;
  height: 46px !important;
  font-size: 16px !important;
`;
const PricingFeatureGroup = styled(FlexColumn)`
  margin-top: 24px;
`;
const PricingFeatureItem = styled(SBFlex)`
  width: 100%;
  padding: 14px 0px;
`;

const PricingNode = ({ subscription }: { subscription: Subscription }) => {
  const { data: userSubscription } = isLogin()
    ? useGetUserSubscription()
    : {
        data: {
          subscription: {
            subscriptionType: "FREE",
          },
        },
      };

  const getActionButtonText = (subscriptionType: string) => {
    if (userSubscription?.subscription.subscriptionType === "FREE") {
      return "????????????";
    } else if (
      userSubscription?.subscription.subscriptionType === subscriptionType
    ) {
      return "????????????";
    } else if (
      getPlanRank(userSubscription?.subscription.subscriptionType as PlanType) <
      getPlanRank(subscriptionType as PlanType)
    ) {
      return "????????????";
    } else {
      return "????????????";
    }
  };
  const handlePriceItemClick = (subscription: Subscription) => {
    if (
      getPlanRank(userSubscription?.subscription.subscriptionType as PlanType) >
      getPlanRank(subscription.subscriptionType as PlanType)
    ) {
      notification.error("?????????????????????????????????");
    } else {
      subscriptionModal.open(subscription);
    }
  };

  const getCurrency = () => {
    return (
      <span
        style={{
          fontSize: 24,
        }}
      >
        ???
      </span>
    );
  };

  const getPricingButton = (subscription: Subscription) => {
    if (subscription.subscriptionType === "FREE") {
      return (
        <PricingButton
          type="default"
          onClick={() => {
            window.location.href = "/dashboard";
          }}
        >
          ????????????
        </PricingButton>
      );
    }
    if (subscription.subscriptionType === "ENTERPRISE") {
      return (
        <PricingButton
          type="primary"
          onClick={() => {
            window.location.href = "/contact";
          }}
        >
          ????????????
        </PricingButton>
      );
    }
    return (
      <PricingButton
        type="primary"
        onClick={() => {
          handlePriceItemClick(subscription);
        }}
      >
        {getActionButtonText(subscription.subscriptionType)}
      </PricingButton>
    );
  };

  return (
    <PricingItem>
      <PricingTitle>{getPlanName(subscription.subscriptionType)}</PricingTitle>
      <PricingFee>
        <div>
          {subscription.subscriptionType === "ENTERPRISE" ? (
            <span
              style={{
                fontSize: 14,
                lineHeight: "16px",
              }}
            >
              ???????????????????????????
              <br />
              ????????????????????????????????????
            </span>
          ) : (
            <>
              {getCurrency()}
              <span
                style={{
                  fontSize: 46,
                  fontWeight: 700,
                }}
              >
                {subscription.discountPrice}
              </span>
              <span
                style={{
                  fontSize: 24,
                }}
              >
                / {getPeriodName(subscription.period)}
              </span>
            </>
          )}
        </div>
        {subscription.discountPrice < subscription.price ? (
          <div
            style={{
              color: "#A4A4A4",
              textDecorationLine: "line-through",
              fontWeight: 500,
              fontSize: 24,
            }}
          >
            {getCurrency()}
            {subscription.price}/{getPeriodName(subscription.period)}
          </div>
        ) : null}
      </PricingFee>
      {getPricingButton(subscription)}
      <PricingFeatureGroup>
        <PricingFeatureItem>
          <span>????????????</span>
          <span>
            {subscription?.projectCount < 0
              ? "??????"
              : `${subscription?.projectCount}???`}
          </span>
        </PricingFeatureItem>
        <PricingFeatureItem>
          <span>????????????</span>
          <span>
            {subscription?.analysisCount < 0
              ? "??????"
              : `${subscription?.analysisCount}???`}
          </span>
        </PricingFeatureItem>
        <PricingFeatureItem>
          <span>????????????</span>
          <span>{subscription?.pageCount}???</span>
        </PricingFeatureItem>
        {subscription?.competitorCount > 0 ? (
          <PricingFeatureItem>
            <span>??????????????????</span>
            <span>{subscription?.competitorCount}</span>
          </PricingFeatureItem>
        ) : null}
        {subscription?.teamMemberCount > 0 ? (
          <PricingFeatureItem>
            <span>????????????</span>
            <span>{subscription?.teamMemberCount}???</span>
          </PricingFeatureItem>
        ) : null}
        {subscription?.downloadReport == 1 ? (
          <PricingFeatureItem>
            <span>????????????</span>
            <span>???</span>
          </PricingFeatureItem>
        ) : null}
      </PricingFeatureGroup>
    </PricingItem>
  );
};

const Pricing = () => {
  const [period, setPeriod] = useState("MONTH");
  const {
    data: subscriptionList,
    isLoading,
    refetch,
  } = useSubscriptionList({
    period: period,
  });

  const handlePeriodChange = (v: any) => {
    setPeriod(v);
  };

  useEffect(() => {
    refetch();
  }, [period]);

  return (
    <Root>
      <Helmet>
        <title>????????????-????????????-SEOGO</title>
        <meta
          name="description"
          content="SEOGO??????????????????????????????????????????????????????????????????????????????????????????????????????"
        />
      </Helmet>
      <Nav />
      <BodyWrapper>
        <Title>??????????????????????????????</Title>
        <DurationSegment>
          <Segmented
            onChange={(v) => handlePeriodChange(v)}
            options={[
              {
                label: <SegmentItem>??????</SegmentItem>,
                value: "MONTH",
              },
              {
                label: <SegmentItem>??????</SegmentItem>,
                value: "QUARTER",
              },
              {
                label: (
                  <SegmentItem>
                    ??????
                    <span
                      style={{
                        marginLeft: 14,
                        background: "#D0F2D0",
                        borderRadius: 4,
                        padding: "2px 4px",
                        color: "#3A7A56",
                        fontSize: 14,
                      }}
                    >
                      ??????15%
                    </span>
                  </SegmentItem>
                ),
                value: "YEAR",
              },
            ]}
            onResize={null}
            onResizeCapture={null}
          />
        </DurationSegment>
        <PricingSection>
          {subscriptionList?.map((item) => {
            return <PricingNode key={item.commodityId} subscription={item} />;
          })}
        </PricingSection>
        <QASection />
      </BodyWrapper>
      <SubscriptionModal />
      <Footer />
    </Root>
  );
};

export default Pricing;

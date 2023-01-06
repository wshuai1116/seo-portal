import { subscriptionModal } from "../../states";

import Modal from "@/components/base/Modal";
import { observer } from "mobx-react-lite";
import styled, { css } from "styled-components";

import Button from "@/components/base/Button";
import iconWechat from "@/assets/pricing/icon-wechat-pay.svg";
import iconAlipay from "@/assets/pricing/icon-alipay.svg";
import {
  useCreateOrder,
  useCreateAlipayOrder,
  useCreateWechatOrder,
} from "@/query/subscription";
import * as notification from "@/components/display/Notification";

import { useState } from "react";

import {
  CenterItem,
  FlexColumn,
  SBFlex,
  FlexRow,
} from "@/components/display/Flex";
import {
  getPlanName,
  PlanType,
  Subscription,
  getPeriodName,
  AlipayOrderInfo,
} from "@/query/subscription/types";
import {
  CloseCircleFilled,
  CloseCircleOutlined,
  CloseOutlined,
} from "@ant-design/icons";

const Title = styled(FlexColumn)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 120px;
  background: #5041bc;
  border-radius: 16px 16px 0px 0px;
  justify-content: center;
  color: white;
  font-size: 32px;
  padding-left: 32px;
`;

const ActionForm = styled(FlexColumn)`
  margin-top: 140px;
  margin-bottom: 65px;
`;

const ActionFormItem = styled(SBFlex)`
  padding: 16px 24px;
  font-size: 16px;
  align-items: center;
  border-radius: 12px;
  background-color: white;
  margin-bottom: 12px;
`;

const PaymentChannelButton = styled(CenterItem)<{
  active?: boolean;
}>`
  height: 40px;
  font-size: 16px;
  border-radius: 20px;
  padding: 8px 18px;
  cursor: pointer;
  margin-left: 12px;
  font-size: 16px;
  ${(props) =>
    props.active
      ? css`
          background: rgba(45, 102, 244, 0.1);
          border: 1px solid #2d66f4;
        `
      : css`
          background: transparent;
          border: 1px solid rgba(9, 20, 41, 0.15) !important;
        `};
  img {
    width: 32px;
    height: 28px;
    margin-right: 5px;
  }
`;

const SubscriptionModal = () => {
  const handleCancel = () => subscriptionModal.close();

  const subscription = subscriptionModal.currentSubscription;
  const [paymentChannel, setPaymentChannel] = useState("WECHAT");

  const createAlipayMutation = useCreateAlipayOrder({
    onError(e) {
      if (e.message) {
        notification.error(e.message);
      }
    },
    onSuccess(data) {
      let child = document.createElement("div");
      child.innerHTML = data.form;
      let form = child.firstChild;
      // child.target = "alipayRedirect"
      document.body.appendChild(child);

      // self.startCheckOrderStatus()
      // @ts-ignore
      form!.submit();
    },
  });

  const createWechatMutation = useCreateWechatOrder({
    onError(e) {
      if (e.message) {
        notification.error(e.message);
      }
    },
    onSuccess(data) {
      window.location.href =
        "/pay/wechat/order-create?codeUrl=" +
        encodeURIComponent(data.codeUrl) +
        "&orderId=" +
        data.orderId;
    },
  });
  const createOrderMutation = useCreateOrder({
    onError(e) {
      if (e.message) {
        notification.error(e.message);
      }
    },
    onSuccess(data) {
      if (paymentChannel === "WECHAT") {
        createWechatMutation.mutate({
          orderId: data.orderId,
        });
      }

      if (paymentChannel === "ALIPAY") {
        createAlipayMutation.mutate({
          orderId: data.orderId,
        });
      }
    },
  });

  const handleOrderCreate = () => {
    createOrderMutation.mutate({
      commodityId: subscription!.commodityId,
    });
  };

  return (
    <Modal
      visible={subscriptionModal.visible}
      centered={true}
      maskClosable={true}
      onCancel={handleCancel}
      footer={false}
      width={710}
      closable={true}
      closeIcon={
        <CloseCircleFilled
          style={{
            fontSize: 20,
          }}
        />
      }
    >
      <FlexColumn
        style={{
          flexGrow: 1,
          padding: 8,
        }}
      >
        <Title>
          <div>开通会员</div>
        </Title>
        <ActionForm>
          <ActionFormItem>
            <span>有效期</span>
            <span>1{getPeriodName(subscription?.period)}</span>
          </ActionFormItem>
          <ActionFormItem>
            <span>金额</span>
            <span>
              ￥{subscription?.discountPrice}
              <span
                style={{
                  background: "#FCEEEC",
                  color: "#ED615A",
                  textDecorationLine: "line-through",
                  fontWeight: 300,
                  fontSize: 14,
                  marginLeft: 10,
                }}
              >
                ￥{subscription?.price}
              </span>
            </span>
          </ActionFormItem>
          <ActionFormItem>
            <span>支付方式</span>
            <FlexRow>
              <PaymentChannelButton
                active={paymentChannel === "WECHAT" ? true : false}
                onClick={() => setPaymentChannel("WECHAT")}
              >
                <img src={iconWechat} alt="微信支付" />
                微信支付
              </PaymentChannelButton>

              <PaymentChannelButton
                active={paymentChannel === "ALIPAY" ? true : false}
                onClick={() => setPaymentChannel("ALIPAY")}
              >
                <img src={iconAlipay} alt="支付宝支付" />
                支付宝支付
              </PaymentChannelButton>
            </FlexRow>
          </ActionFormItem>
        </ActionForm>
        <Button
          type="primary"
          style={{
            height: 46,
            fontSize: 16,
          }}
          onClick={() => handleOrderCreate()}
        >
          立即支付
        </Button>
      </FlexColumn>
    </Modal>
  );
};

export default observer(SubscriptionModal);

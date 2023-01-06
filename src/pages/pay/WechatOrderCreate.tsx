import styled from "styled-components";
import qs from "query-string";
import { useEffect } from "react";
import { getOrderStatus } from "@/query/subscription";
import { SBFlex, FlexColumn } from "@/components/display/Flex";
import { QRCodeSVG } from "qrcode.react";
import { useNavigate, useSearchParams } from "react-router-dom";
import iconScan from "@/assets/pricing/icon-scan.svg";
import imgPhone from "@/assets/pricing/img-phone.png";
import imgMag from "@/assets/pricing/img-mag.png";

const QrCode = styled.div`
  width: 320px;
  height: 320px;
  background: #fff;
  border: 1px solid rgba(9, 20, 41, 0.2);
  border-radius: 20px;
  padding: 20px;
`;

const QrCodeHint = styled(SBFlex)`
  background: #5590ff;
  border-radius: 8px;
  margin-top: 36px;
  color: #fff;
  padding: 16px 24px;
`;

const Content = styled.div`
  width: 1200px;
  margin: 0 auto;
  padding-top: 143px;
  padding-bottom: 200px;
`;

const Title = styled.div`
  font-size: 32px;
  line-height: 45px;
  color: #091429;
  margin-bottom: 30px;
  font-weight: 500;
`;

const SubTitle = styled.div`
  font-size: 24px;
  line-height: 34px;
  color: #091429;
  font-weight: 500;
`;

const Box = styled.div`
  background: #fff;
  border-radius: 12px;
  padding: 32px;
`;

const WechatOrderCreate = () => {
  const [params, setParams] = useSearchParams();

  const orderId = params.get("orderId");
  const codeUrl = params.get("codeUrl");

  useEffect(() => {
    if (!orderId) {
      return;
    }
    const timer = setInterval(() => {
      getOrderStatus({
        orderId: orderId,
      }).then(({result}) => {
        if (result.status === "COMPLETED") {
          window.location.href = "/";
        }
      });
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [orderId]);
  return (
    <div
      style={{
        background: "#F5F6FA",
      }}
    >
      <Content>
        <SBFlex>
          <Title>订单提交成功，请尽快付款！</Title>
          {/* <Title>
            应付金额：
            <span
              style={{
                color: "#FF4242",
              }}
            >
              11
            </span>
            <span
              style={{
                fontSize: 24,
              }}
            >
              元
            </span>
          </Title> */}
        </SBFlex>
        <Box>
          <SubTitle
            style={{
              marginBottom: 100,
            }}
          >
            微信支付
          </SubTitle>
          <SBFlex
            style={{
              paddingLeft: 109,
              paddingRight: 214,
            }}
          >
            <FlexColumn
              style={{
                marginTop: 30,
              }}
            >
              <QrCode>
                {codeUrl && (
                  <QRCodeSVG size={280} value={decodeURIComponent(codeUrl)} />
                )}
              </QrCode>
              <QrCodeHint>
                <img src={iconScan}  alt="扫描支付二维码" />
                <FlexColumn
                  style={{
                    justifyContent: "space-between",
                    fontSize: 20,
                    lineHeight: "28px",
                  }}
                >
                  <div>请使用微信扫一扫</div>
                  <div>扫描二维码支付</div>
                </FlexColumn>
              </QrCodeHint>
            </FlexColumn>
            <div
              style={{
                position: "relative",
              }}
            >
              <img
                style={{
                  width: 301,
                  marginBottom: 63,
                }}
                src={imgPhone}
              />
              <img
                style={{
                  width: 306,
                  position: "absolute",
                  top: 66,
                  left: -166,
                }}
                src={imgMag}
              />
            </div>
          </SBFlex>
        </Box>
      </Content>
    </div>
  );
};

export default WechatOrderCreate;

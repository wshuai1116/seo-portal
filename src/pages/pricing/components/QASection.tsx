import SBFlex, { FlexRow } from "@/components/display/Flex";
import Collapse from "antd/lib/collapse";
import styled, { css } from "styled-components";

const activeStyle = css`
  background: rgba(9, 20, 41, 0.03);
  border: 1px solid rgba(9, 20, 41, 0.1);
  border-radius: 16px;
`;

const CustomCollapse = styled.div`
  .ant-collapse {
    border: none;
    background: none;

    .ant-collapse-item {
      border: none;
      border: 1px solid transparent;
      padding: 24px;

      .collapse-icon {
        :after {
          display: block;
        }
      }

      :hover {
        ${activeStyle}
      }
    }

    .ant-collapse-content {
      border: none;
      background: none;
    }

    .ant-collapse-header div:first-child {
    }

    .ant-collapse-item.ant-collapse-item-active {
      ${activeStyle}

      .collapse-icon {
        :after {
          display: none;
        }
        :before {
          display: block;
        }
      }
    }
  }
`;

const Title = styled.div`
  font-weight: 500;
  font-size: 40px;
  line-height: 56px;
  color: #091429;
  margin-bottom: 52px;
  text-align: center;
`;

const Wrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding-bottom: 140px;
`;

const Header = styled(SBFlex)`
  font-weight: 500;
  font-size: 24px;
  line-height: 34px;
  color: #091429;
  width: 100%;
  justify-items: center;
  align-items: center;

  .collapse-icon {
    :before {
      content: "-";
      font-size: 36px;
      display: none;
    }
    :after {
      content: "+";
      display: none;
    }
  }
`;

const Content = styled.div`
  font-size: 16px;
  line-height: 22px;
`;

const list: Array<{
  title: string;
  content: string;
}> = [
  {
    title: "会员开通后支持退款吗？",
    content: "不支持。您可以先免费体验，效果满意再开通会员。",
  },
  {
    title: "会员开通后怎么开发票？",
    content:
      "您可以邮件联系seogo@ninemarks.com，我们为您处理发票相关事宜。",
  },
  {
    title: "购买后可以升级套餐吗？",
    content: "可以，您能够随时续费或升级订阅套餐。",
  },
];

const QASection = () => {
  return (
    <Wrapper>
      <Title>常见问题</Title>
      <CustomCollapse>
        <Collapse>
          {list.map((item) => {
            return (
              <Collapse.Panel
                showArrow={false}
                style={{
                  marginBottom: 10,
                }}
                key={item.title}
                header={
                  <Header>
                    {item.title}
                    <span className="collapse-icon" />
                  </Header>
                }
              >
                <Content>{item.content}</Content>
              </Collapse.Panel>
            );
          })}
        </Collapse>
      </CustomCollapse>
    </Wrapper>
  );
};

export default QASection;

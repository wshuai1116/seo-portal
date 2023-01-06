import Button from "@/components/base/Button";
import BodyWrapper from "@/components/body-wrapper/BodyWrapper";
import { FlexColumn, FlexRow } from "@/components/display/Flex";
import * as notification from "@/components/display/Notification";
import Footer from "@/components/footer/Footer";
import Nav from "@/components/nav/Nav";
import { contact } from "@/query/user";
import { Form, Input } from "antd";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import { useState } from "react";

const Root = styled.div``;

const ContentWrapper = styled(FlexRow)`
  width: 1280px;
  padding: 0 50px;
  height: 100%;
  margin: 0 auto;
  max-width: 100%;

  @media screen and (max-width: 560px) {
    padding: 0 20px;
  }
`;

const PageTitle = styled.h1`
  font-size: 38px;
  font-weight: 700;
  padding-top: 40px;
  transition: all 0.2s ease-out;
  color: #000;

  @media screen and (max-width: 560px) {
    font-size: 18px;
  }
`;
const Underline = styled.div`
  height: 5px;
  background-color: #5041bc;
  margin-bottom: 30px;
  width: 100%;
`;
const Company = styled.div`
  margin-top: 30px;
  font-size: 20px;
  border: 5px solid #bfbfbf;
  padding: 40px;
  border-radius: 6px;
  margin-bottom: 30px;

  p {
    margin-bottom: 10px;
  }
`;
const CompanyTitle = styled.div`
  font-size: 40px;
  font-weight: 700;
  margin-bottom: 20px;
`;
const MessageSubmitResult = styled.div`
  width: 100%;
  text-align: center;
  font-size: 22px;
  font-weight: bold;
  color: #000;
  padding: 60px;
`;

function Contact() {
  const [contactModalVisible, setContactModalVisible] = useState(true);

  const handleSubmit = (params: any) => {
    setContactModalVisible(false);
    contact({
      subject: params.subject,
      content: params.content,
      email: params.email,
    }).then(() => {
      notification.success("提交成功");
    });
  };
  return (
    <Root>
      <Helmet>
        <title>联系我们 - 用户反馈 - SEO-GO.top网站优化工具</title>
        <meta
          name="description"
          content="SEO-GO.Top用户反馈，联系我们反馈您在SEO优化过程中遇到的任何问题。"
        />
        <meta http-equiv="content-language" content="zh-cn" />
      </Helmet>
      <Nav />
      <BodyWrapper>
        <ContentWrapper>
          <FlexColumn>
            <PageTitle>联系我们，反馈任何SEO优化和产品问题</PageTitle>
            <Underline></Underline>
            {contactModalVisible ? (
              <Form
                onFinish={handleSubmit}
                style={{
                  width: "100%",
                }}
              >
                <Form.Item
                  label="主题"
                  name="subject"
                  rules={[{ required: true, message: "请输入主题" }]}
                >
                  <Input maxLength={100} placeholder="您需要什么类型的帮助？" />
                </Form.Item>
                <Form.Item
                  label="邮箱"
                  name="email"
                  rules={[{ required: true, message: "请输入邮箱" }]}
                >
                  <Input
                    type={"email"}
                    maxLength={100}
                    placeholder="我们会通过邮件反馈给您"
                  />
                </Form.Item>
                <Form.Item
                  label="内容"
                  name="content"
                  rules={[{ required: true, message: "请输入内容" }]}
                >
                  <Input.TextArea
                    rows={8}
                    maxLength={500}
                    style={{ width: "100%" }}
                    placeholder="描述问题的细节"
                  />
                </Form.Item>
                <Form.Item
                  style={{ justifyContent: "flex-end", display: "flex" }}
                >
                  <Button type="primary" htmlType="submit">
                    提交反馈
                  </Button>
                </Form.Item>
              </Form>
            ) : (
              <MessageSubmitResult>提交成功</MessageSubmitResult>
            )}
            <Company>
              <CompanyTitle>公司介绍</CompanyTitle>
              <p>
                SEO-Go.Top是由SEO-GO团队研发的SEO优化工具，可以自动帮助网站优完成SEO的所有诊断和优化，无需任何相关知识和分析，让网站轻松被发现，让团队的营销与技术人员可以深度协作，将所有反馈与建议快速应用到线上。
                <br />
                <br />
              </p>
              <p>公司地址：上海市徐汇区天钥桥路357号嘉汇国际广场G座1808室</p>
              <p>邮政编码：200030</p>
              <p>联系邮箱：seogo.top@ninemarks.com</p>
            </Company>
          </FlexColumn>
        </ContentWrapper>
      </BodyWrapper>
      <Footer />
    </Root>
  );
}

export default Contact;

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

const Root = styled.div`
`;

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

const PageTitle = styled.div`
  font-size: 50px;
  font-weight: 700;
  padding-top: 40px;
  transition: all .2s ease-out;
  color: #000;

  @media screen and (max-width: 560px) {
    font-size: 30px;
  }
`;
const Underline = styled.div`
  height: 5px;
  background-color: #bfbfbf;
  margin-bottom: 30px;
  max-width: 85%;
  width: 200px;
`;
const Content = styled.div`
  flex-grow: 1;
  overflow: hidden;
  padding: 40px 0;
  color: #000;
  font-size: 16px;
  text-align: justify;
  line-height: 28px;


  @media screen and (max-width: 560px) {
    padding: 0;
  }
  
  b {}

  h6 {
    font-size: 20px;
    margin: 40px 0;
    line-height: 34px;
  }

  .contentGrade1 {
    font-size: 16px;
    margin-top: 30px;
  }

  .contentGrade2 {
    font-size: 16px;
    margin-top: 20px;
  }

  .contentGrade3 {
    font-size: 16px;
  }

  .contentGrade4 {
    padding-left: 72px;
  }

  .contentGrade1 .contentOrder {
    display: inline-block;
    width: 30px;
    content: ' ';
  }

  .contentGrade2 .contentOrder {
    display: inline-block;
    width: 54px;
    content: ' ';
    padding-left: 18px;
  }

  .contentGrade3 .contentOrder {
    display: inline-block;
    width: 64px;
    content: ' ';
    padding-left: 22px;
  }

  a {
    color: #228fe9;
  }

  a:link {
    color: #228fe9;
  }

  a:active {
    color: #228fe9;
  }

  a:visited {
    color: #228fe9;
  }

  a:hover {
    color: #127ad0;
    text-decoration: underline !important;
  }

  a:focus {
    color: #127ad0;
    text-decoration: underline !important;
  }
`;

function LegalCookiePolicy() {
  return (
    <Root>
      <Helmet>
        <title>Cookies政策-SEO-GO.top</title>
        <meta name="description" content="SEO-GO.top隐私政策" />
      </Helmet>
      <Nav />
      <BodyWrapper>
        <ContentWrapper>
          <FlexColumn>
            <PageTitle>Cookies政策</PageTitle>
            <Underline></Underline>
            <Content>
              <p>
                <strong>Cookies政策</strong>
              </p>
              <p>更新时间：2022年12月16日</p>
              <p>
                <strong>1</strong>
                <strong>. 简介</strong>
                <strong></strong>
              </p>
              <p>
                本Cookies政策适用于链接到本政策或通过引用纳入并受到SEO-GO.top（“我们”）支持的任何网站（统称为“网站”）。
              </p>
              <p>
                <strong>2. C</strong>
                <strong>ookie</strong>
                <strong> 是什么？</strong>
                <strong></strong>
              </p>
              <p>
                <strong>2.1</strong>
                我们使用 Cookie 和其他技术来启用网站上的功能。Cookie
                指存储互联网设置的小型文本文件。当您下次使用同一终端设备访问此网站时，Cookie
                及其中包含的信息会发送回原始网站（第一方 Cookie）或其所属的其他网站（第三方
                Cookie）。网站可由此检测到其已使用此浏览器打开，并且在某些情况下，网站会随之改变其显示的内容。
              </p>
              <p>
                <strong>2.2</strong>
                几乎每个网站都会使用 Cookie 技术。有些 Cookie
                是有用的，因为它们能够改善用户体验。此外，Cookie
                还可加快在网站中导航的速度、跟踪信息，因此您不必在每次访问我们的网站时重新输入信息，帮助我们为您提供定制内容，让我们了解您的访问情况。
              </p>
              <p>
                <strong>2.3</strong>
                我们使用的部分 Cookie 需要您的同意，其他则不需要。
              </p>
              <ul>
                <li>
                  <strong>免除同意的 Cookie</strong>
                  ：严格必要的 Cookie 可为相关功能提供保证，如果没有此类
                  Cookie，您将无法按预期使用网站。它们在当前浏览器会话期间存储在您的计算机中。严格必要的
                  Cookie
                  可确保，当您调用网站的功能时，网站会显示宽带相关数据量与您正在使用的互联网连接的宽带相关数据量相对应的版本。此类
                  Cookie 还可保证，当您更改页面时，网站会执行从 http 更改为 https 的功能。此类型的 Cookie
                  还会存储您对在我们的网站上使用 Cookie 而作出的决定。严格必要的 Cookie 不需要您的同意。
                </li>
                <li>
                  <strong>需要同意的 Cookie</strong>
                  ：所有其他并非使用网站而严格必要的 Cookie 仍可用于完成重要任务。如果没有这些
                  Cookie，为了方便您使用我们的网站而设计的功能（例如您的个人设置或表单自动填写功能）将无法保留，因此必须在每个页面上重新输入。
                </li>
              </ul>
              <p>
                <strong>3. </strong>
                <strong>SEO-GO.top</strong>
                <strong>使用的</strong>
                <strong>Cookie</strong>
                <strong>类型</strong>
                <strong></strong>
              </p>
              <p>
                <strong>3.1</strong>
                我们的网站可能会使用三种类型的Cookie：严格必要的 Cookie、性能 Cookie 或功能性 Cookie。
              </p>
              <ul>
                <li>
                  为了让您能够浏览网站并使用其功能，<strong>严格必要的 Cookie</strong> 必不可少。这些临时
                  Cookie
                  仅当您的网页浏览器处于打开状态时才会保留，并且会用于支持在我们的网站中更好地导航等技术目的。如果没有这些
                  Cookie，则无法提供您请求的服务，例如，在返回同一会话中的某个页面时记住之前的操作（例如，输入的文本）。一旦关闭浏览器，Cookie
                  即会消失。
                </li>
                <li>
                  <strong>性能 Cookie</strong>
                  在计算机中存储的时间较长，并且会用于以下目的：跟踪网站的独立访客数量，以及跟踪页面获得的查看次数、用户在某个页面停留的时间及其他相关网页统计数据等信息。这些
                  Cookie 不会保存可识别用户身份的信息。收集的信息经过汇总，因此是匿名的。这些 Cookie
                  专用于改进网站性能以及改善用户体验。
                </li>
                <li>
                  <strong>功能性 Cookie</strong>
                  让网站能够保存已输入的信息（例如用户名、语言选择和您的位置），以便为您提供改进的功能和更加个性化的功能。功能性Cookie
                  还用于启用您所请求的功能，例如播放视频。这些 Cookie
                  会收集匿名信息，但无法跟踪您在其他网站上的活动。
                </li>
              </ul>
              <p>下表列出了我们可能会在网站上使用 Cookie 的原因。</p>
              <table cellSpacing="0" border="1">
                <tbody>
                  <tr>
                    <td width="17.0000%" valign="top">
                      <p align="center">
                        <strong>使用类别</strong>
                      </p>
                    </td>
                    <td width="83.0000%" valign="top">
                      <p align="center">
                        <strong>说明</strong>
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td width="17.0000%" valign="center">
                      <p align="center">
                        <strong>会话和订阅</strong>
                      </p>
                    </td>
                    <td width="83.0000%" valign="center">
                      <p>
                        我们可能会使用这些 Cookie 来满足基本安全要求和确保网站正常运行。这些 Cookie
                        还用于保存偏好信息（包括登录用户的订阅），以帮助我们为您提供更好的用户体验及提供电子邮件通知。
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td width="17.0000%" valign="center">
                      <p align="center">
                        <strong>通知</strong>
                      </p>
                    </td>
                    <td width="83.0000%" valign="center">
                      <p>
                        这些 Cookie 提供横幅欢迎消息、其他站点范围内的消息以及Cookie 驳回通知。网站会存储
                        Cookie 以了解何时基于用户偏好显示通知。
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td width="17.0000%" valign="center">
                      <p align="center">
                        <strong>测试和调查</strong>
                      </p>
                    </td>
                    <td width="83.0000%" valign="center">
                      <p>
                        这些 Cookie 是对调查的集合回应。网站可能会保存 Cookie
                        用于跟踪进度，并且有时会测试不同版本的页面以查看哪些版本表现更好（A/B 测试）。
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td width="17.0000%" valign="center">
                      <p align="center">
                        <strong>技术和浏览器信息</strong>
                      </p>
                    </td>
                    <td width="83.0000%" valign="center">
                      <p>这些 Cookie 用于检测浏览器和插件版本的运行状况，以通知用户软件的过时情况。</p>
                    </td>
                  </tr>
                  <tr>
                    <td width="17.0000%" valign="center">
                      <p align="center">
                        <strong>验证</strong>
                      </p>
                    </td>
                    <td width="83.0000%" valign="center">
                      <p>这些 Cookie 用于验证并确保从网络服务器发送给用户的域和子域 Cookie 未被更改。</p>
                    </td>
                  </tr>
                </tbody>
              </table>
              <p>
                <strong>3.2 第三方 Cookie</strong>
                ：我们可能会使用第三方服务提供商提供特定统计和分析信息，为我们提供协助。例如，使用第三方
                Cookie
                衡量网站性能、事件和访客活动，以确保网站满足用户的需求并帮助我们改进导航、搜索和内容。
              </p>
              <p>
                <strong>4. 如何控制和禁用 C</strong>
                <strong>ookie</strong>
                <strong></strong>
              </p>
              <p>
                <strong>4.1</strong>
                您可以随时通过调整浏览器设置来控制和/或删除或禁用
                Cookie。浏览器各不相同，因此请参阅与浏览器相关的说明，了解可能可用的 Cookie
                相关设置和其他隐私与安全性设置。
              </p>
              <p>
                <strong>4.2</strong>
                但请注意，如果关闭 Cookie，您可能无法充分利用我们网站的所有功能。
              </p>
              <p>
                <strong>5. 社交媒体插件</strong>
                <strong></strong>
              </p>
              <p>
                <strong>5.1</strong>
                我们的网站可能会使用来自 Weibo、知乎、Bilibili、Twitter、Facebook、YouTube、Pinterest、Instagram 和 Tumbler
                等社交网络的所谓社交插件（下称为“插件”）。这些插件由社交网络各自的徽标表示。当您访问我们的网站时，您的浏览器会与这些社交网络的服务器建立直接连接。插件的内容由社交网络直接传输到您的浏览器，浏览器随后将其集成到网站中。
              </p>
              <p>
                <strong>5.2</strong>
                如果您不希望纳入的社交网络通过我们的网站收集关于您的数据，则您必须在访问网站前注销社交网络的相应域。如果您希望在访问我们的网站期间阻止与上述社交网络交换信息，您可以通过浏览器设置和其他工具选择停用
                Cookie。
              </p>
              <p>
                <strong>6. 网络信标</strong>
                <strong></strong>
              </p>
              <p>
                <strong>6.1</strong>
                我们可能会将网络信标（也称为网络爬虫、像素标记或清晰
                GIF）主要用于收集和维护汇总的数据（例如访客数量），以帮助我们了解最受用户欢迎的区域，并改进和更新我们网站上的内容。
              </p>
            </Content>
          </FlexColumn>
        </ContentWrapper>
      </BodyWrapper>
      <Footer />
    </Root>
  );
}

export default LegalCookiePolicy;

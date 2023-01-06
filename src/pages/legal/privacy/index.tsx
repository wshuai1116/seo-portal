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

function LegalPrivacy() {
  return (
    <Root>
      <Helmet>
        <title>隐私政策-SEO-GO.top</title>
        <meta name="description" content="SEO-GO.top隐私政策" />
      </Helmet>
      <Nav />
      <BodyWrapper>
        <ContentWrapper>
          <FlexColumn>
            <PageTitle>隐私政策</PageTitle>
            <Underline></Underline>
            <Content>
              <p>
                <strong>隐私政策</strong>
                <strong></strong>
              </p>
              <p>更新时间：2022年12月16日</p>
              <p>
                本《SEO-GO.top隐私政策》（以下称“本隐私政策”）解释了当您使用链接到本隐私政策的网站和产品时，我们如何收集、使用和共享您的个人信息。请注意本隐私政策只适用于您在中华人民共和国使用我们的产品或在中华人民共和国境内访问我们的网站；若您在中华人民共和国以外的地区与国家使用我们的产品或访问我们的网站，您需要阅读并同意我们的《全球隐私政策》（Privacy
                Policy）。
              </p>
              <p>
                请您在使用SEO-GO.top各项产品和/或服务前，仔细阅读并充分理解本隐私政策的全部内容。一旦您使用或继续使用SEO-GO.top的产品/服务，即表示您同意我们按照本隐私政策使用和处理您的相关信息。
              </p>
              <p>
                我们可能会不时依据法律法规或业务调整对本隐私政策进行修订。当本隐私政策发生变更后，我们会在版本更新后通过在显著位置提示或推送通知、消息等形式向您展示变更后的内容。您有权拒绝同意变更后的隐私政策，但请您知悉，一旦您拒绝同意变更后的隐私政策，可能导致您不能或不能继续完整使用SEO-GO.top的相关服务和功能，或者无法达到我们拟达到的服务效果。
              </p>
              <p>
                1. <strong>我们收集的个人信息</strong>
                <strong></strong>
              </p>
              <p>
                1.1. <strong>您直接提供的信息</strong>
                。我们会收集和存储您在使用我们的产品时通过我们的网站直接提供给我们的个人信息，包括但不限于：
              </p>
              <p>a) 通过客户支持请求。</p>
              <p>b) 通过社交媒体进行互动。</p>
              <p>c) 参与调查。</p>
              <p>d) 通过订阅及付费。</p>
              <p>
                <strong>我们收集的信息</strong>
                包括但不限于：
              </p>
              <p>
                a) <strong>联系信息</strong>：您的姓名，电子邮件地址，电话号码，邮寄地址。
              </p>
              <p>
                b) <strong>人口统计数据</strong>：您的职务，公司名称，城市，省份和国家。
              </p>
              <p>
                c) <strong>内容</strong>
                ：您在表格上的任何“自由文本”框中输入的任何数据，聊天表格中的评论，在SEO-GO.top网站、社交媒体和其他平台（例如微博）上发布的信息。
              </p>
              <p>
                d) <strong>财务信息</strong>
                ：如果您为使用我们的网站而付款，我们会要求您提供您的付款信息，例如您的银行卡号和账单地址，以处理您的付款。
              </p>
              <p>
                e) <strong>支持信息</strong>
                。当您请求技术支持服务时，我们将处理您的联系信息、通信信息以及有关您请求支持的原因的信息以及您可能提供的任何其他信息。
              </p>
              <p>
                1.2. <strong>信息</strong>
                <strong>自动</strong>
                <strong>收集。</strong>
                如下面的“我们对Cookie和其他技术的使用”部分中进一步所述，当您使用我们的网站或产品时，我们和我们的第三方合作伙伴会自动收集某些类型的设备和使用信息。我们收集的信息包括，例如：
              </p>
              <p>
                a) <strong>地理位置数据</strong>
                ：当您访问我们的网站并使用我们的产品时，我们会根据您的设备设置收集地理位置数据。例如，我们可能会使用IP地址得出您的大致位置。
              </p>
              <p>
                b) <strong>标识符和设备信息</strong>
                ：当您访问我们的网站时，您的设备的操作系统，设备标识符，客户ID和其他设备信息，用户代理字符串，Internet协议（IP）地址，访问时间，浏览器类型以及详细记录您与之交互的日志数据我们的网站（例如，点击次数，浏览的页面，搜索到的信息）以及您访问我们网站之前和之后访问的网站（即引荐来源标头）都会自动记录下来。当您提交支持票证时，我们将从您的浏览器的用户代理字符串中接收数据，其中包括设备信息，浏览器信息，操作系统信息，城市，省份，国家和IP地址。
              </p>
              <p>
                1.3. <strong>推论</strong>
                <strong>。</strong>
                我们从收集到的数据中推断出有关您和您的公司的新信息，包括使用自动方式生成有关您可能的偏好，服务和产品需求或其他特征的信息。例如，我们根据您的IP地址推断您的城市，省和国家/地区位置。
              </p>
              <p>
                1.4. <strong>通过社交媒体和</strong>
                <strong>其他</strong>
                <strong>平台收集的信息。</strong>
                当您通过各种第三方平台与我们互动时，我们会收到有关您的信息。我们与这些第三方平台交换的数据可能取决于您在这些平台上的隐私设置。在参与之前，您应该查看并考虑调整您在第三方网站和服务上的隐私设置。不要通过这些平台向我们提供任何敏感的个人数据。我们不对这些第三方平台的数据保护和使用实践负责。请查看他们的隐私政策，以了解他们如何使用您的信息。
              </p>
              <p>
                2. <strong>我们对COOKIE和类似技术的使用</strong>
                <strong></strong>
              </p>
              <p>
                2.1.
                我们的网站和相关的在线服务使用Cookie和类似技术来启用某些功能并帮助收集有关您的访问的信息。当您使用相同的浏览器返回站点时，站点可以读取Cookie，从而随着时间的推移收集有关您的使用情况的信息。除其他事项外，我们使用Cookie和其他技术来查看哪些区域和功能很受欢迎并计算访问次数，这有助于我们改善网站，产品和您的体验。
              </p>
              <p>
                2.2. <strong>网络信标</strong>
                。我们可能会使用Web信标收集信息。网络信标是可以在我们的网站，产品或电子邮件中使用的电子图像。我们使用Web信标发送Cookie，统计访问次数，了解使用情况和广告系列的有效性，并告知是否已打开电子邮件并对其采取了行动。
              </p>
              <p>
                2.3. <strong>分析和广告</strong>
                。我们与第三方合作，提供与我们的网站和产品有关的分析和广告服务。这些第三方使用Cookie，Web信标或类似技术随时间推移以及跨第三方网站和移动应用程序从我们网站和产品的访问者自动收集上述某些信息，以进行分析和广告发布。我们使用分析信息来分析和改善我们的服务。我们的广告合作伙伴会使用这些信息来了解您的兴趣，并向您展示有关我们和他人的产品和服务的相关广告。
              </p>
              <p>
                有关基于在线兴趣的广告，我们对Cookie的使用和其他类似的跟踪技术以及许多第三方如何选择不将您的信息用于这些目的的其他信息，请参阅我们的
                <a href="/legal/cookie-policy" target="_blank">
                  Cookie政策
                </a>
                。
              </p>
              <p>
                3. <strong>我们对个人信息的使用</strong>
                <strong></strong>
              </p>
              <p>
                通常，我们会在获得您同意的情况下收集和处理有关您的个人信息，以提供您使用的产品，运营我们的网站和业务，履行我们的合同和法律义务，保护我们的系统和客户的安全或履行其他义务所必需的本隐私政策和我们给您的通知中所述的合法权益。
              </p>
              <p>例如，我们可以将上面描述的任何个人信息类别用于：</p>
              <p>a) 运营，维护和改善我们的内部运营，系统，站点和产品。</p>
              <p>
                b)
                了解您和您的喜好，以增强您使用我们的网站和产品的体验和乐趣，提供建议，征求反馈，并更好地向您宣传和广告。
              </p>
              <p>c) 监视和分析用户与我们的网站和产品的互动，以识别趋势，使用情况和活动模式。</p>
              <p>d) 回应您的意见和问题，并提供技术支持或客户服务。</p>
              <p>e) 提供并交付您要求的产品或服务。</p>
              <p>f) 遵守适用的法律，法规或规章，合作并捍卫法律主张和审计。</p>
              <p>
                g)
                与您交流有关促销，即将发生的事件以及有关SEO-GO.top和我们的合作伙伴提供的产品和服务的其他新闻的信息。
              </p>
              <p>h) 计划和举办公司活动。</p>
              <p>i) 保护网站和产品，并调查和制止欺诈，未经授权或非法的活动。</p>
              <p>
                4. <strong>个人信息管理的权利与方法</strong>
                <strong></strong>
              </p>
              <p>
                4.1. <strong>访问，更正或删除。</strong>
                如果您希望请求访问，更正或删除我们持有的任何个人信息，或者我们更改您使用信息的方式（在适用法律允许的情况下，我们保留向您收取费用的权利），请在此处或通过电子邮件将您的请求发送到seogo.top@ninemarks.com。但是，我们可能会拒绝不合理，法律禁止或适用法律不要求其履行的请求。
              </p>
              <p>
                4.2. <strong>如何控制您的通讯偏好。</strong>
                您可以通过以下方式停止接收来自我们的促销电子邮件：单击此类电子邮件中提供的“取消订阅链接”，或通过以下列出的联系方式与我们联系。
              </p>
              <p>
                4.3. <strong>Cookie。</strong>
                大多数Web浏览器默认设置为接受Cookie。如果愿意，通常可以将浏览器设置为删除cookie并拒绝cookie。如果您选择删除拒绝Cookie，则可能会影响我们网站或其他产品的某些功能或服务。
              </p>
              <p>
                4.4. <strong>分析和在线广告。</strong>
                我们的第三方分析和广告合作伙伴可能会为您提供选择退出某些信息收集的选项。有关他们为您提供的适用选择的更多信息，请参见上面的“Cookies”部分和我们的Cookie政策。
              </p>
              <p>
                5. <strong>信息的披露</strong>
                <strong></strong>
              </p>
              <p>
                5.1.
                未经您同意，我们不会与任何无关第三方分享您的信息，以下情形除外：我们可能将您的信息与我们的关联公司、第三方服务提供商、承包商及代理分享，仅用作改善您访问和使用我们网站的体验及使用我们产品的体验之用途。如我们与任何上述第三方分享您的信息，我们将努力确保第三方在使用您的信息时遵守本声明及我们要求其遵守的其他适当的保密和安全措施。
              </p>
              <p>
                5.2.
                随着我们业务的持续发展，我们以及我们的关联公司有可能进行合并、收购、资产转让或类似的交易，您的信息有可能作为此类交易的一部分而被转移。我们将遵守相关法律法规的要求，在转移前通知您，确保信息在转移时的机密性，以及变更后继续履行相应责任和义务。
              </p>
              <p>5.3. 我们还可能因以下原因而披露您的信息：</p>
              <p>a) 遵守适用的法律法规等有关规定。</p>
              <p>b) 遵守法院判决、裁定或其他法律程序的规定。</p>
              <p>c) 遵守相关政府机关或其他有权机关的要求。</p>
              <p>d) 我们有理由确信需遵守法律法规等有关规定。</p>
              <p>
                e)
                为执行相关服务协议或本隐私政策、维护社会公共利益、处理投诉/纠纷，保护我们的客户、我们或我们的关联公司、其他用户或雇员的人身和财产安全或合法权益所合理必需的用途。
              </p>
              <p>f) 经过您合法授权的情形。</p>
              <p>
                5.4.
                如我们因上述原因而披露您的信息，我们将在遵守法律法规相关规定及本声明的基础上及时告知您。
              </p>
              <p>
                6. <strong>我们如何存储和保护个人信息</strong>
                <strong></strong>
              </p>
              <p>
                6.1.
                我们搜集的有关您的信息保存在SEO-GO.top或其第三方合作伙伴位于中国大陆的服务器。通常，我们仅在为您提供服务期间保留您的信息，保留时间不会超过满足相关使用目的所必须的时间。
              </p>
              <p>
                6.2.
                但在下列情况下，且仅出于下列情况相关的目的，我们有可能需要较长时间保留您的信息或部分信息：
              </p>
              <p>a) 遵守适用的法律法规等有关规定。</p>
              <p>b) 遵守法院判决、裁定或其他法律程序的要求。</p>
              <p>c) 遵守相关政府机关或其他有权机关的要求。</p>
              <p>d) 我们有理由确信需遵守法律法规等有关规定。</p>
              <p>
                e)
                为执行相关服务协议或本隐私政策、维护社会公共利益、处理投诉/纠纷，保护我们的客户、我们或我们的关联公司、其他用户或雇员的人身和财产安全或合法权益所合理必需的用途。
              </p>
              <p>6.3. 我们努力保障信息安全，以防信息的丢失、不当使用、未经授权阅览或披露。</p>
              <p>
                a)
                我们使用各种安全技术以保障信息的安全。例如，我们将通过服务器多备份、密码加密等安全措施，防止信息泄露、毁损、丢失。
              </p>
              <p>
                b)
                我们建立严格的管理制度和流程以保障信息的安全。例如，我们严格限制访问信息的人员范围，并进行审计，要求他们遵守保密义务。
              </p>
              <p>
                c)
                我们重视信息安全合规工作，以业界先进的解决方案充分保障您的信息安全。但请您理解，由于技术的限制以及可能存在的各种恶意手段，在互联网环境下，即便竭尽所能加强安全措施，也不可能始终保证信息百分之百的安全。您需要了解，您接入我们的服务所用的系统和通讯网络，有可能因我们可控范围外的因素而出现问题。若发生个人信息泄露等安全事件，我们会启动应急预案，阻止安全事件扩大，按照《国家网络安全事件应急预案》等有关规定及时上报，并以发送邮件、推送通知、公告等形式告知您相关情况，并向您给出安全建议。
              </p>
              <p>
                7. <strong>事先征得授权同意的例外</strong>
                <strong></strong>
              </p>
              <p>7.1. 以下情形中，共享、转让、公开披露您的个人信息无需事先征得您的授权同意：</p>
              <p>a) 与国家安全、国防安全有关的。</p>
              <p>b) 与公共安全、公共卫生、重大公共利益有关的。</p>
              <p>c) 与犯罪侦查、起诉、审判和判决执行等有关的。</p>
              <p>d) 出于维护您或其他个人的生命、财产等重大合法权益但又很难得到本人同意的。</p>
              <p>e) 您自行向社会公众公开的个人信息。</p>
              <p>f) 从合法公开披露的信息中收集个人信息的，如合法的新闻报道、政府信息公开等渠道。</p>
              <p>
                g)
                根据法律规定，共享、转让经去标识化处理的个人信息，且确保数据接收方无法复原并重新识别个人信息主体的，不属于个人信息的对外共享、转让及公开披露行为，对此类数据的保存及处理将无需另行向您通知并征得您的同意。
              </p>
              <p>
                8. <strong>处理未成年人的个人信息</strong>
                <strong></strong>
              </p>
              <p>
                如果没有父母或监护人的同意，未成年人不得创建自己的用户账号。如您为未成年人的，建议您请您的父母或监护人仔细阅读本隐私政策，并在征得您的父母或监护人同意的前提下使用我们的服务或向我们提供信息。对于经父母或监护人同意使用我们的产品或服务而收集未成年人个人信息的情况，我们只会在法律法规允许、父母或监护人明确同意或者保护未成年人所必要的情况下使用、共享、转让或披露此信息。
              </p>
              <p>
                9. <strong>个人信息如何在全球范围转移</strong>
                <strong></strong>
              </p>
              <p>
                我们在中华人民共和国境内运营中收集和产生的个人信息，均存储在中国境内，以下情形除外：法律法规有明确规定；获得您的明确授权。针对以上情形，我们会确保依据本隐私政策对您的个人信息提供足够的保护。
              </p>
              <p>
                10. <strong>如何联系我们</strong>
                <strong></strong>
              </p>
              <p>
                如您对本政策或其他相关事宜有疑问，请根据我们提供的指引，填写相关资料，将您的问题发送至seogo.top@ninemarks.com。我们将尽快审核所涉问题，并予以回复。
              </p>
            </Content>
          </FlexColumn>
        </ContentWrapper>
      </BodyWrapper>
      <Footer />
    </Root>
  );
}

export default LegalPrivacy;

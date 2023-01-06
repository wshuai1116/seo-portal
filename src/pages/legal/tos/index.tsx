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

function LegalTos() {
  return (
    <Root>
      <Helmet>
        <title>服务条款-SEO-GO.top</title>
        <meta name="description" content="SEO-GO.top服务条款" />
      </Helmet>
      <Nav />
      <BodyWrapper>
        <ContentWrapper>
          <FlexColumn>
            <PageTitle>服务条款</PageTitle>
            <Underline></Underline>
            <Content>
              <p><strong>服务条款</strong></p>
              <p>更新时间：2022年12月16日</p>
              <p>
                本条款是用户（下称“用户”或“您”）与SEO-GO.top之间的协议，SEO-GO.top将按照本条款约定之内容为您提供服务。
                “SEO-GO.top”是指上海玖标网络科技有限公司、SEO-GO.top和/或其可能存在的相关服务运营关联单位。
                <strong>您的使用行为将视作对本条款全部</strong><strong>内容及后续</strong> <strong>对条款的修改的完全接受。请您仔细阅读本条款的全部条款与条件。</strong>
              </p>
              <p><strong>如您为未成年人</strong><strong>或限制民事行为能力人</strong><strong>，请在法定监护人的陪同下阅读和判断是否同意本条款。未成年人</strong><strong>或限制民事行为能力人</strong><strong>行使和履行本条款项下的权利和义务视为已获得监护人的认可。</strong></p>
              <p>1. <strong>注册及账户</strong><strong></strong></p><p>1.1. 要注册使用SEO-GO.top提供的服务，您需要创建用户名和密码，并向我们提供注册过程中要求的信息。您承诺在注册过程中提供完整准确的信息，并同意及时更新您的信息以确保其准确无误。您有责任始终确保您的账户安全，并且对任何人利用您的账号所进行的活动完全负责。如果您认为您的账户遭到任何未经授权的访问，或者您的账户信息丢失或被盗，应当立即与我们联系。</p>
              <p>1.2. 如果您作为某一实体的雇员、承包商或代理人使用SEO-GO.top提供的服务，则您必须有充分的授权以代表该实体，并确保该实体受到本条款的约束。</p>
              <p>2. <strong>服务的使用</strong><strong></strong></p><p>2.1. 您可以根据本条款访问和使用SEO-GO.top提供的服务，若您使用SEO-GO.top服务的行为不符合本条款或者您及/或SEO-GO.top所在地适用的法律法规，SEO-GO.top有权作出独立处理，且在无需事先通知及/或征得用户同意的情况下停用您的账号。</p>
              <p>2.2. 您向我们声明、保证并承诺您不会进行如下任何行为：</p>
              <p>a) 使用SEO-GO.top提供的服务存储、传输、发布或提供任何虚假、诽谤、骚扰、淫秽、非法、侵犯隐私权或任何其他第三方权利，或包含病毒、恶意软件或任何其他恶意代码的内容；</p>
              <p>b) 出于任何非法目的或违反本条款的任何目的访问或使用SEO-GO.top提供的服务；</p>
              <p>c) 使用SEO-GO.top提供的服务对任何人或财产造成损害或伤害；</p>
              <p>d) 使用SEO-GO.top提供的服务构建类似或竞争产品或服务；</p>
              <p>e) 将侵犯任何人的专利、商标、著作权、商业秘密等知识产权的内容加以上传、发布或以其他方式传送；</p>
              <p>f) 对SEO-GO.top提供的服务中包含的任何源代码、目标代码、软件程序、流程、算法、方法、技术、数据或信息进行反向工程、反编译、反汇编或提取，使用数据收集或提取工具，或以其他方式发现任何源代码、目标代码、软件程序、流程、算法、方法、技术、数据或信息；</p>
              <p>g) 干扰或妨害其他用户正常使用或享受SEO-GO.top提供的服务；</p>
              <p>h) 篡改、入侵或以其他方式破坏SEO-GO.top的任何计算机系统、服务器或网络设备；</p>
              <p>i) 移除或破坏SEO-GO.top所提供服务中出现的任何专有标记或专有图例；或</p>
              <p>j) 试图进行任何上述禁止的活动。（前述事项合称“禁止性活动”）</p>
              <p>如用户的行为或其上传的内容含有以上违反政策法律法规的情况的，由用户直接承担以上导致的一切不利后果，如因此给SEO-GO.top造成不利后果的，用户应负责消除影响，并且赔偿因此导致的一切损失。</p>
              <p>2.3. 您承认并同意，SEO-GO.top可以聘请第三方服务供应商为SEO-GO.top提供与其所提供服务内容有关的服务。</p>
              <p>2.4. 您同意SEO-GO.top可以收集和使用非个人的、匿名的、汇总的、统计的、性能的或去识别的数据，以及其他性能信息用于合法的商业目的，如支持、报告、研究、改进SEO-GO.top的服务、行业合作以及其他合法的内部商业目的。</p>
              <p>2.5. 如果您在使用SEO-GO.top服务的过程中获得或使用任何第三方产品或服务，您需要自主对这些产品或服务进行评估，以确定其是否符合您的要求。使用此类第三方产品或服务仅限于您和适用的第三方之间，SEO-GO.top对此类第三方产品或服务不承担任何责任。</p>
              <p>3. <strong>费用和付款</strong><strong></strong></p>

              <p>3.1. 您可以通过充值或其他方式付费订阅使用SEO-GO.top提供的在线服务，SEO-GO.top将根据您的付费情况开通相应的功能。您在此授权SEO-GO.top（或我们的指定人员）届时按照约定根据开通的收费功能向你收取对应费用，具体收费金额可能会根据您使用SEO-GO.top的不同功能而有所不同。该等付款义务是不可取消的，且所有已支付的金额均不可退还。我们可能会通过更新本条款及相关系统来调整SEO-GO.top的费用和收费方式。</p>
              <p>3.2. 在开始使用SEO-GO.top提供的在线服务之前，您需要向我们提供某些财务信息，该等财务信息将仅用于计费和付款目的。</p>
              <p>3.3. 您同意向SEO-GO.top补偿SEO-GO.top根据您订阅的在线服务必须缴纳的根据适用法律需征收的任何营业税、增值税或其他类似税费。如果SEO-GO.top有法律义务支付或收取您根据本第3.3条应负担的税款，SEO-GO.top将向您开具发票，您将向SEO-GO.top支付该等金额。
                除适用法律另有要求外，不应从支付给SEO-GO.top的款项中扣除税款，在这种情况下，您将根据需要增加应付金额，以便在进行所有必要的扣除和预扣后，SEO-GO.top收到并保留的金额等于其在没有此类扣除或预扣的情况下本应收到的金额。
                此外，您还将根据需要向SEO-GO.top支付与提供在线服务相关的合理费用，如银行在向SEO-GO.top付款过程中收取的交易费。除非本条款另有明确规定，否则支付给SEO-GO.top的所有费用和开支均不予退还。</p>
              <p>3.4. 任何逾期付款均需按照每日应付金额的万分之五（0.05%）计收逾期违约金。</p><p>3.5. 在未进行付费的情况下，您可以免费使用SEO-GO.top为您提供的免费服务范围内的功能及内容。</p>
              <p>4. <strong>服务的变更、中断、终止</strong><strong></strong></p>
              <p>4.1. 您理解并同意，SEO-GO.top基于经营策略的调整，可能会对服务内容进行变更，也可能会中断、中止或终止服务。如SEO-GO.top发生合并、分立、收购、资产转让时，SEO-GO.top可向第三方转让本服务下相关资产；
                SEO-GO.top亦可在单方通知您后，将本条款下部分或全部服务及相应的权利义务转交由第三方运营或履行。</p>
              <p>4.2. 您可以随时通过发送电子邮件至seogo.top@ninemarks.com通知我们删除或直接删除您使用在线服务创建的所有集群，并终止本条款。</p>
              <p>4.3. 如果任何一方违反本条款，并且未能在收到守约方书面通知后的三十（30）天内纠正违约行为，则违约方构成违约，守约方可在该等补救期到期之时或之后终止本条款。
                如果SEO-GO.top根据本条终止本条款，则您必须在三十（30）天内支付截至（包括）终止日期的所有累计金额，以及根据本条款订阅的在线服务的所有未支付款项，加上任何适用的税费和费用。
                守约方可以自行决定延长三十（30）天的补救期，只要违约方继续采取合理的努力来补救此类违约行为。</p>
              <p>4.4. 具体而言，如您账户上剩余的费用不足以支付您所订阅的服务的，我们有权中断该等服务并在三十（30）天内为您保留相关数据，如三十（30）天到期后您仍未补足相关费用，我们将会删除相关数据。
                届时若仍有应付未付款项的，您仍需继续履行支付义务。</p>
              <p>4.5. 如您出现以下情况，SEO-GO.top保留立即暂停您访问或使用在线服务或终止本条款的权利，恕不另行通知：</p>
              <p>a) 我们认为SEO-GO.top在线服务的功能、安全性、完整性或可用性或SEO-GO.top的其他客户受到重大威胁，包括SEO-GO.top在线服务正在经历DDoS攻击或其他不在我们控制范围内的攻击或破坏；</p>
              <p>b) 我们认为您出现了第2.2条约定的禁止性活动；</p>
              <p>c) 我们需要这样做以遵守法律或政府机构的要求；</p>
              <p>d) 我们认为您已不属于正常经营状态，已为债权人利益进行转让或类似资产处置，或已成为任何破产、重组、清算、解散或类似程序的主体。</p>
              <p>在合理可行且法律允许的情况下，SEO-GO.top将提前通知您任何此类中断或终止。在我们确定导致暂停的问题已经解决后，SEO-GO.top将尽合理努力尽快重新建立 SEO-GO.top在线服务。根据本第4.4条的任何中断或终止均不得免除您根据本条款付款的义务；
                为免疑义，在任何此类中断期间不产生使用费。</p>
              <p>4.6. 本条款终止后，如下部分继续有效：第3.1至 3.4条、第5.3至5.4条、第8条及第11条。</p>
              <p>5. <strong>知识产权</strong><strong></strong></p>
              <p>5.1. SEO-GO.top提供的可视化界面、图形、设计、编译、信息、数据、计算机代码（包括源代码或目标代码）、产品、软件、服务以及网站的所有其他元素（“材料”）受国际版权公约、中华人民共和国著作权法、专利法、及其他知识产权方面的法律法规的保护。
                SEO-GO.top提供的所有材料均为SEO-GO.top或其第三方许可人的财产。
                <strong>在您遵守本</strong><strong>条款</strong><strong>的前提下，我们在此授予您有限的、可撤销的、非独家的、不可公开的、不可转让的、全球范围内的许可，
                  以根据本</strong><strong>条款的约定</strong><strong>访问和使用SEO-GO.top</strong><strong>所提供</strong> <strong>在线服务。</strong>
                SEO-GO.top所有和享有的知识产权，不因用户的任何使用行为而发生权利转移。</p>
              <p>5.2. 您在SEO-GO.top发布、创建的独创性数据归您自己所有，您有权对其进行任何形式的处置，包括从平台中复制，导出和删除。
                您特此同意我们使用您发布、创建的内容来：
                a）向您提供本条款项下的在线服务；
                b）防止或解决在线服务的相关技术问题，
                c）以其他方式履行本条款中规定的义务；以及
                d）满足适用法律的要求。除非获得了您的同意，SEO-GO.top不会擅自使用、修改、复制、公开传播、改变、散布、发行或公开发表您拥有知识产权的成果。</p>
              <p>5.3. 您向我们声明和保证您在SEO-GO.top相关平台所发布、创建的内容均没有违反本条款、任何适用法律或任何第三方的知识产权或其他权利。
                如因您所发布、创建的内容侵害第三方权利引发任何索赔或对SEO-GO.top造成损失的，您应当负责消除SEO-GO.top受到的负面影响，并且赔偿其承受的一切损失。</p>
              <p>5.4. 无论是否有相反约定，SEO-GO.top可以收集服务数据以开发、支持、修改、改进和经营其产品和服务（包括但不限于在线服务）。
                SEO-GO.top不会与第三方分享任何包括您的保密信息的服务数据，除非a）在本条款第9条（保密条款）允许的情况下，或b）在服务数据被汇总或匿名的情况下，使您无法被识别。</p>
              <p>6. <strong>隐私政策</strong><strong></strong></p>
              <p>6.1. SEO-GO.top注重保护用户的个人信息及个人隐私。您在下载、安装、启动、浏览、注册、登录、使用SEO-GO.top的产品与/或服务时，
                SEO-GO.top将按照平台公布的《SEO-GO.top隐私政策》的约定处理和保护您的个人信息，因此希望您能够仔细阅读、充分理解《SEO-GO.top隐私政策》的全文，
                并在需要时，按照《SEO-GO.top隐私政策》的指引，作出您认为适当的选择。</p>
              <p>6.2. 您应当在仔细阅读、充分理解《SEO-GO.top隐私政策》后使用SEO-GO.top的产品与/或服务，如果您不同意政策的内容，将可能导致SEO-GO.top的产品与/或服务无法正常运行，或者无法达到SEO-GO.top拟达到的服务效果。
                您使用或继续使用SEO-GO.top提供的产品与/或服务的行为，都表示您充分理解和同意《SEO-GO.top隐私政策》（包括更新版本）的全部内容。</p>
              <p>7. <strong>出口管制</strong></p><p>您承诺遵守本条款所适用的联合国、中国、美国以及其他国家出口管制法律法规，不会将SEO-GO.top提供的服务或产品用于适用的出口管制法律法规禁止的用途。
                非经相关主管机关许可，您及您授权使用SEO-GO.top服务或产品的其他个人或实体不会通过SEO-GO.top的服务或产品向适用的出口管制法律法规禁止的实体或个人提供受管控的技术、软件或服务。</p>
              <p>8. <strong>责任限制</strong><strong></strong></p>
              <p>8.1. 在法律允许的最大范围内，SEO-GO.top在任何情况下均不对您因访问或使用或无法访问或使用SEO-GO.top之服务而产生的或与之相关的任何间接、附带、特殊、后果性或惩罚性损害（包括利润损失、商誉损失或任何其他无形损失的损害赔偿）承担责任。</p>
              <p>8.2. 在法律允许的最大范围内，SEO-GO.top对您的全部责任仅限于您承受的直接损失，并应在不超过您向SEO-GO.top已支付的金额范围内承担赔偿责任。</p>
              <p>9. <strong>保密</strong></p><p>SEO-GO.top承诺对您注册账户时或使用SEO-GO.top的产品服务时提交或知悉的信息采取保密措施，不向第三方披露您的信息，除非：</p>
              <p>a) 依据本条款或者您与SEO-GO.top之间其他服务协议、合同、在线条款等规定可以提供的；</p>
              <p>b) 依据法律法规的规定或行政、司法等职权部门要求应当提供的；</p>
              <p>c) 在不违反本条款约定责任的前提下，该保密信息已经公开或能从公开领域获得。</p>
              <p>10. <strong>不可抗力</strong><strong></strong></p>
              <p>如果由于超出一方合理控制范围的任何原因（包括战争、敌对或破坏、灾难、恐怖主义行为（包括网络恐怖主义）、天灾、流行病、流行病、电力或电信（包括互联网）中断、
                火灾、爆炸、地震、洪水、严重风暴、罢工、禁运、劳资纠纷、检疫、民事或军事当局的行为、互联网流量运营商的作为或不作为、
                监管或政府机构的作为或不作为（包括法律的通过、任何出口、进口或其他许可证的拒绝或取消，或影响任何服务交付的其他政府行为）。
                双方将尽合理努力减轻任何此类不可抗力事件的影响。如果此类事件持续超过三十（30）天，任何一方均可在发出书面通知后取消未执行的服务和受影响的订单。
                本第10条不免除任何一方采取合理措施遵循其正常灾难恢复程序的义务，也不免除您为根据本条款订阅的服务付款的义务。</p>
              <p>11. <strong>适用法律和管辖</strong><strong></strong></p>
              <p>11.1. 本条款的生效、履行、解释及争议的解决均适用中华人民共和国法律。本条款因与中华人民共和国现行法律相抵触而导致部分无效，不影响其他部分的效力。双方同意，解决争议时，应以您同意的最新版《SEO-GO.top服务条款》为准。</p>
              <p>11.2. 如就本条款内容或其执行发生任何争议，应尽量友好协商解决；协商不成时，则争议各方均一致同意将争议提交上海仲裁委员会按照其仲裁规则进行仲裁。仲裁裁决为一裁终局，对各方均有法律约束力。</p>
              <p>12. <strong>条款</strong><strong>的修改与通知</strong></p><p>12.1. SEO-GO.top有权依据国家政策、技术条件、产品功能等变化需要而对本条款进行修改并将修改后的条款予以发布。</p>
              <p>12.2. 前述内容一经正式发布，SEO-GO.top将以适当的方式（包括但不限于弹窗、邮件、站内信、网站公告等）提醒您更新的内容，以便您及时了解本条款的最新版本。</p>
              <p>12.3.<strong>修改后的内容将构成本条款不可分割的组成部分，您应同样遵守。您对修改后的协议有异议的，请立即停止登录、使用SEO-GO.top及相关服务，若您登录或继续使用SEO-GO.top及相关服务，则视为您已充分阅读、理解并接受更新后的本条款并愿意受更新后的本条款的约束。</strong></p>
            </Content>
          </FlexColumn>
        </ContentWrapper>
      </BodyWrapper>
      <Footer />
    </Root>
  );
}

export default LegalTos;

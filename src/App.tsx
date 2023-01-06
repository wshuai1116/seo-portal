import ABTestHandler from "@/components/ABTestHandler";
import ActiveReporter from "@/components/ActiveReporter";
import Toast from "@/components/base/Toast";
import Contact from "@/pages/contact";
import Landing from "@/pages/landing";
import LegalCookiePolicy from "@/pages/legal/cookie-policy";
import LegalPrivacy from "@/pages/legal/privacy";
import LegalTos from "@/pages/legal/tos";
import Login from "@/pages/login";
import PayRedirectAlipay from "@/pages/pay/redirect/Alipay";
import WechatOrderCreate from "@/pages/pay/WechatOrderCreate";
import { queryClient } from "@/query/client";
import localStorage from "@/utils/localStorage";
import qs from "query-string";
import { useEffect } from "react";
import { QueryClientProvider } from "react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import LoginCallback from "@/pages/login/callback";
import Dashboard from "@/pages/dashboard";
import Pricing from "./pages/pricing";
import Invite from "./pages/invite";
import { useInitWebSocket } from "./states/ws";
import { RecoilRoot } from "recoil";
import DashboardInit from "./pages/dashboard/Init";
import LocaleWrapper from "./components/LocaleWrapper";
import NotFound from "./pages/404";

function App() {
  const InitWS = () => {
    useInitWebSocket();
    return <></>;
  };

  useEffect(() => {
    const queryParams = qs.parse(window.location.search);
    const bd_vid = queryParams["bd_vid"];
    if (bd_vid) {
      localStorage.set("bd_vid", bd_vid);
    }
  }, []);

  return (
    <RecoilRoot>
      <InitWS />
      <LocaleWrapper>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <Routes>
              <Route
                path="/"
                element={
                  <Layout>
                    <Landing />
                  </Layout>
                }
              />
              <Route path="/login" element={<Login />} />
              <Route path="/login/callback" element={<LoginCallback />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route
                path="/pay/wechat/order-create"
                element={<WechatOrderCreate />}
              />
              <Route
                path="/pay/redirect/alipay"
                element={<PayRedirectAlipay />}
              />
              <Route path="/contact" element={<Contact />} />
              <Route path="/legal/tos" element={<LegalTos />} />
              <Route path="/legal/privacy" element={<LegalPrivacy />} />
              <Route
                path="/legal/cookie-policy"
                element={<LegalCookiePolicy />}
              />
              <Route path="/dashboard" element={<DashboardInit />} />
              <Route
                path="/organization/:organizationId"
                element={<DashboardInit />}
              />
              <Route
                path="/organization/:organizationId/invite"
                element={<Invite />}
              />
              <Route
                path="/organization/:organizationId/project/:projectId/seo-report"
                element={<Dashboard type="seo-report" />}
              />
              <Route
                path="/organization/:organizationId/project/:projectId/seo-audit"
                element={<Dashboard type="seo-audit" />}
              />
              <Route
                path="/organization/:organizationId/seo-create-project"
                element={<Dashboard type="seo-create-project" />}
              />
              <Route
                path="/organization/:organizationId/project/:projectId/seo-developer-view"
                element={<Dashboard type="seo-developer-view" />}
              />
              <Route
                path="/organization/:organizationId/project/:projectId/overview"
                element={<Dashboard type="overview" />}
              />
              <Route
                path="/organization/:organizationId/competitor"
                element={<Dashboard type="competitor" />}
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
          <Toast />
          <ActiveReporter />
          <ABTestHandler />
        </QueryClientProvider>
      </LocaleWrapper>
    </RecoilRoot>
  );
}

export default App;

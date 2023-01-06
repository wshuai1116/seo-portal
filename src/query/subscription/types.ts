import { match } from "ts-pattern";

export type PlanType = "FREE" | "PRO" | "TEAM" | "ENTERPRISE";
export type Period = "MONTH" | "QUARTER" | "YEAR";


export const isFree = (userSubscription: UserSubscription): boolean => {
  return userSubscription.subscription.subscriptionType === "FREE"
};

export const getPlanName = (name?: PlanType): string => {
  return match(name)
    .with("FREE", () => "免费版")
    .with("PRO", () => "专业版")
    .with("TEAM", () => "团队版")
    .with("ENTERPRISE", () => "企业版")
    .otherwise(() => "");
};

export const getPlanRank = (plan?: PlanType) => {
  return match(plan)
    .with("FREE", () => 0)
    .with("PRO", () => 1)
    .with("TEAM", () => 2)
    .with("ENTERPRISE", () => 3)
    .otherwise(() => 0);
};

export const getPeriodName = (period?: Period) => {
  return match(period)
    .with("MONTH", () => "月")
    .with("QUARTER", () => "季")
    .with("YEAR", () => "年")
    .otherwise(() => "");
};

export const getMonthCountByPeriod = (peroid: Period) => {
  return match(peroid)
    .with("MONTH", () => 1)
    .with("QUARTER", () => 3)
    .with("YEAR", () => 12)
    .otherwise(() => 0);
};

export const getOrderStatusText = (status?: OrderStatus) => {
  return match(status)
    .with("PAID", () => "正常")
    .with("COMPLETED", () => "已完成")
    .with("CLOSED", () => "已关闭")
    .with("PENDING", () => "待支付")
    .otherwise(() => "");
};

export interface Subscription {
  commodityId: string;
  name: string;
  promotionFlag: string;
  price: number;
  discountPrice: number;
  subscriptionType: PlanType;
  period: Period;
  pageCount: number;
  projectCount: number;
  analysisCount: number;
  teamMemberCount: number;
  competitorCount: number;
  downloadReport: number;
}

export interface UserSubscription {
  uid: string;
  subscription: Subscription;
  expireTime: string;
}

export type OrderStatus = "PENDING" | "PAID" | "COMPLETED" | "CLOSED";

export interface OrderInfo {
  orderId: string;
  commodityId: string;
  status: OrderStatus;
}

export interface AlipayOrderInfo {
  orderId: string;
  form: string;
}

export interface WechatOrderInfo {
  orderId: string;
  codeUrl: string;
}

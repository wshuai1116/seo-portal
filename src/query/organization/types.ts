import { TaskSummary } from "../analysis/types";
import { UserSubscription } from "../subscription/types";

export interface Organization {
  organizationId: string;
  uid: string;
  name: string;
  type: string;
  createdTime: number;
  users: [OrganizationUser];
  userSubscription: UserSubscription;
}

export interface OrganizationUser {
  uid: string;
  email?: string;
  mobileNo?: string;
  nickname?: string;
  avatar?: string;
  role?: string;
  status: string;
}

export interface OrganizationInviteCode {
  organizationId: string;
  inviteCode: string;
}
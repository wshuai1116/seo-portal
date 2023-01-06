
export interface Competitor {
  competitorId: string;
  organizationId: string;
  uid: string;
  siteUrl: string;
  title: string;
  description: string;
  keywords: string;
  status: CompetitorStatus;
  createdTime: number;
  modifiedTime: number;
}

export type CompetitorStatus = "PROCESSING" | "COMPLETED" | "FAILED";

export interface CompetitorPaginationResult {
  result: [Competitor];
  total: number;
}
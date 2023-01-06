import { User } from "../user/types";

export interface AnalysisSiteResponse {
  taskId: string;
}

export interface AnalysisMetricsGroup {
  taskId: string;
  analysisCategory: string;
  metricsCategory: string;
  pages: AnalysisPagePaginationResult;
}

export interface AnalysisPagePaginationResult {
  result: [AnalysisPage];
  total: number;
}

export interface AnalysisPage {
  taskId: string;
  url: string;
  statusCode: number;
  redirectLocation: string;
  commentUser: User;
  commentTime: number;
  metricsList: AnalysisMetrics[];
}

export interface TaskSummary {
  taskId: string;
  uid: string;
  pageCount: number;
  totalScore: number;
  status: TaskStatus;
  siteUrl: string;
  criticalCount: number;
  mediumCount: number;
  lowCount: number;
  optionalCount: number;
  isChinese: number;
  createdTime: number;
}

export type TaskStatus = "PROCESSING" | "COMPLETED" | "ABORTED" | "FAILED";

export interface TaskLink {
  taskId: string;
  url: string;
  depth: number;
  internal: number;
  nofollow: number;
  contentType: string;
  contentLength: number;
  statusCode: number;
  blockedByRobots: number;
  mixedContent: number;
  formURLInsecure: number;
  formOnHTTP: number;
  unsafeCrossOrigin: number;
  missingHSTSHeader: number;
  missingContentSecurityPolicyHeader: number;
  missingContentTypeOptionsHeader: number;
  missingFrameOptionsHeader: number;
  missingSecureReferrerPolicyHeader: number;
  wordCount: number;
  textRatio: number;
  broken: number;
  createdTime: number;
}

export interface TaskLinkPaginationResult {
  result: [TaskLink];
  total: number;
}

export interface TaskLinkStatistic {
  taskId: string;
  totalUrl: number;
  totalInternalUrlBlockedByRobots: number;
  totalExternalUrlBlockedByRobots: number;
  totalUrlCrawled: number;
  totalInternalUrlCrawled: number;
  totalExternalUrlCrawled: number;
  totalInternalUrlNofollow: number;
  totalExternalUrlNofollow: number;
  totalInternalUrl: number;
  totalUrlHttp: number;
  totalUrlHttps: number;
  mixedContent: number;
  formURLInsecure: number;
  formOnHTTP: number;
  unsafeCrossOrigin: number;
  missingHSTSHeader: number;
  missingContentSecurityPolicyHeader: number;
  missingContentTypeOptionsHeader: number;
  missingFrameOptionsHeader: number;
  missingSecureReferrerPolicyHeader: number;
  totalUrlStatusCode1xx: number;
  totalUrlStatusCode2xx: number;
  totalUrlStatusCode3xx: number;
  totalUrlStatusCode4xx: number;
  totalUrlStatusCode5xx: number;
  totalUrlBroken: number;
}

export interface TaskProgress {
  taskId: string;
  projectId: string;
  siteUrl: string;
  pageCount: number;
  depth: number;
  durationSeconds: number;
  status: TaskStatus;
}

export interface AnalysisMetrics {
  metricsId: string;
  taskId: string;
  score: number;
  analysisCategory: string;
  metricsLevel: string;
  metricsCategory: string;
  metrics: string;
  scoreType: string;
  issueCodes: string;
  passStatus: MetricsStatus;
  items: AnalysisItem[];
}

export type MetricsStatus = "PASS" | "NO_PASS";

export interface AnalysisItem {
  itemId: string;
  metricsId: string;
  url: string;
  issueCodes: string;
  elements: PageElement[];
  data: object;
  commentData: object;
  commentUser: User;
  commentTime: number;
  passStatus: string;
  taskStatus: string;
}

export interface PageElement {
  elementId: string;
  outerHtml: string;
}

export interface Sitemap {
  sitemap: string;
}

export interface RobotsTxt {
  robotsTxt: string;
}

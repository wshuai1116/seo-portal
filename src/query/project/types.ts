import { TaskSummary } from "../analysis/types";

export interface Project {
  projectId: string;
  organizationId: string;
  uid: string;
  siteUrl: string;
  createdTime: number;
}

export interface ProjectPaginationResult {
  result: [Project];
  total: number;
}
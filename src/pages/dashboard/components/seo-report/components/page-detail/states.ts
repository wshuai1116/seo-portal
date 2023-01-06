import { AnalysisPage, TaskLink, TaskSummary } from "@/query/analysis/types";
import { makeAutoObservable } from "mobx";

export const pageDrawer = makeAutoObservable({
  visible: false,
  currentPage: null as AnalysisPage | null,
  taskSummary: null as TaskSummary | null,
  metricsCategory: null as string | null,

  open(page: AnalysisPage, taskSummary: TaskSummary, metricsCategory: string | null) {
    this.currentPage = page;
    this.taskSummary = taskSummary;
    this.metricsCategory = metricsCategory;
    this.visible = true;
  },

  close() {
    this.visible = false;
    this.currentPage = null;
    this.taskSummary = null;
    this.metricsCategory = null;
  },
});

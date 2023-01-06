import { useListMetricsItem } from "@/query/analysis";
import { TaskSummary } from "@/query/analysis/types";
import { getIssueByCodes } from "@/utils/issue";
import { useEffect } from "react";
import MetricsSuggestion from "../../metrics-suggestion";
import Issue from "../Issue";
import { SharedMainContainer, SharedRoot, SharedTitle } from "../shared";
import SourceInfo from "../SourceInfo";
import { pageDrawer } from "../states";

function RenderPattern() {
  const METRICS_CATEGORY = "RENDER_PATTERN";

  const {
    data: items,
    refetch,
    remove,
  } = useListMetricsItem({
    taskId: pageDrawer.taskSummary?.taskId as string,
    url: pageDrawer.currentPage?.url as string,
    metricsCategory: METRICS_CATEGORY,
  });

  useEffect(() => {
    refetch();
    return () => {
      remove();
    };
  }, []);

  if (!items) {
    return <></>;
  }

  const item = items[0];
  return (
    <SharedRoot>
      <SharedTitle>页面渲染模式</SharedTitle>
      <SharedMainContainer>
        <MetricsSuggestion
          metricsCategory={METRICS_CATEGORY}
          taskSummary={pageDrawer.taskSummary as TaskSummary}
        />
        <Issue
          items={items}
          desc={<>{getIssueByCodes(item?.issueCodes)}</>}
        />
      </SharedMainContainer>
    </SharedRoot>
  );
}

export default RenderPattern;

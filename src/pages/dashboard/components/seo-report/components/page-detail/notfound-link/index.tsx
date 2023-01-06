import { useListMetricsItem } from "@/query/analysis";
import { TaskSummary } from "@/query/analysis/types";
import { getIssueByCodes } from "@/utils/issue";
import { useEffect } from "react";
import MetricsSuggestion from "../../metrics-suggestion";
import Issue from "../Issue";
import { SharedMainContainer, SharedRoot, SharedTitle } from "../shared";
import SourceInfo from "../SourceInfo";
import { pageDrawer } from "../states";

function NotFoundLink() {
  const METRICS_CATEGORY = "NOTFOUND_LINK";

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

  if (!items || !items?.length) {
    return <></>;
  }

  const item = items[0];
  return (
    <SharedRoot>
      <SharedTitle>失效链接未返回404</SharedTitle>
      <SharedMainContainer>
        <MetricsSuggestion
          metricsCategory={METRICS_CATEGORY}
          taskSummary={pageDrawer.taskSummary as TaskSummary}
        />
        <Issue
          items={items}
          desc={<>{getIssueByCodes(item?.issueCodes)}</>}
        />
        {item ? <SourceInfo desc={<>{item.url}</>} /> : null}
      </SharedMainContainer>
    </SharedRoot>
  );
}

export default NotFoundLink;

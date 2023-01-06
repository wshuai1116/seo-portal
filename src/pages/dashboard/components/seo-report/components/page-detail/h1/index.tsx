import { useListMetricsItem } from "@/query/analysis";
import { TaskSummary } from "@/query/analysis/types";
import { getIssueByCodes } from "@/utils/issue";
import { useEffect } from "react";
import MetricsSuggestion from "../../metrics-suggestion";
import CommonEditor from "../CommonEditor";
import Issue from "../Issue";
import { SharedMainContainer, SharedRoot, SharedTitle } from "../shared";
import SourceInfo from "../SourceInfo";
import { pageDrawer } from "../states";

function H1() {
  const METRICS_CATEGORY = "H1";

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

  const getSourceInfo = () => {
    if (item.elements.length === 0) {
      return "无";
    }
    if (item.elements.length === 1) {
      return getH1Text(item.elements[0].outerHtml);
    }
    return item.elements.map((e, i) => {
      return (
        <div>
          H1-{i + 1}: {getH1Text(e.outerHtml)}
        </div>
      );
    });
  };

  const getH1Text = (outerHtml: string) => {
    if (!outerHtml) {
      return "";
    }
    const parser = new DOMParser();
    const dom = parser.parseFromString(outerHtml, "text/html");
    return dom.body.firstElementChild?.innerText;
  };

  return (
    <SharedRoot>
      <SharedTitle>H1</SharedTitle>
      <SharedMainContainer>
        <MetricsSuggestion
          metricsCategory={METRICS_CATEGORY}
          taskSummary={pageDrawer.taskSummary as TaskSummary}
        />

        <Issue
          items={items}
          desc={<>{getIssueByCodes(item?.issueCodes)}</>}
        />
        <SourceInfo desc={<>{getSourceInfo()}</>} />
        <CommonEditor
          item={item}
          formItemName={"h1"}
          commentValue={item.commentData?.h1}
          defaultValue={getH1Text(item?.elements[0]?.outerHtml)}
        />
      </SharedMainContainer>
    </SharedRoot>
  );
}

export default H1;

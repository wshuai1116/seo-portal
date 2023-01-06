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

function Description() {
  const METRICS_CATEGORY = "DESCRIPTION";

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
      return getDescriptionText(item.elements[0].outerHtml);
    }
    return item.elements.map((e, i) => {
      return (
        <div>
          描述-{i + 1}: {getDescriptionText(e.outerHtml)}
        </div>
      );
    });
  };

  const getDescriptionText = (outerHtml: string) => {
    if (!outerHtml) {
      return "";
    }
    const parser = new DOMParser();
    const dom = parser.parseFromString(outerHtml, "text/html");
    return dom.head.firstElementChild?.getAttribute("content");
  };

  return (
    <SharedRoot>
      <SharedTitle>描述</SharedTitle>
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
          formItemName={"description"}
          commentValue={item.commentData?.description}
          defaultValue={
            getDescriptionText(item?.elements[0]?.outerHtml) as string
          }
        />
      </SharedMainContainer>
    </SharedRoot>
  );
}

export default Description;

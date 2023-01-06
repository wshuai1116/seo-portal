import { useListMetricsItem } from "@/query/analysis";
import { AnalysisItem, TaskSummary } from "@/query/analysis/types";
import { getIssueByCodes } from "@/utils/issue";
import { Divider } from "antd";
import { useEffect } from "react";
import MetricsSuggestion from "../../metrics-suggestion";
import CommonEditor from "../CommonEditor";
import Issue from "../Issue";
import { SharedMainContainer, SharedRoot, SharedTitle } from "../shared";
import SourceInfo from "../SourceInfo";
import { pageDrawer } from "../states";

function ImgAlt() {
  const METRICS_CATEGORY = "IMG_ALT";

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

  const getSourceInfo = (item: AnalysisItem) => {
    // const alt = getImgAltText(item.elements[0]?.outerHtml);
    // if (!alt) {
    //   return "[缺失]";
    // }
    // return alt;
    return item.elements[0]?.outerHtml;
  };

  const getImgAltText = (outerHtml: string) => {
    if (!outerHtml) {
      return null;
    }
    const parser = new DOMParser();
    const dom = parser.parseFromString(outerHtml, "text/html");
    return dom.body.firstElementChild?.getAttribute("alt");
  };

  return (
    <SharedRoot>
      <SharedTitle>图片Alt</SharedTitle>
      <SharedMainContainer>
        <MetricsSuggestion
          metricsCategory={METRICS_CATEGORY}
          taskSummary={pageDrawer.taskSummary as TaskSummary}
        />
        {items.length ? (
          items.map((item) => {
            return (
              <>
                <Issue
                  items={[item]}
                  desc={<>{getIssueByCodes(item?.issueCodes)}</>}
                />
                <SourceInfo desc={<>{getSourceInfo(item)}</>} />
                <CommonEditor
                  item={item}
                  formItemName={"alt"}
                  commentValue={item.commentData?.alt}
                  defaultValue={
                    getImgAltText(item.elements[0]?.outerHtml) as string
                  }
                />
                <Divider type="horizontal" />
              </>
            );
          })
        ) : (
          <Issue items={[]} desc={<></>} />
        )}
      </SharedMainContainer>
    </SharedRoot>
  );
}

export default ImgAlt;

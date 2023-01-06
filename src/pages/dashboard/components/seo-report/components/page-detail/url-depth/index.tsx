import SBFlex, {
  CenterItem,
  FlexColumn,
  FlexRow,
} from "@/components/display/Flex";
import { AnalysisItem, TaskSummary } from "@/query/analysis/types";
import { useOrganization } from "@/query/organization";
import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import Button from "@/components/base/Button";
import MetricsSuggestion from "../../metrics-suggestion";
import { pageDrawer } from "../states";
import { SharedMainContainer, SharedRoot, SharedTitle } from "../shared";
import { useListMetricsItem, useSaveCommentData } from "@/query/analysis";
import { Form, Input } from "antd";
import * as notification from "@/components/display/Notification";
import CommonEditor from "../CommonEditor";
import iconFail from "@/assets/seo/task-fail.svg";
import iconInfo from "@/assets/seo/icon-info.svg";
import iconPass from "@/assets/seo/icon-pass.svg";
import SourceInfo from "../SourceInfo";
import { getIssueByCodes } from "@/utils/issue";
import Issue from "../Issue";

function UrlDepth() {
  const METRICS_CATEGORY = "URL_DEPTH";

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
      <SharedTitle>页面深度</SharedTitle>
      <SharedMainContainer>
        <MetricsSuggestion
          metricsCategory={METRICS_CATEGORY}
          taskSummary={pageDrawer.taskSummary as TaskSummary}
        />
        <Issue
          items={items}
          desc={<>{getIssueByCodes(item?.issueCodes)}</>}
        />
        <SourceInfo desc={<>{item?.url}</>} />
        <CommonEditor
          item={item}
          formItemName={"url"}
          commentValue={item.commentData?.url}
          defaultValue={item.url}
        />
      </SharedMainContainer>
    </SharedRoot>
  );
}

export default UrlDepth;

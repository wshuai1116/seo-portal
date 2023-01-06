import iconDown from "@/assets/common/icon-down.svg";
import iconUp from "@/assets/common/icon-up.svg";
import {
  CenterItem,
  FlexColumn,
  FlexRow
} from "@/components/display/Flex";
import {
  AnalysisMetricsGroup, TaskSummary
} from "@/query/analysis/types";
import { useListMetricsGroup } from "@/query/analysis/useListMetricsGroup";
import { Dictionary } from "lodash";
import groupBy from "lodash/groupBy";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Nodata } from "../../../shared";
import AnalysisCategorySelector from "../analysis-category-selector";
import MetricsDescription from "../metrics-description";
import MetricsSuggestion from "../metrics-suggestion";
import PageDetail from "../page-detail";
import {
  ANALYSIS_CATEGORY_MAP,
  METRICS_CATEGORY_MAP
} from "../report-content/desc";
import PageList from "./PageList";

const Root = styled.div`
  border: 1px solid #e1e3e6;
  border-radius: 8px;
`;

const AnalysisCategoryTitle = styled(FlexRow)`
  color: #000000;
  font-weight: 500;
  font-size: 20px;
  padding: 14px 0px;
  border-bottom: 1px solid #e1e3e6;
  align-items: center;
`;

const MainContainer = styled(FlexColumn)`
  padding: 20px 18px;
`;

const Count = styled(CenterItem)`
  background: rgba(31, 31, 31, 0.2);
  border-radius: 72px;
  color: rgba(31, 31, 31, 0.75);
  font-weight: 500;
  font-size: 14px;
  padding: 1px 6.5px;
  margin-left: 6px;
`;

const MetricsGroupContainer = styled(FlexColumn)`
  padding: 20px 0px;
  border-bottom: 1px solid #e1e3e6;
`;

const MetricsCategoryRow = styled(FlexRow)`
  margin-bottom: 17px;
  align-items: center;
`;

const MetricsCategoryTitle = styled.span`
  font-weight: 500;
  font-size: 16px;
  color: #000000;
`;

const ExpandIcon = styled.img`
  cursor: pointer;
  margin-right: 6px;
  width: 20px;
  height: 20px;
`;

function UnResolvedPages({ taskSummary }: { taskSummary: TaskSummary }) {
  const navigate = useNavigate();

  const [currentCategory, setCurrentCategory] = useState<string | undefined>(
    undefined
  );

  const { data: unresolvedMetricsGroup, refetch: metricsRefetch } =
    useListMetricsGroup({
      taskId: taskSummary.taskId,
      analysisCategory: currentCategory,
      passStatus: "NO_PASS",
    });

  useEffect(() => {
    metricsRefetch();
  }, [currentCategory]);

  const metricsGroupDic: Dictionary<AnalysisMetricsGroup[]> = useMemo(() => {
    return groupBy(unresolvedMetricsGroup, "analysisCategory");
  }, [unresolvedMetricsGroup]);

  const MetricsGroup = ({
    metricsGroup,
  }: {
    metricsGroup: AnalysisMetricsGroup;
  }) => {
    const [expand, setExpand] = useState<boolean>(true);

    return (
      <MetricsGroupContainer>
        <MetricsCategoryRow>
          <ExpandIcon
            src={expand ? iconDown : iconUp}
            onClick={() => {
              setExpand((prev) => !prev);
            }}
          />
          <MetricsCategoryTitle>
            {METRICS_CATEGORY_MAP[metricsGroup.metricsCategory]}
          </MetricsCategoryTitle>
          <Count>{metricsGroup.pages.total}</Count>{" "}
        </MetricsCategoryRow>

        <FlexColumn
          style={{
            marginLeft: 20,
            overflow: "hidden",
            height: expand ? "auto" : "0px",
          }}
        >
          <MetricsDescription
            metricsCategory={metricsGroup.metricsCategory}
            style={{
              borderRadius: "8px 8px 0px 0px",
              borderBottom: "none",
            }}
          />
          <MetricsSuggestion
            metricsCategory={metricsGroup.metricsCategory}
            taskSummary={taskSummary}
            style={{
              borderRadius: "0px 0px 8px 8px",
              marginBottom: 14,
            }}
          />
          <PageList
            taskSummary={taskSummary}
            initPages={metricsGroup.pages}
            metricsCategory={metricsGroup.metricsCategory}
          />
        </FlexColumn>
      </MetricsGroupContainer>
    );
  };

  if (!unresolvedMetricsGroup) {
    return <></>;
  }

  return (
    <Root>
      <AnalysisCategorySelector
        onSelect={(analysisCategory) => {
          setCurrentCategory(analysisCategory);
        }}
      />
      <MainContainer>
        {Object.keys(metricsGroupDic).length > 0 ? (
          Object.keys(metricsGroupDic).map((key) => {
            const analysisCategory = key;
            const metricsGroups = metricsGroupDic[key];
            return (
              <>
                <AnalysisCategoryTitle>
                  {ANALYSIS_CATEGORY_MAP[analysisCategory]}
                  <Count>{metricsGroups.length}</Count>
                </AnalysisCategoryTitle>
                {metricsGroups.map((metricsGroup) => (
                  <MetricsGroup metricsGroup={metricsGroup} />
                ))}
              </>
            );
          })
        ) : (
          <Nodata />
        )}
      </MainContainer>
      <PageDetail />
    </Root>
  );
}

export default UnResolvedPages;

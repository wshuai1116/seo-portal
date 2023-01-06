import { useEffect, useState } from "react";
import loginImage1 from "@/assets/login/login-image1.png";
import { Helmet } from "react-helmet";
import SBFlex, {
  FlexColumn
} from "@/components/display/Flex";
import {
  AnalysisMetrics, TaskSummary
} from "@/query/analysis/types";
import { InfoCircleOutlined } from "@ant-design/icons";
import { Progress } from "antd";
import { Dictionary } from "lodash";
import groupBy from "lodash/groupBy";
import {
  useNavigate
} from "react-router-dom";
import styled from "styled-components";

const Root = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 30px;
  width: 280px;
  margin-left: 50px;

  @media screen and (max-width: 1440px) {
    width: 180px;
  }
  @media screen and (max-width: 1024px) {
    width: 120px;
  }
`;

const Title = styled.div`
  font-size: 16px;
  font-weight: bold;
`;
const CategoryTitle = styled.div`
  color: #5a5a5a;
  font-weight: bold;
`;
const CategoryPercent = styled.div`
  color: #5a5a5a;
`;
const CategoryProgress = styled(Progress)`
  line-height: 1;
  margin: 0px 0 16px 0;
  >div>div {
    background-color: #9BE1AE;
  }
`;



const SECTION_CATEGORY_MAP: Record<string, string> = {
  STRUCTURE: "网站结构",
  PAGE: "网页信息",
  DUPLICATED: "重复页面",
};

function ReportCategory({ taskSummary }: { taskSummary: TaskSummary }) {
  const navigate = useNavigate();

  const getPercent = (analysisCategory: string): number => {
    const categoryGroup: Dictionary<AnalysisMetrics[]> = groupBy(
      taskSummary.metricsList,
      "analysisCategory"
    );
    return +(
      (getItemTotalCount(categoryGroup[analysisCategory]) * 100) /
      getItemTotalCount(taskSummary.metricsList)
    ).toFixed(2);
  };

  const getItemTotalCount = (metricsList: AnalysisMetrics[]): number => {
    let count = 0;
    metricsList.forEach((metrics) => {
      metrics.items.forEach(() => {
        count++;
      });
    });
    return count;
  };

  const getContent = () => {
    const categoryGroup: Dictionary<AnalysisMetrics[]> = groupBy(
      taskSummary.metricsList,
      "analysisCategory"
    );

    return (
      <>
        <SBFlex
          style={{
            marginBottom: 20,
          }}
        >
          <Title>问题分类</Title>
          {/* <InfoCircleOutlined style={{fontSize: 18, color: "#cacaca"}} /> */}
        </SBFlex>
        <FlexColumn>
          {Object.keys(categoryGroup).map((key) => {
            return (
              <>
                <SBFlex>
                  <CategoryTitle>{SECTION_CATEGORY_MAP[key]}</CategoryTitle>
                  <CategoryPercent>{getPercent(key)}%</CategoryPercent>
                </SBFlex>
                <CategoryProgress percent={getPercent(key)} showInfo={false}
                  strokeColor={(getPercent(key) > 50) ? {'0%': '#483aa9', '100%': '#108ee9'} : (getPercent(key) > 10) ? { '0%': '#FFC629', '100%': '#FF7F57' } : { '0%': '#ff0000', '100%': '#FF7F57' }}
                />
              </>
            );
          })}
        </FlexColumn>
      </>
    );
  };

  return (
    <Root>
      {taskSummary ? (
        <FlexColumn
          style={{
            width: "100%",
          }}
        >
          {getContent()}
        </FlexColumn>
      ) : null}
    </Root>
  );
}

export default ReportCategory;

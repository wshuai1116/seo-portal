import iconCritical from "@/assets/seo/icon-critical.svg";
import iconLow from "@/assets/seo/icon-low.svg";
import iconNormal from "@/assets/seo/icon-normal.svg";
import iconOptional from "@/assets/seo/icon-optional.svg";
import { CenterItem, FlexColumn, FlexRow } from "@/components/display/Flex";
import { TaskSummary } from "@/query/analysis/types";
import { Gauge } from "@ant-design/charts";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import { Nodata } from "../../../shared";

const Root = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;
`;

const ScoreContainer = styled(FlexColumn)`
  border: 1px solid #e1e3e6;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.04);
  border-radius: 8px;
  padding: 14px;
  height: 186px;
`;

const Title = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: black;
  margin-bottom: 14px;
`;

const ScoreProgress = styled(Gauge)`
  width: 240px;
  height: 120px !important;
`;

const ScoreItemContainer = styled(FlexRow)`
  background: #f7f8fa;
  border-radius: 8px;
  height: 120px;
  justify-content: space-evenly;
  align-items: center;
`;

const ScoreItem = styled(FlexColumn)`
  justify-content: center;
  align-items: center;

  img {
    width: 18px;
    height: 18px;
    margin-right: 7px;
  }
`;

const ScoreItemCount = styled.div<{
  color?: string;
}>`
  ${(props) =>
    css`
      color: ${props.color};
    `}
  font-weight: 400;
  font-size: 24px;
  margin-bottom: 8px;
`;

const ScoreItemDivider = styled.div`
  height: 60px;
  width: 1px;
  background-color: #e1e3e6;
`;

function ScoreSummary({ taskSummary }: { taskSummary?: TaskSummary }) {
  const navigate = useNavigate();

  return (
    <Root>
      <FlexRow style={{ width: "100%", gap: 20 }}>
        <ScoreContainer
          style={{
            width: 308,
          }}
        >
          <Title>网站得分</Title>
          <CenterItem>
            {taskSummary ? (
              <ScoreProgress
                startAngle={Math.PI}
                endAngle={2 * Math.PI}
                innerRadius={0.7}
                indicator={false}
                range={{
                  color: "#5A65EA",
                  width: 30,
                }}
                percent={taskSummary.totalScore}
                statistic={{
                  title: {
                    offsetY: -12,
                    style: {
                      fontSize: "54px",
                      fontWeight: "500",
                    },
                    content: taskSummary.totalScore + "",
                  },
                }}
              />
            ) : (
              <Nodata
                style={{
                  height: "auto",
                }}
                desc="暂无分数"
              />
            )}
          </CenterItem>
        </ScoreContainer>
        <ScoreContainer
          style={{
            flex: 1,
          }}
        >
          <Title>问题</Title>
          <ScoreItemContainer>
            <ScoreItem>
              <ScoreItemCount color="#D3594F">
                {taskSummary ? taskSummary.criticalCount : "-"}
              </ScoreItemCount>
              <CenterItem>
                <img src={iconCritical} /> 严重
              </CenterItem>
            </ScoreItem>
            <ScoreItemDivider />
            <ScoreItem>
              <ScoreItemCount color="#EA9F2E">
                {taskSummary ? taskSummary.mediumCount : "-"}
              </ScoreItemCount>
              <CenterItem>
                <img src={iconNormal} /> 中等
              </CenterItem>
            </ScoreItem>
            <ScoreItemDivider />
            <ScoreItem>
              <ScoreItemCount color="#5A8AEA">
                {taskSummary ? taskSummary.lowCount : "-"}
              </ScoreItemCount>
              <CenterItem>
                <img src={iconLow} />
                轻度
              </CenterItem>
            </ScoreItem>
            <ScoreItemDivider />
            <ScoreItem>
              <ScoreItemCount color="#8A8BA0">
                {taskSummary ? taskSummary.optionalCount : "-"}
              </ScoreItemCount>
              <CenterItem>
                <img src={iconOptional} /> 可选
              </CenterItem>
            </ScoreItem>
          </ScoreItemContainer>
        </ScoreContainer>
      </FlexRow>
    </Root>
  );
}

export default ScoreSummary;

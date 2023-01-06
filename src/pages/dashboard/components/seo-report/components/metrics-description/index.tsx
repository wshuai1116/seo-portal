import { CenterItem, FlexColumn, FlexRow } from "@/components/display/Flex";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import iconDescription from "@/assets/seo/icon-metrics-description.svg";
import iconSuggestion from "@/assets/seo/icon-metrics-suggestion.svg";
import { METRICS_CATEGORY_DESC_MAP } from "../report-content/desc";

const Root = styled(FlexColumn)`
  width: 100%;
  border: 1px solid #e1e3e6;
  border-radius: 8px;
`;

const DescriptionContainer = styled.div`
  padding: 15px;
  background: rgba(156, 168, 191, 0.05);
  color: #1f1f1f;
`;

const TitleRow = styled(FlexRow)`
  align-items: center;
  margin-bottom: 4px;
`;

const Content = styled(FlexRow)`
  margin-left: 29px;
  font-weight: 400;
  font-size: 14px;
`;

const StyledIcon = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 10px;
`;

function MetricsDescription({
  metricsCategory,
  style,
}: {
  metricsCategory: string;
  style?: React.CSSProperties;
}) {
  const navigate = useNavigate();

  const content = useMemo(() => {
    return <Content>{METRICS_CATEGORY_DESC_MAP[metricsCategory]}</Content>;
  }, [metricsCategory]);

  return (
    <Root
      style={{
        ...style,
      }}
    >
      <DescriptionContainer>
        <TitleRow>
          <StyledIcon src={iconDescription} /> <span>问题描述</span>
        </TitleRow>
        {content}
      </DescriptionContainer>
    </Root>
  );
}

export default MetricsDescription;

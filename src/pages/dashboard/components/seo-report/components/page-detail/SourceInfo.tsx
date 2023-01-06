import iconInfo from "@/assets/seo/icon-info.svg";
import iconFail from "@/assets/seo/task-fail.svg";
import { FlexColumn, FlexRow } from "@/components/display/Flex";
import { AnalysisItem } from "@/query/analysis/types";
import { useMemo } from "react";
import styled from "styled-components";

const Root = styled(FlexColumn)`
  border: 1px solid #e1e3e6;
  border-radius: 8px;
  padding: 14px;
  gap: 4px;
`;

const TitleRow = styled(FlexRow)`
  align-items: center;
`;

const Content = styled(FlexColumn)`
  word-break: break-all;
  margin-left: 29px;
  font-weight: 400;
  font-size: 14px;
`;

const StyledIcon = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 10px;
`;

const SourceInfo = ({
  title,
  desc,
  style,
}: {
  title?: string;
  desc: React.ReactNode;
  style?: React.CSSProperties;
}) => {
  if (!desc) {
    return <></>;
  }

  return (
    <Root
      style={{
        background: "rgba(156, 168, 191, 0.05)",
        ...style,
      }}
    >
      <TitleRow>
        <StyledIcon src={iconInfo} />
        <span>{title ? title : "原始信息："}</span>
      </TitleRow>
      <Content>{desc}</Content>
    </Root>
  );
};

export default SourceInfo;

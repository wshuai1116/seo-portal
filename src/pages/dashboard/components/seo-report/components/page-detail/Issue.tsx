import iconPass from "@/assets/seo/icon-pass.svg";
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
  margin-left: 29px;
  font-weight: 400;
  font-size: 14px;
`;

const StyledIcon = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 10px;
`;

const Issue = ({
  items,
  desc,
  style,
}: {
  items: AnalysisItem[];
  desc: React.ReactNode;
  style?: React.CSSProperties;
}) => {
  const isAllPass = useMemo(() => {
    const noPass = items?.find((i) => i.passStatus === "NO_PASS");
    if (noPass) {
      return false;
    } else {
      return true;
    }
  }, [items]);

  if (!items) {
    return <></>;
  }

  return (
    <Root
      style={{
        background: isAllPass
          ? "rgba(97, 193, 119, 0.1)"
          : "rgba(211, 89, 79, 0.1)",
        ...style,
      }}
    >
      {isAllPass ? (
        <TitleRow>
          <StyledIcon src={iconPass} /> <span>该评分项已通过检查</span>
        </TitleRow>
      ) : (
        <>
          <TitleRow>
            <StyledIcon src={iconFail} /> <span>当前问题：</span>
          </TitleRow>
          <Content>{desc}</Content>
        </>
      )}
    </Root>
  );
};

export default Issue;

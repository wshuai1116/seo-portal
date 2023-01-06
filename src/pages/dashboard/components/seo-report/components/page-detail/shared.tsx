import Button from "@/components/base/Button";
import SBFlex, {
  CenterItem,
  FlexColumn,
  FlexRow,
} from "@/components/display/Flex";
import styled from "styled-components";

export const SharedRoot = styled(FlexColumn)`
  width: 100%;
`;

export const SharedTitle = styled(FlexRow)`
  width: 100%;
  padding: 14px;
  font-weight: 600;
  font-size: 28px;
  border-bottom: 1px solid #e1e3e6;
`;

export const SharedMainContainer = styled(FlexColumn)`
  flex: 1;
  padding: 14px;
  gap: 14px;
  overflow: auto;
`;
export const ItemEditor = styled(FlexRow)`
  width: 100%;
  background: rgba(241, 243, 247, 0.5);
  border: 1px solid #e1e3e6;
  border-radius: 8px;
  padding: 14px;

  .ant-form-item {
    margin-bottom: 0px;
  }
`;

export const SharedControlBar = styled(SBFlex)`
  margin-bottom: 10px;
  font-weight: 500;
  font-size: 16px;
`;

export const SharedButtonGroup = styled(CenterItem)`
  gap: 16px;
`;

export const textAreaProps = {
  autoFocus: false,
  rows: 4,
  autoSize: { minRows: 4, maxRows: 10 },
  bordered: false,
};
export const SharedControlBarTips = () => {
  return <span>修改为</span>;
};

export const SharedButton = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) => {
  return (
    <Button
      type="default"
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
    >
      {children}
    </Button>
  );
};

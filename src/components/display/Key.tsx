import { CSSProperties } from "react";
import styled from "styled-components";

const StyledKeyOut = styled.div`
  background: #bdbdbd;
  border-radius: 8px;
  height: 36px;
  margin-left: 8px;
`;

const StyledKeyInner = styled.div`
  background: #dddddd;
  padding: 0 13px;
  min-width: 39px;
  line-height: 30px;
  height: 30px;
  border-radius: 8px;
  text-align: center;

  font-size: 16px;
  line-height: 30px;
  color: #333334;
`;

const Key = ({ text, style }: { text: string; style?: CSSProperties }) => {
  return (
    <StyledKeyOut style={style}>
      <StyledKeyInner>{text}</StyledKeyInner>
    </StyledKeyOut>
  );
};

export default Key;

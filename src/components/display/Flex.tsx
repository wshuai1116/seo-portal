import styled, { css } from "styled-components";

export const AutoItem = styled.div`
  flex: 0 0 auto;
`;
export const GrowItem = styled.div`
  flex: 1 1 0%;
`;

export const CenterItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FlexRow = styled.div<{
  center?: boolean;
}>`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  ${(props) =>
    props.center
      ? css`
          align-items: center;
        `
      : ""}
`;

export const FlexColumn = styled(FlexRow)`
  flex-direction: column;
`;

export const SBFlex = styled(FlexRow)`
  justify-content: space-between;
`;

export default SBFlex;

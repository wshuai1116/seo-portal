import styled from "styled-components";
import SBFlex, { FlexRow } from "../Flex";

import iconCheck from "@/assets/common/icon-success-check.svg";
import iconError from "@/assets/common/icon-error.svg";

import iconWarn from "@/assets/common/icon-warn.svg";

import { toast } from "react-toastify";
import { v4 } from "uuid";

const StyledWrapper = styled(FlexRow)`
  padding-right: 5px;
  align-items: flex-start;
  width: 100%;

  .li-close-big {
    padding-top: 8px;
  }

  img {
    width: 38px;
  }
`;

const Content = styled.span`
  padding: 8px 0;
`;

export const success = (content: string | JSX.Element) => {
  const id = v4();

  toast.success(
    <StyledWrapper>
      <SBFlex
        style={{
          flex: "1 1 0%",
        }}
      >
        <FlexRow
          style={{
            alignItems: "flex-start",
          }}
        >
          <img src={iconCheck} />
          <Content>{content}</Content>
        </FlexRow>
      </SBFlex>
      <span
        onClick={() => {
          toast.dismiss(id);
        }}
        className="li li-close-big big"
      />
    </StyledWrapper>,
    {
      toastId: id,
    }
  );
};

export const error = (content: string | JSX.Element) => {
  const id = v4();

  toast.error(
    <StyledWrapper>
      <SBFlex
        style={{
          flex: "1 1 0%",
        }}
      >
        <FlexRow
          style={{
            alignItems: "flex-start",
          }}
        >
          <img src={iconError} />
          <Content>{content}</Content>
        </FlexRow>
      </SBFlex>
      <span
        onClick={() => {
          toast.dismiss(id);
        }}
        className="li li-close-big big"
      />
    </StyledWrapper>,
    {
      toastId: id,
    }
  );
};

export const warn = (content: string | JSX.Element) => {
  const id = v4();

  toast.warn(
    <StyledWrapper>
      <SBFlex
        style={{
          flex: "1 1 0%",
        }}
      >
        <FlexRow
          style={{
            alignItems: "flex-start",
          }}
        >
          <img src={iconWarn} />
          <Content>{content}</Content>
        </FlexRow>
      </SBFlex>
      <span
        onClick={() => {
          toast.dismiss(id);
        }}
        className="li li-close-big big"
      />
    </StyledWrapper>,
    {
      toastId: id,
    }
  );
};

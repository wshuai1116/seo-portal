import { CenterItem } from "@/components/display/Flex";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";

const Root = styled(CenterItem)<{
  bgColor: string;
  color: string;
}>`
  padding: 4px 10px;
  background: rgba(73, 121, 215, 0.2);
  border-radius: 4px;
  font-size: 12px;
  ${(props) =>
    css`
      background: ${props.bgColor};
      color: ${props.color};
    `}
`;

function StatusCodeIcon({ statusCode }: { statusCode?: number }) {
  const navigate = useNavigate();

  if (!statusCode) {
    return (
      <Root bgColor="rgba(0, 0, 0, 0.2)" color="#000000">
        No Response
      </Root>
    );
  }
  const floorNumber = Math.floor(statusCode / 100);
  if (floorNumber === 1) {
    return (
      <Root bgColor=" rgba(73, 121, 215, 0.2)" color="#4979D7">
        {statusCode}
      </Root>
    );
  }
  if (floorNumber === 2) {
    return (
      <Root bgColor="rgba(116, 190, 159, 0.2)" color="#5CBB93">
        {statusCode}
      </Root>
    );
  }
  if (floorNumber === 3) {
    return (
      <Root bgColor="rgba(215, 167, 73, 0.2)" color="#D7A749">
        {statusCode}
      </Root>
    );
  }
  if (floorNumber === 4) {
    return (
      <Root bgColor="rgba(215, 73, 175, 0.2)" color="#D749AF">
        {statusCode}
      </Root>
    );
  }
  if (floorNumber === 5) {
    return (
      <Root bgColor="rgba(215, 73, 73, 0.2)" color="#D74949">
        {statusCode}
      </Root>
    );
  }
  return <></>;
}

export default StatusCodeIcon;

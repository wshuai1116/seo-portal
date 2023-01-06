import { FlexRow } from "@/components/display/Flex";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Root = styled(FlexRow)`
  width: 14px;
  height: 14px;
  margin-right: 2px;
  border-radius: 2px;
`;

function MetricsLevelIcon({ level }: { level: string }) {
  const navigate = useNavigate();

  if (level === "CRITICAL") {
    return (
      <Root
        style={{
          background: "linear-gradient(0deg, #d3594f, #d3594f), #d3594f",
        }}
      ></Root>
    );
  }
  if (level === "MEDIUM") {
    return (
      <Root
        style={{
          background: "linear-gradient(0deg, #EA9F2E, #EA9F2E), #D3594F",
        }}
      ></Root>
    );
  }
  if (level === "LOW") {
    return (
      <Root
        style={{
          background: "#5A8AEA",
        }}
      ></Root>
    );
  }
  if (level === "OPTIONAL") {
    return (
      <Root
        style={{
          background: "#8A8BA0",
        }}
      ></Root>
    );
  }
  return <></>;
}

export default MetricsLevelIcon;

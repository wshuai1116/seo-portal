import {
  FlexColumn
} from "@/components/display/Flex";
import { ArrowRightOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import { SharedMainContainer, SharedRoot, SharedTitle } from "../shared";
import SourceInfo from "../SourceInfo";
import { pageDrawer } from "../states";

function Redirection() {
  useEffect(() => {}, []);

  return (
    <SharedRoot>
      <SharedTitle>{pageDrawer.currentPage?.statusCode}重定向页面</SharedTitle>
      <SharedMainContainer>
        <SourceInfo
          title="重定向信息"
          desc={
            <FlexColumn
              style={{
                gap: 4,
              }}
            >
              <div>{pageDrawer.currentPage?.url}</div>
              <div>
                <ArrowRightOutlined
                  style={{
                    marginRight: 10,
                  }}
                />
                {pageDrawer.currentPage?.redirectLocation}
              </div>
            </FlexColumn>
          }
        />
      </SharedMainContainer>
    </SharedRoot>
  );
}

export default Redirection;

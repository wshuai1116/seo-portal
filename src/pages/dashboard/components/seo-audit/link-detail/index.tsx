import { Drawer } from "antd";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { linkDrawer } from "../states";
import { observer } from "mobx-react-lite";
import { useGetTaskLinkDetail } from "@/query/analysis";

const Root = styled.div``;

function LinkDetail() {
  const navigate = useNavigate();
  const onClose = () => linkDrawer.close();

  const { data: linkDetail } = useGetTaskLinkDetail({
    taskId: linkDrawer.currentLink?.taskId,
    url: linkDrawer.currentLink?.url,
  });

  return (
    <Drawer
      title={linkDrawer.currentLink?.url}
      placement="right"
      onClose={onClose}
      open={linkDrawer.visible}
      maskStyle={{
        opacity: 0.5,
      }}
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Drawer>
  );
}

export default observer(LinkDetail);

import Button from "@/components/base/Button";
import * as notification from "@/components/display/Notification";
import { useListMetricsItem, useSaveCommentData } from "@/query/analysis";
import { AnalysisItem, TaskSummary } from "@/query/analysis/types";
import { generateRobotsTxt } from "@/query/analysis/useGenerateRobotsTxt";
import { getIssueByCodes } from "@/utils/issue";
import { CopyOutlined, DownloadOutlined } from "@ant-design/icons";
import { Form, Input } from "antd";
import { FormInstance } from "antd/es/form/Form";
import axios from "axios";
import copy from "copy-to-clipboard";
import { useEffect, useMemo, useRef, useState } from "react";
import MetricsSuggestion from "../../metrics-suggestion";
import Issue from "../Issue";
import {
  ItemEditor,
  SharedButton,
  SharedButtonGroup,
  SharedControlBar,
  SharedControlBarTips,
  SharedMainContainer,
  SharedRoot,
  SharedTitle,
  textAreaProps,
} from "../shared";
import SourceInfo from "../SourceInfo";
import { pageDrawer } from "../states";

function RobotsTxt() {
  const METRICS_CATEGORY = "ROBOTS";

  const {
    data: items,
    refetch,
    remove,
  } = useListMetricsItem({
    taskId: pageDrawer.taskSummary?.taskId as string,
    url: pageDrawer.currentPage?.url as string,
    metricsCategory: METRICS_CATEGORY,
  });

  useEffect(() => {
    refetch();
    return () => {
      remove();
    };
  }, []);

  if (!items || !items?.length) {
    return <></>;
  }

  const Editor = ({
    item,
    commentValue,
    defaultValue,
  }: {
    item: AnalysisItem;
    commentValue: string;
    defaultValue: string;
  }) => {
    const saveCommentDataMutation = useSaveCommentData({
      onSuccess(data, params) {
        notification.success("保存成功");
        setEditSwitch(false);
        refetch();
      },
      onError(e) {
        if (e.errorCode === "SEOGO_ITEM_VALIDATION_ERROR") {
          notification.error(getIssueByCodes(e.message));
        } else {
          notification.error(e.message);
        }
      },
    });

    const isCommentExist = useMemo(() => {
      if (item.commentData) {
        return true;
      } else {
        return false;
      }
    }, [item]);

    const [editSwitch, setEditSwitch] = useState(!isCommentExist);

    const handleSubmit = (params: any) => {
      if (!params.robotsTxt) {
        notification.error("请填写内容");
        return;
      }
      saveCommentDataMutation.mutate({
        itemId: item.itemId,
        commentData: JSON.stringify(params),
      });
    };

    const clickEdit = () => {
      setEditSwitch(true);
    };

    const handleGenerateRobotsTxt = () => {
      generateRobotsTxt(item.metricsId)
        .then(({ result }) => {
          saveCommentDataMutation.mutate({
            itemId: item.itemId,
            commentData: JSON.stringify({
              robotsTxt: result.robotsTxt,
            }),
          });
        })
        .catch((error) => {
          console.log(error);
        });
    };

    return (
      <ItemEditor>
        <Form onFinish={handleSubmit} style={{ width: "100%" }}>
          <SharedControlBar>
            <div>{isCommentExist ? <SharedControlBarTips /> : null}</div>
            <SharedButtonGroup>
              {isCommentExist && !editSwitch ? (
                <>
                  <SharedButton
                    onClick={() => {
                      copy(item.commentData.robotsTxt, {
                        format: "text/plain",
                      });
                      notification.success("复制成功");
                    }}
                  >
                    <CopyOutlined /> 复制
                  </SharedButton>
                  <SharedButton
                    onClick={() => {
                      let url = "/api/robotstxt/download?itemId=" + item.itemId;
                      axios({
                        url: url,
                        method: "POST",
                        responseType: "blob",
                      }).then((response: any) => {
                        const href = URL.createObjectURL(response.data);

                        const link = document.createElement("a");
                        link.href = href;
                        link.setAttribute("download", "robots.txt");
                        document.body.appendChild(link);
                        link.click();

                        document.body.removeChild(link);
                        URL.revokeObjectURL(href);
                      });
                    }}
                  >
                    <DownloadOutlined />
                    下载
                  </SharedButton>
                  <SharedButton
                    onClick={() => {
                      clickEdit();
                    }}
                  >
                    编辑
                  </SharedButton>
                </>
              ) : (
                <>
                  <Button
                    type="primary"
                    onClick={() => handleGenerateRobotsTxt()}
                  >
                    生成
                  </Button>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={saveCommentDataMutation.isLoading}
                  >
                    保存
                  </Button>
                </>
              )}
            </SharedButtonGroup>
          </SharedControlBar>
          <Form.Item
            name="robotsTxt"
            initialValue={isCommentExist ? commentValue : defaultValue}
          >
            <Input.TextArea
              {...textAreaProps}
              style={{
                color: "#1F1F1F",
                border: "1px solid #E1E3E6",
                borderRadius: "8px",
                background: !editSwitch ? "#F1F3F7" : "white",
              }}
              readOnly={!editSwitch}
            />
          </Form.Item>
        </Form>
      </ItemEditor>
    );
  };

  const item = items[0];
  return (
    <SharedRoot>
      <SharedTitle>robots.txt</SharedTitle>
      <SharedMainContainer>
        <MetricsSuggestion
          metricsCategory={METRICS_CATEGORY}
          taskSummary={pageDrawer.taskSummary as TaskSummary}
        />
        <Issue
          items={items}
          desc={<>{getIssueByCodes(item?.issueCodes)}</>}
        />
        {item ? (
          <SourceInfo
            desc={
              <>
                <a href={item.url} target="_blank">
                  {item.url}
                </a>
              </>
            }
          />
        ) : null}
        {item ? (
          <Editor
            item={item}
            commentValue={item.commentData?.robotsTxt}
            defaultValue={item.data?.robotsTxt}
          />
        ) : null}
      </SharedMainContainer>
    </SharedRoot>
  );
}

export default RobotsTxt;

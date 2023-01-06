import Button from "@/components/base/Button";
import * as notification from "@/components/display/Notification";
import { useSaveCommentData } from "@/query/analysis";
import { AnalysisItem } from "@/query/analysis/types";
import { getIssueByCodes } from "@/utils/issue";
import { Trans } from "@lingui/macro";
import { Form, Input } from "antd";
import { FormInstance } from "antd/es/form/Form";
import { useMemo, useRef, useState } from "react";
import {
  ItemEditor,
  SharedButton,
  SharedButtonGroup,
  SharedControlBar,
  SharedControlBarTips,
  textAreaProps,
} from "./shared";

const CommonEditor = ({
  item,
  formItemName,
  commentValue,
  defaultValue,
}: {
  item: AnalysisItem;
  formItemName: string;
  commentValue: string;
  defaultValue: string;
}) => {
  const formRef = useRef<FormInstance>(null);

  const saveCommentDataMutation = useSaveCommentData({
    onSuccess(data, params) {
      notification.success("保存成功");
      setEditSwitch(false);
      setCommentSaved(true);
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

  const [commentSaved, setCommentSaved] = useState(false);

  const handleSubmit = (params: any) => {
    saveCommentDataMutation.mutate({
      itemId: item.itemId,
      commentData: JSON.stringify(params),
    });
  };

  const clickEdit = () => {
    setEditSwitch(true);
  };

  return (
    <ItemEditor>
      <Form onFinish={handleSubmit} style={{ width: "100%" }} ref={formRef}>
        <SharedControlBar>
          <div>
            {isCommentExist || commentSaved ? <SharedControlBarTips /> : null}
          </div>
          <SharedButtonGroup>
            {(isCommentExist || commentSaved) && !editSwitch ? (
              <SharedButton
                onClick={() => {
                  clickEdit();
                }}
              >
                <Trans>编辑</Trans>
              </SharedButton>
            ) : (
              <Button
                type="primary"
                htmlType="submit"
                loading={saveCommentDataMutation.isLoading}
              >
                <Trans>保存</Trans>
              </Button>
            )}
          </SharedButtonGroup>
        </SharedControlBar>
        <Form.Item
          name={formItemName}
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

export default CommonEditor;

import { createSimpleMutationHook, createSimpleQueryHook } from "@/query/utils";

import request from "@/utils/request";

export const Key = "saveCommentData";

export const saveCommentData = ({
  itemId,
  commentData,
}: {
  itemId: string;
  commentData: string;
}) => {
  return request({
    method: "POST",
    url: "/task/comment/save",
    data: {
      itemId: itemId,
      commentData: commentData,
    },
  });
};

export const useSaveCommentData = createSimpleMutationHook(
  saveCommentData,
  (_, client) => {
  }
);

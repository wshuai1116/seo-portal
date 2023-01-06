import { FC } from "react";
import { FlexRow } from "@/components/display/Flex";
import styled, { css } from "styled-components";

import RawDropdown, { DropDownProps } from "antd/lib/dropdown";

export const Dropdown: FC<DropDownProps> = (props) => {
  return <RawDropdown {...props} transitionName="fade-in" />;
};

export const BaseMenu = styled.div<{
  darkBg?: boolean;
}>`
  padding: 8px;
  background: var(--dropdown-bg);
  box-shadow: var(--dropdown-box-shadow);
  border-radius: 10px;
  min-width: 200px;
  max-height: 500px;
  overflow: auto;

  ${(props) =>
    props.darkBg
      ? css`
          background: var(--dropdown-dark-bg);
        `
      : ""}
`;

export const BaseContextMenu = styled(BaseMenu)`
  padding: 0;
  border: 1px solid var(--modal-border-color);
`;

export const BaseContextMenuSection = styled.div`
  padding: 8px;
`;

export const BaseContextMenuSeperator = styled.div`
  border-top: 1px solid var(--modal-border-color);
`;

export const BaseMenuItem = styled(FlexRow)<{
  selected?: boolean;
  hovered?: boolean;
}>`
  padding: 6px;
  height: 28px;
  color: var(--main-text-color);
  align-items: center;
  font-size: 12px;
  line-height: 16px;
  cursor: pointer;
  border-radius: var(--base-border-radius);

  :hover {
    color: var(--text-color-bold);
    background-color: var(--dropdown-item-active-bg);
  }

  ${(props) =>
    props.hovered
      ? css`
          color: var(--text-color-bold);
          background-color: var(--dropdown-item-active-bg);
        `
      : ""}

  ${(props) =>
    props.selected
      ? css`
          color: #fff;
          background-color: var(--dropdown-item-active-highlight-bg);

          :hover {
            color: #fff;
            background-color: var(--dropdown-item-active-highlight-bg);
          }
        `
      : ""}
`;

export const SwitcherMenu = styled(BaseMenu)`
  width: 300px;
  padding: 20px;
`;

const itemSelectedCss = css`
  background-color: var(--dropdown-item-active-highlight-bg);
  .icon-check {
    display: none;
  }
  .icon-action {
    display: flex;
  }
`;

export const SwitcherMenuItem = styled(BaseMenuItem)`
  justify-content: space-between;
  height: 48px;

  .icon-action,
  .icon-check {
    margin-left: 8px;
  }

  .icon-action {
    display: none;
    justify-content: center;
    text-align: center;
    align-items: center;
    width: 32px;
    height: 32px;
    border-radius: 4px;
    cursor: pointer;

    img {
      width: 17px;
    }

    :hover {
      background-color: #e0e0e2;
    }

    ${(props) =>
      props.selected
        ? css`
            background-color: #e0e0e2;
          `
        : ""}
  }

  :hover {
    ${itemSelectedCss}
  }

  ${(props) => (props.selected ? itemSelectedCss : "")}
`;

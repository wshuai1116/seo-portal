import Button, { ButtonProps } from "antd/lib/button";
import classNames from "classnames";
import styles from "./styles.module.scss";

import { match } from "ts-pattern";

import styled from "styled-components";
import { FlexRow } from "@/components/display/Flex";

export const CancelButton = styled(FlexRow)`
  height: 32px;
  width: 75px;
  font-size: 12px;
  line-height: 16px;
  justify-content: center;
  align-items: center;
  color: var(--main-text-color);
  background: var(--button-cancel-bg);
  border-radius: var(--base-border-radius);
  border: 1px solid var(--button-cancel-border-color);

  cursor: pointer;
  font-weight: 500;

  transition: background 0.1s;

  :hover {
    background: var(--button-cancel-hover-bg);
  }
`;

const ActionButton = (props: ButtonProps) => (
  <Button
    {...props}
    className={classNames(
      styles.customButton,
      match(props.type)
        .with("default", () => styles.buttonGhostNormal)
        .with("text", () => styles.buttonText)
        .with("primary", () =>
          props.ghost
            ? props.danger
              ? styles.buttonPrimaryGhostDanger
              : styles.buttonPrimaryGhost
            : props.danger
            ? styles.buttonPrimaryDanger
            : styles.buttonPrimary
        )
        .otherwise(() => styles.buttonPrimary),
      props.size === "small" ? styles.smallButton : "",
      props.disabled ? "disabled" : "",
      props.className || ""
    )}
  />
);

export default ActionButton;

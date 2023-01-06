import Button, { ButtonProps } from "antd/lib/button";
import classNames from "classnames";
import styles from "./styles.module.scss";

import { match } from "ts-pattern";

import styled from "styled-components";
import { FlexRow } from "@/components/display/Flex";

export const CancelButton = styled(FlexRow)`
  width: 80px;
  height: 52px;
  justify-content: center;
  align-items: center;
  background: #f0f0f1;
  border-radius: 16px;
  cursor: pointer;
  font-weight: 500;

  transition: background 0.1s;

  :hover {
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),
      #f0f0f0;
  }
`;

const ActionButton = (props: ButtonProps) => (
  <Button
    {...props}
    className={classNames(
      styles.customButton,
      match(props.type)
        .with("default", () => styles.buttonGhostNormal)
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

import { FlexRow, GrowItem } from "@/components/display/Flex";
import Dropdown, { DropDownProps } from "antd/lib/dropdown";
import classNames from "classnames";

import styles from "./styles.module.scss";
import { CSSProperties, useState } from "react";

import iconCheck from "@/assets/common/icon-check-blue.svg";

const CustomSelect = ({
  value,
  onChange,
  afterChange,
  options,
  disabled,
  placement,
  style,
  small,
  placeholder,
  dropdownStyle,
  highlight,
}: {
  value?: string;
  placeholder?: string;
  onChange?: (v: string) => void;
  afterChange?: (v: string) => void;
  options: Array<{
    label: string | JSX.Element;
    value: string;
  }>;
  disabled?: boolean;
  placement?: DropDownProps["placement"];
  style?: CSSProperties;
  dropdownStyle?: CSSProperties;
  highlight?: boolean;
  small?: boolean;
}) => {
  const [visible, setVisible] = useState(false);

  return (
    <Dropdown
      trigger={["click"]}
      placement={placement}
      onVisibleChange={(v) => setVisible(v)}
      visible={visible}
      overlay={
        <div
          className={classNames(
            styles.dropdown,
            highlight ? styles.highlight : ""
          )}
          style={dropdownStyle}
        >
          {options?.map((item) => {
            return (
              <FlexRow
                onClick={() => {
                  onChange?.(item.value);
                  setVisible(false);
                  afterChange?.(item.value);
                }}
                className={styles.item}
                key={item.value}
              >
                <GrowItem>{item.label}</GrowItem>
                {value === item.value && <img src={iconCheck} />}
              </FlexRow>
            );
          })}
        </div>
      }
    >
      <FlexRow
        center
        className={classNames(
          styles.select,
          disabled ? styles.disabled : "",
          visible ? styles.active : "",
          small ? styles.small : ""
        )}
        style={{
          width: 320,
          ...style,
        }}
      >
        <GrowItem>
          {options?.find((v) => v.value === value)?.label || (
            <span
              style={{
                color: "#9FA0A5",
              }}
            >
              {placeholder || "请选择"}
            </span>
          )}
        </GrowItem>
        <div className={styles.arrowDown} />
      </FlexRow>
    </Dropdown>
  );
};

export default CustomSelect;

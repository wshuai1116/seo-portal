import Avatar, { AvatarProps } from "antd/lib/avatar";
import { CSSProperties } from "react";
import { getUniqueColorByNumber } from "@/utils";

import styles from "./index.module.scss";
import { Tooltip } from "antd";

const TCAvatar = ({
  bgColor,
  textColor,
  icon,
  label,
  shape,
  size,
  className,
  id,
}: {
  bgColor?: string;
  textColor?: string;
  icon?: string;
  label?: string;
  shape?: AvatarProps["shape"];
  size?: number;
  className?: string;
  id?: number | string;
}) => {
  const formatLabel = (label: string) => {
    return label.substring(0, 1);
  };

  className = className ? className : "";
  const style: CSSProperties = {};
  if (!icon && label) {
    if (!bgColor) {
      bgColor = getUniqueColorByNumber(Number(id)).backgroundColor;
      style.backgroundColor = bgColor;
    }
    if (!textColor) {
      textColor = getUniqueColorByNumber(Number(id)).color;
      style.color = textColor;
    }
  }

  const finalShape = shape || "circle";
  const finalIcon = icon
    ? icon + "?x-oss-process=image/resize,m_fill,w_600"
    : null;

  return (
    <div className={styles.root}>
      <Tooltip title={label}>
        {icon ? (
          <Avatar
            shape={finalShape}
            src={finalIcon}
            size={size}
            style={style}
            className={className}
          />
        ) : (
          <div
            style={{
              width: size || 32,
              height: size || 32,
              borderRadius: 4,
              lineHeight: (size || 32) + "px",
              textAlign: "center",
              fontWeight: 600,
              ...style,
            }}
          >
            {label ? formatLabel(label) : ""}
          </div>
        )}
      </Tooltip>
    </div>
  );
};

export default TCAvatar;

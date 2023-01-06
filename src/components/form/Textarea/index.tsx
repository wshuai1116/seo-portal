import Input, { TextAreaProps } from "antd/lib/input";
import classNames from "classnames";

import styles from "./styles.module.scss";

const CustomTextarea = (
  props: TextAreaProps & {
    light?: boolean;
  }
) => (
  <Input.TextArea
    {...props}
    className={classNames(
      styles.textarea,
      styles.custom,
      props.light ? styles.light : "",
      props.className || ""
    )}
  />
);

export default CustomTextarea;

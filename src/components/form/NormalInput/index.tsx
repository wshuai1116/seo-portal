import Input, { InputProps } from "antd/lib/input";
import classNames from "classnames";
import { forwardRef } from "react";

import styles from "./styles.module.scss";

const CustomInput = forwardRef(
  (
    props: InputProps & {
      light?: boolean;
      small?: boolean;
      smaller?: boolean;
    },
    ref
  ) => {
    return (
      <Input
        ref={ref as any}
        {...props}
        className={classNames(
          styles.input,
          styles.custom,
          props.light ? styles.light : "",
          props.smaller ? styles.smaller : props.small ? styles.small : "",
          props.readOnly ? styles.readOnly : "",
          props.className || ""
        )}
      />
    );
  }
);

export default CustomInput;

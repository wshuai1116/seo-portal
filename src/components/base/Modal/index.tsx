import { FC } from "react";
import Modal, { ModalProps } from "antd/lib/modal";

import styles from "./styles.module.scss";
import classNames from "classnames";

const CustomModal: FC<ModalProps> = (props) => {
  return (
    <Modal
      {...props}
      forceRender={props.forceRender || true}
      bodyStyle={{
        paddingTop: 14,
      }}
      width={props.width || 400}
      className={classNames(styles.customModal, props.className || "")}
      footer={null}
    />
  );
};

export default CustomModal;

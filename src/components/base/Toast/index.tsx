import {
  ToastContainer,
  cssTransition,
  ToastContainerProps,
} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import styled from "styled-components";

const StyledContianer = styled(ToastContainer)`
  &&&.Toastify__toast-container {
  }
  .Toastify__toast {
    border-radius: 10px;
    min-height: initial;
    background: var(--notice-bg);
    color: var(--text-color-bold);
    padding: 0;
    font-size: 14px;
    line-height: 22px;

    /* filter: drop-shadow(0px 10px 30px rgba(0, 0, 0, 0.3))
      drop-shadow(0px 30px 50px rgba(0, 0, 0, 0.4)); */

    box-shadow: var(--notice-shadow);

    ::before {
      content: " ";
      display: inline-block;
      width: 4px;
    }

    &.Toastify__toast--success {
      ::before {
        background: #35bc6d;
      }
    }
    &.Toastify__toast--warning {
      ::before {
        background: #ffba00;
      }
    }
    &.Toastify__toast--error {
      ::before {
        background: #fb5d61;
      }
    }
  }
  .Toastify__close-button {
    display: none;
  }
  .Toastify__toast-icon {
    display: none;
  }
  .Toastify__toast-body {
    padding: 0;
    margin: 0;
  }
  .Toastify__progress-bar {
  }
`;

export const slide = cssTransition({
  enter: "slide-left",
  exit: "slide-right",
});

const Toast = (props: ToastContainerProps) => {
  return (
    <StyledContianer
      autoClose={3000}
      position="top-right"
      hideProgressBar={true}
      pauseOnHover
      transition={slide}
      {...props}
    />
  );
};

export default Toast;

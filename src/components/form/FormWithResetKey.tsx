import { useRef, useEffect, ReactNode, forwardRef } from "react";
import Form, { FormInstance, FormProps } from "antd/lib/form";

const FormWithResetKey = forwardRef<
  FormInstance,
  FormProps & {
    resetKey: any;
    children: ReactNode;
  }
>(({ children, resetKey, ...others }, ref) => {
  const formRef = useRef<FormInstance>(null);

  useEffect(() => {
    if (ref) {
      if (typeof ref === "function") {
        return;
      } else {
        ref.current?.resetFields();
      }
    } else {
      formRef.current?.resetFields();
    }
  }, [resetKey, ref]);

  return (
    <Form {...others} ref={ref || formRef}>
      {children}
    </Form>
  );
});

FormWithResetKey.displayName = "FormWithResetKey";

// function FormWithResetKey<Values>({
//   children,
//   ...others
// }: FormProps & {
//   children: ReactNode
//   ref?: RefObject<FormInstance<Values>> | undefined
//   resetKey: any
// }) {
//   const formRef = useRef<FormInstance>(null)

//   console.info(others)

//   useEffect(() => {
//     if (others.ref) {
//       others.ref.current?.resetFields()
//     } else {
//       formRef.current?.resetFields()
//     }
//   }, [others.resetKey, others.ref])

//   return (
//     <Form<Values> {...others} ref={others.ref || formRef}>
//       {children}
//     </Form>
//   )
// }

export default FormWithResetKey;

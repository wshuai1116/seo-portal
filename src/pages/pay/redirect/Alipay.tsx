import styled from "styled-components";
import { useEffect, useState } from "react";
import qs from "query-string";
import { getOrderStatus } from "@/query/subscription";

const PayRedirectAlipay = () => {
  useEffect(() => {
    const queryParams = qs.parse(window.location.search);
    const out_trade_no = queryParams["out_trade_no"] as string;
    if (!out_trade_no) {
      return;
    }
    getOrderStatus({
      orderId: out_trade_no,
    }).then(({ result }) => {
      if (result.status === "COMPLETED") {
        window.location.href = "/";
      }
    });
  }, []);

  return <></>;
};

export default PayRedirectAlipay;

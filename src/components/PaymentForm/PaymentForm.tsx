import React from "react";
import { Input, Card } from "antd";
import styles from "./PaymentForm.module.css";

export const PaymentForm = () => {
  // const {
  //   wrapperProps,
  //   getCardImageProps,
  //   getCardNumberProps,
  //   getExpiryDateProps,
  //   getCVCProps,
  // } = usePaymentInputs();

  return (
    <Card
      title="信用卡"
      bordered={false}
      className={styles["payment-credit-card"]}
    >
      {/* <PaymentInputsWrapper {...wrapperProps}>
        <svg {...getCardImageProps({ images })} />
        <input {...getCardNumberProps()} />
        <input {...getExpiryDateProps()} />
        <input {...getCVCProps()} />
      </PaymentInputsWrapper> */}
    </Card>
  )
}
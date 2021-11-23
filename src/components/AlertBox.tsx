import React from "react";

type Props = {
  message: string;
  type: "error" | "warning" | "info" | "success";
  active: boolean;
};

const AlertBox: React.FC<Props> = ({ message, type, active }) => {
  return <div className={`alert-box ${type} ${active ? "" : "disabled"}`}>{message}</div>;
};

export default AlertBox;

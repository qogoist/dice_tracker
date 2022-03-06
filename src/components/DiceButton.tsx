import React from "react";

import Button from "./Button";

type Props = {
  label: string;
  active?: boolean;
  handleChange: (e: React.FormEvent<HTMLButtonElement>) => void;
};

const DiceButton: React.FC<Props> = ({ label, active, handleChange }) => {
  return (
    <Button
      className={`btn dice-btn ${active ? "active" : ""}`}
      onClick={handleChange}
      value={label}
    >
      {label}
    </Button>
  );
};

export default DiceButton;

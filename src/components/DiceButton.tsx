import React from "react";

import Button from "./Button";

type Props = {
  label: string;
  handleChange: (e: React.FormEvent<HTMLButtonElement>) => void;
};

const DiceButton: React.FC<Props> = ({ label, handleChange }) => {
  return (
    <Button className="dice-btn btn" onClick={handleChange} value={label}>
      {label}
    </Button>
  );
};

export default DiceButton;

import React from "react";
import DiceCheckbox from "./DiceCheckbox";

type Props = {
  handleChange: (die: Dice, checked: boolean) => void;
};

const DicePicker: React.FC<Props> = ({ handleChange }) => {
  return (
    <div className="dice-grid">
      <DiceCheckbox die="D4" handleChange={handleChange} />
      <DiceCheckbox die="D6" handleChange={handleChange} />
      <DiceCheckbox die="D8" handleChange={handleChange} />
      <DiceCheckbox die="D10" handleChange={handleChange} />
      <DiceCheckbox die="D12" handleChange={handleChange} />
      <DiceCheckbox die="D20" handleChange={handleChange} />
      <DiceCheckbox die="D100" handleChange={handleChange} />
    </div>
  );
};

export default DicePicker;

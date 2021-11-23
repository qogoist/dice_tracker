import React from "react";
import DiceButton from "./DiceButton";

type Props = {
  dice: (Dice | "Overview")[];
  handleChange: (e: React.FormEvent<HTMLButtonElement>) => void;
};

const DynDicePicker: React.FC<Props> = ({ dice, handleChange }) => {
  return (
    <div className="dice-grid">
      {dice.map(die => (
        <DiceButton key={die} label={die} handleChange={handleChange} />
      ))}
    </div>
  );
};

export default DynDicePicker;

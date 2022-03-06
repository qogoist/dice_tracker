import React from "react";
import DiceButton from "./DiceButton";

type Props = {
  dice: (Dice | "Overview")[];
  active?: Dice | "Overview";
  handleChange: (e: React.FormEvent<HTMLButtonElement>) => void;
};

const DynDicePicker: React.FC<Props> = ({ dice, active, handleChange }) => {
  return (
    <div className="dice-grid">
      {dice.map(die => (
        <DiceButton
          key={die}
          label={die}
          active={active === die ? true : false}
          handleChange={handleChange}
        />
      ))}
    </div>
  );
};

export default DynDicePicker;

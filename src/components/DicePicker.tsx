import React from "react";
import { AllDice } from "../helper/globals";
import DiceCheckbox from "./DiceCheckbox";

type Props = {
  handleChange: (die: Dice, checked: boolean) => any;
  checkedDice?: Dice[];
};

const DicePicker: React.FC<Props> = ({ handleChange, checkedDice }) => {
  return (
    <div className="dice-grid">
      {AllDice.map(die => (
        <DiceCheckbox
          key={die}
          die={die as Dice}
          check={checkedDice?.includes(die as Dice)}
          handleChange={handleChange}
        />
      ))}
    </div>
  );
};

export default DicePicker;

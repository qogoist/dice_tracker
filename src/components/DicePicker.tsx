import React from "react";
import DiceCheckbox from "./DiceCheckbox";

type Props = {
  handleChange: (die: Dice, checked: boolean) => any;
  checkedDice?: Dice[];
};

const DicePicker: React.FC<Props> = ({ handleChange, checkedDice }) => {
  return (
    <div className="dice-grid">
      {["D4", "D6", "D8", "D10", "D12", "D20", "D100"].map(die => (
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

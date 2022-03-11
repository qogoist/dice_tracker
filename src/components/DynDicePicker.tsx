import React, { useEffect } from "react";
import { sortDice } from "../helper/sortDice";
import DiceButton from "./DiceButton";

type Props = {
  dice: (Dice | "Overview")[];
  active?: Dice | "Overview";
  sort?: DiceSortMethods;
  handleChange: (e: React.FormEvent<HTMLButtonElement>) => any;
};

const DynDicePicker: React.FC<Props> = ({ dice, active, sort, handleChange }) => {
  return (
    <div className="dice-grid">
      {dice
        .sort((a, b) => sortDice(a, b, sort ? sort : "desc"))
        .map(die => (
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

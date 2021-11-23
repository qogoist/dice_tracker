import React from "react";
import DiceButton from "./DiceButton";

type Props = {
  die: number;
  hndClick: (e: React.FormEvent) => void;
};

const NumberGrid: React.FC<Props> = ({ die, hndClick }) => {
  return (
    <div className="dice-grid">
      {[...Array(die)].map((x, i) => (
        <DiceButton key={i + 1} label={`${i + 1}`} handleChange={hndClick} />
      ))}
    </div>
  );
};

export default NumberGrid;

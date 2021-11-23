import React from "react";

type Props = {
  dice: (Dice | "Overview")[];
  active: Dice | "Overview";
  handleChange: (e: React.FormEvent<HTMLSelectElement>) => void;
};

const StatSelector: React.FC<Props> = ({ dice, active, handleChange }) => {
  return (
    <select name="stat-selection" className="stat-selection" onChange={handleChange} value={active}>
      {dice.map(die => (
        <option value={die} key={die}>
          {die}
        </option>
      ))}
    </select>
  );
};

export default StatSelector;

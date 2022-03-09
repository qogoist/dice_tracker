import React, { useEffect, useState } from "react";

type Props = {
  die: Dice;
  check?: boolean;
  handleChange: (die: Dice, checked: boolean) => boolean;
};

const DiceCheckbox: React.FC<Props> = ({ die, check, handleChange }) => {
  const [checked, setChecked] = useState<boolean>(false);

  useEffect(() => {
    if (check) setChecked(true);
  }, [check]);

  const onCheck = async () => {
    const success = await handleChange(die, !checked);
    if (success) setChecked(!checked);
  };

  return (
    <div className="grid-item">
      <input
        className="dice-box-check"
        type="checkbox"
        name={die}
        id={die}
        checked={checked}
        onClick={onCheck}
        readOnly={true}
      />
      <label
        className="btn dice-box-label"
        htmlFor={die}
        onKeyPress={e => e.key === "Enter" && e.currentTarget.click()}
        tabIndex={0}
      >
        {die}
      </label>
    </div>
  );
};

export default DiceCheckbox;

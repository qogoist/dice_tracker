import React from "react";

type Props = {
  checked: boolean;
  setChecked: (c: boolean) => void;
};

const NavMenuBtn: React.FC<Props> = ({ checked, setChecked }) => {
  return (
    <>
      <input
        type="checkbox"
        name="nav-toggle"
        id="nav-toggle"
        className="nav-toggle"
        checked={checked}
        onClick={() => setChecked(!checked)}
        readOnly={true}
      />
      <label
        htmlFor="nav-toggle"
        className="nav-toggle-label"
        tabIndex={0}
        onKeyPress={e => e.key === "Enter" && setChecked(!checked)}
      >
        <span></span>
      </label>
    </>
  );
};

export default NavMenuBtn;

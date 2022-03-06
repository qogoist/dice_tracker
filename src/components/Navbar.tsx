import React, { useState } from "react";
import NavContainer from "./NavContainer";
import NavLogo from "./NavLogo";
import NavMenuBtn from "./NavMenuBtn";

const Navbar: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <header>
      <NavLogo />
      <NavMenuBtn checked={open} setChecked={setOpen} />
      <NavContainer setOpen={setOpen} />
    </header>
  );
};

//TODO: Add Navigation back to running session
//TODO: Resume previously ended session
//TODO: Delete sessions

export default Navbar;

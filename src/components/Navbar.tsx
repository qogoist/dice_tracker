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

export default Navbar;

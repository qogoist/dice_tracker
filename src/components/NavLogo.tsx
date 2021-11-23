import React from "react";
import { Link } from "react-router-dom";

const NavLogo: React.FC = () => {
  return (
    <Link className="logo" to="..">
      DiceTracker
    </Link>
  );
};

export default NavLogo;

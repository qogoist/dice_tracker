import React from "react";
import { NavLink } from "react-router-dom";
import NavItem from "./NavItem";
import SignoutBtn from "./SignoutBtn";

type Props = {
  setOpen: (e: boolean) => void;
};

const NavContainer: React.FC<Props> = ({ setOpen }) => {
  const closeNav = () => {
    setOpen(false);
  };

  return (
    <nav>
      <ul>
        <NavItem>
          <NavLink to="/new-session" className="nav-link" onClick={closeNav}>
            New Session
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/stats" className="nav-link" onClick={closeNav}>
            Stats
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/settings" className="nav-link" onClick={closeNav}>
            Settings
          </NavLink>
        </NavItem>
        <NavItem>
          <SignoutBtn />
        </NavItem>
      </ul>
    </nav>
  );
};

export default NavContainer;

import React from "react";
import Icon from "../Icon";

const Navbar = () => {
  return (
    <div className="navbar">
      <Icon iconName="AiOutlineHome" link="/home" />
      <Icon iconName="AiOutlineSearch" />
      <Icon iconName="AiOutlinePlusCircle" link="/add" />
      <Icon iconName="AiTwotoneExperiment" link="/tests" />
      <Icon iconName="AiOutlineHeart" link="/favorites" />
    </div>
  );
};

export default Navbar;

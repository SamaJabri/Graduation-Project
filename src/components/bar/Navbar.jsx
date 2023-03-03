import React, { useState } from "react";
import Icon from "../Icon";
import Search from "../Search";

const Navbar = () => {
  const [showSearch, setShowSearch] = useState(false);

  const showSearchBar = (e) => {
    e.preventDefault();

    setShowSearch((showSearch) => !showSearch);
  };

  return (
    <div className="navbar">
      <Icon iconName="AiOutlineHome" link="/home" />
      <Icon iconName="AiOutlineSearch" onClick={showSearchBar} />
      <Icon iconName="AiOutlinePlusCircle" link="/add" />
      <Icon iconName="AiTwotoneExperiment" link="/tests" />
      <Icon iconName="AiOutlineHeart" link="/favorites" />{" "}
      {showSearch && <Search />}
    </div>
  );
};

export default Navbar;

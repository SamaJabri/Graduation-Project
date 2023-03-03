import React from "react";
import Icon from "./Icon";

const Search = () => {
const handleSearch = (e) => {

}

  return (
    <div className="search">
      <Icon iconName="AiOutlineSearch" onClick={handleSearch} />
      <input placeholder="Search" type="search" className="search__field" />
    </div>
  );
};

export default Search;

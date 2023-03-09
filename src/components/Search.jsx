import React, { useState } from "react";

import { examinations } from "../assets/utility-functions";

import Icon from "./Icon";

const Search = () => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (e) => {
    setSearchValue(e.target.value);

    console.log(
      examinations.filter((examination) =>
        examination.name.toLowerCase().includes(searchValue.toLowerCase())
      )
    );
  };

  return (
    <div className="search">
      <Icon iconName="AiOutlineSearch" onClick={handleSearch} />
      <input
        placeholder="Search"
        type="search"
        className="search__field"
        onChange={handleSearch}
      />
    </div>
  );
};

export default Search;

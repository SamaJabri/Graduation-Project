import React, { useState } from "react";
import { INIT_UNIQUE_EXAMINATIONS } from "../assets/utility-functions";
import useExaminationStore from "../store/examination/examination-store";

import Icon from "./Icon";

const Search = () => {
  const [searchValue, setSearchValue] = useState("");

  const getCurrentPatientExaminations = useExaminationStore(
    (state) => state.getCurrentPatientExaminations
  );

  const [uniqueExaminations, setUniqueExamination] = useState(
    INIT_UNIQUE_EXAMINATIONS(getCurrentPatientExaminations())
  );

  const handleSearch = (e) => {
    setSearchValue(e.target.value);

    setUniqueExamination(
      getCurrentPatientExaminations().filter((examination) =>
        examination.name.toLowerCase().includes(searchValue.toLowerCase())
      )
    );

    console.log(uniqueExaminations);
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

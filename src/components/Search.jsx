import React, { useState } from "react";
import useExaminationStore from "../store/examination/examination-store";
import useLaboratoryStore from "../store/laboratory/laboratory-store";
import usePatientsStore from "../store/patient/patients-store";
import Icon from "./Icon";

const Search = () => {
  const getCurrentPatientExaminations = useExaminationStore(
    (state) => state.getCurrentPatientExaminations
  );
  const currentPatient = usePatientsStore((state) => state.currentPatient);
  const getSamples = useLaboratoryStore((state) => state.getSamples);

  const examinations = getCurrentPatientExaminations(
    getSamples(currentPatient.id)
  );

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

import React, { useEffect, useState } from "react";

import useExaminationStore from "../store/examination/examination-store";
import { examinationVariables } from "../assets/utility-functions";

import ExaminationBubble from "../components/examination/ExaminationBubble";

const Home = () => {
  const getCurrentPatientExaminations = useExaminationStore(
    (state) => state.getCurrentPatientExaminations
  );
  const filterUniqueExaminations = useExaminationStore(
    (state) => state.filterUniqueExaminations
  );
  const filteredExaminations = useExaminationStore(
    (state) => state.filteredExaminations
  );

  const [viewType, setViewType] = useState("All");

  examinationVariables(getCurrentPatientExaminations());

  useEffect(() => filterUniqueExaminations(viewType), [viewType]);

  return (
    <div className="home">
      <div className="home__header">
        <h2>Your Health</h2>
        <div className="home__filters">
          <button
            id={viewType === "All" && "active-button"}
            onClick={() => setViewType("All")}
          >
            All
          </button>
          <button
            id={viewType === "Normal" && "active-button"}
            onClick={() => setViewType("Normal")}
          >
            Normal
          </button>
          <button
            id={viewType === "Abnormal" && "active-button"}
            onClick={() => setViewType("Abnormal")}
          >
            Abnormal
          </button>
        </div>
      </div>
      <div className="home__exams">
        {filteredExaminations.map(({ id, name }) => (
          <ExaminationBubble key={id} data={window[name]} name={name} id={id} />
        ))}
      </div>
    </div>
  );
};

export default Home;

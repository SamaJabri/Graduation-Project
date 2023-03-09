import React, { useState } from "react";

import useExaminationStore from "../store/examination/examination-store";
import {
  INIT_UNIQUE_EXAMINATIONS,
  examinationVariables,
} from "../assets/utility-functions";

import ExaminationBubble from "../components/examination/ExaminationBubble";

const Home = () => {
  const getCurrentPatientExaminations = useExaminationStore(
    (state) => state.getCurrentPatientExaminations
  );

  // Patient will have multiple data for same examination.
  // Here will filter to show only one bubble with his data.
  const [uniqueExaminations, setUniqueExamination] = useState(
    INIT_UNIQUE_EXAMINATIONS(getCurrentPatientExaminations())
  );

  const [viewType, setViewType] = useState("All");

  const showAllResults = () => {
    setViewType("All");
    setUniqueExamination(
      INIT_UNIQUE_EXAMINATIONS(getCurrentPatientExaminations())
    );
  };

  const showNormalResults = () => {
    setViewType("Normal");
    setUniqueExamination(() =>
      INIT_UNIQUE_EXAMINATIONS(getCurrentPatientExaminations()).filter(
        ({ result, starting_normal_range, ending_normal_range }) =>
          result >= starting_normal_range && result <= ending_normal_range
      )
    );
  };

  const showAbnormalResults = () => {
    setViewType("Abnormal");
    setUniqueExamination(() =>
      INIT_UNIQUE_EXAMINATIONS(getCurrentPatientExaminations()).filter(
        ({ result, starting_normal_range, ending_normal_range }) =>
          result < starting_normal_range || result > ending_normal_range
      )
    );
  };

  examinationVariables(getCurrentPatientExaminations());

  return (
    <div className="home">
      <div className="home__header">
        <h2>Your Health</h2>
        <div className="home__filters">
          <button
            id={viewType === "All" && "active-button"}
            onClick={showAllResults}
          >
            All
          </button>
          <button
            id={viewType === "Normal" && "active-button"}
            onClick={showNormalResults}
          >
            Normal
          </button>
          <button
            id={viewType === "Abnormal" && "active-button"}
            onClick={showAbnormalResults}
          >
            Abnormal
          </button>
        </div>
      </div>
      <div className="home__exams">
        {uniqueExaminations.map(({ id, name }) => (
          <ExaminationBubble key={id} data={window[name]} name={name} id={id} />
        ))}
      </div>
    </div>
  );
};

export default Home;

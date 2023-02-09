import React, { useState } from "react";
import ExaminationBubble from "../components/examination/ExaminationBubble";

import examinations from "../store/examination/examinations";

const Home = () => {
  // Remove duplicate examinations for home bubbles view
  const INIT_UNIQUE_EXAMINATIONS = Array.from(
    new Set(examinations.map((examination) => examination.name))
  ).map((name) =>
    examinations.find((examination) => examination.name === name)
  );

  const [uniqueExaminations, setUniqueExamination] = useState(
    INIT_UNIQUE_EXAMINATIONS
  );

  const [viewType, setViewType] = useState("All");

  // Get the data related to a certain examination
  const getExaminationData = (examinationName) =>
    examinations.filter(
      ({ date, name }) =>
        name.toUpperCase() === examinationName && { date, name }
    );

  // Filter the important data for graph view (date & name)
  const graphData = (examinationName) =>
    getExaminationData(examinationName).map(({ date, result }) => ({
      date,
      result,
    }));

  // Create examination variables for graph use
  let examinationVariables = examinations.map(
    (examination) => (window[examination.name] = graphData(examination.name))
  );

  const showAllResults = () => {
    setViewType("All");
    setUniqueExamination(INIT_UNIQUE_EXAMINATIONS);
  };

  const showNormalResults = () => {
    setViewType("Normal");
    setUniqueExamination(() =>
      INIT_UNIQUE_EXAMINATIONS.filter(
        ({ result, starting_normal_range, ending_normal_range }) =>
          result >= starting_normal_range && result <= ending_normal_range
      )
    );
  };

  const showAbnormalResults = () => {
    setViewType("Abnormal");
    setUniqueExamination(() =>
      INIT_UNIQUE_EXAMINATIONS.filter(
        ({ result, starting_normal_range, ending_normal_range }) =>
          result < starting_normal_range || result > ending_normal_range
      )
    );
  };

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

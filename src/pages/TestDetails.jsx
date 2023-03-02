import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Table from "../components/examination/Table";

import useExaminationStore from "../store/examination/examination-store";

const TestDetails = () => {
  const { id } = useParams();

  // Cast id from String to Int for comparison
  const idToInteger = parseInt(id);

  const getASampleExaminations = useExaminationStore(
    (state) => state.getASampleExaminations
  );

  const [sampleExamination, setSampleExamination] = useState(
    getASampleExaminations(idToInteger)
  );

  const [viewType, setViewType] = useState("All");

  const showAllResults = () => {
    setViewType("All");
    setSampleExamination(getASampleExaminations(idToInteger));
  };

  const showNormalResults = () => {
    setViewType("Normal");

    setSampleExamination(() =>
      getASampleExaminations(idToInteger).filter(
        ({ result, starting_normal_range, ending_normal_range }) =>
          result >= starting_normal_range && result <= ending_normal_range
      )
    );
  };

  const showAbnormalResults = () => {
    setViewType("Abnormal");

    setSampleExamination(() =>
      getASampleExaminations(idToInteger).filter(
        ({ result, starting_normal_range, ending_normal_range }) =>
          result < starting_normal_range || result > ending_normal_range
      )
    );
  };

  return (
    <div className="test-details">
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
      {
        <Table
          rows={["Examination", "Result", "Unit", "Reference Values"]}
          data={sampleExamination}
        />
      }
    </div>
  );
};

export default TestDetails;

import React, { useState } from "react";
import ExaminationBubble from "../components/examination/ExaminationBubble";

import {
  INIT_UNIQUE_EXAMINATIONS,
  examinationVariables,
} from "../assets/utility-functions";

import useExaminationStore from "../store/examination/examination-store";
import usePatientsStore from "../store/patient/patients-store";
import useLaboratoryStore from "../store/laboratory/laboratory-store";

const Home = () => {
  const getCurrentPatientExaminations = useExaminationStore(
    (state) => state.getCurrentPatientExaminations
  );
  const currentPatient = usePatientsStore((state) => state.currentPatient);
  const getSamples = useLaboratoryStore((state) => state.getSamples);

  const examinations = getCurrentPatientExaminations(
    getSamples(currentPatient.id)
  );

  const [uniqueExaminations, setUniqueExamination] = useState(
    INIT_UNIQUE_EXAMINATIONS(examinations)
  );

  const [viewType, setViewType] = useState("All");

  const showAllResults = () => {
    setViewType("All");
    setUniqueExamination(INIT_UNIQUE_EXAMINATIONS(examinations));
  };

  const showNormalResults = () => {
    setViewType("Normal");
    setUniqueExamination(() =>
      INIT_UNIQUE_EXAMINATIONS(examinations).filter(
        ({ result, starting_normal_range, ending_normal_range }) =>
          result >= starting_normal_range && result <= ending_normal_range
      )
    );
  };

  const showAbnormalResults = () => {
    setViewType("Abnormal");
    setUniqueExamination(() =>
      INIT_UNIQUE_EXAMINATIONS(examinations).filter(
        ({ result, starting_normal_range, ending_normal_range }) =>
          result < starting_normal_range || result > ending_normal_range
      )
    );
  };

  examinationVariables(examinations);

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

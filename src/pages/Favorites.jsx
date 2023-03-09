import React, { useState } from "react";

import useExaminationStore from "../store/examination/examination-store";
import {
  INIT_UNIQUE_EXAMINATIONS,
  examinationVariables,
} from "../assets/utility-functions";

import ExaminationBubble from "../components/examination/ExaminationBubble";

const Favorites = () => {
  const getCurrentPatientExaminations = useExaminationStore(
    (state) => state.getCurrentPatientExaminations
  );
  // Patient will have multiple data for same examination.
  // Here will filter to show only one bubble with his data.
  const [uniqueExaminations, setUniqueExamination] = useState(
    INIT_UNIQUE_EXAMINATIONS(getCurrentPatientExaminations())
  );

  const getFavorites = uniqueExaminations.filter(
    (examination) => examination.isFavorite
  );

  examinationVariables(getCurrentPatientExaminations());

  return (
    <div className="home">
      <div className="home__exams">
        {getFavorites.map(({ id, name }) => (
          <ExaminationBubble key={id} data={window[name]} name={name} id={id} />
        ))}
      </div>
    </div>
  );
};

export default Favorites;

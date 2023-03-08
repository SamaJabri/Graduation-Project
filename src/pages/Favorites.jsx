import React, { useState } from "react";

import {
  INIT_UNIQUE_EXAMINATIONS,
  examinationVariables,
  examinations,
} from "../assets/utility-functions";

import ExaminationBubble from "../components/examination/ExaminationBubble";

const Favorites = () => {
  // Patient will have multiple data for same examination.
  // Here will filter to show only one bubble with his data.
  const [uniqueExaminations, setUniqueExamination] = useState(
    INIT_UNIQUE_EXAMINATIONS(examinations)
  );

  const getFavorites = uniqueExaminations.filter(
    (examination) => examination.isFavorite
  );

  examinationVariables(examinations);

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

import React, { useState } from "react";
import ExaminationBubble from "../components/examination/ExaminationBubble";

import useExaminationStore from "../store/examination/examination-store";
import {
  INIT_UNIQUE_EXAMINATIONS,
  examinationVariables,
} from "../assets/utility-functions";

const Favorites = () => {
  const examinations = useExaminationStore((state) => state.examinations);

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

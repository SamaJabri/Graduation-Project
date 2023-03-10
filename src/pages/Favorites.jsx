import React, { useEffect } from "react";

import useExaminationStore from "../store/examination/examination-store";
import { examinationVariables } from "../assets/utility-functions";

import ExaminationBubble from "../components/examination/ExaminationBubble";

const Favorites = () => {
  const getCurrentPatientExaminations = useExaminationStore(
    (state) => state.getCurrentPatientExaminations
  );
  const favoriteExaminations = useExaminationStore(
    (state) => state.favoriteExaminations
  );
  const getFavorites = useExaminationStore((state) => state.getFavorites);

  useEffect(() => getFavorites(), []);

  examinationVariables(getCurrentPatientExaminations());

  return (
    <div className="home">
      <div className="home__exams">
        {favoriteExaminations.map(({ id, name }) => (
          <ExaminationBubble key={id} data={window[name]} name={name} id={id} />
        ))}
      </div>
    </div>
  );
};

export default Favorites;

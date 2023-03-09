import React, { useState } from "react";

import useExaminationStore from "../store/examination/examination-store";
import usePatientsStore from "../store/patient/patients-store";
import useLaboratoryStore from "../store/laboratory/laboratory-store";
import {
  INIT_UNIQUE_EXAMINATIONS,
  examinationVariables,
} from "../assets/utility-functions";

import ExaminationBubble from "../components/examination/ExaminationBubble";

const Favorites = () => {
  // Get data (examinations) related to single (logged in) patient
  // Used in Home, Favorites, and Examination pages
  const currentPatient = usePatientsStore((state) => state.currentPatient);
  const getSamples = useLaboratoryStore((state) => state.getSamples);

  const getCurrentPatientExaminations = useExaminationStore(
    (state) => state.getCurrentPatientExaminations
  );

  const samples = getSamples(currentPatient.id);

  // Patient will have multiple data for same examination.
  // Here will filter to show only one bubble with his data.
  const [uniqueExaminations, setUniqueExamination] = useState(
    INIT_UNIQUE_EXAMINATIONS(getCurrentPatientExaminations(samples))
  );

  const getFavorites = uniqueExaminations.filter(
    (examination) => examination.isFavorite
  );

  examinationVariables(getCurrentPatientExaminations(samples));

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

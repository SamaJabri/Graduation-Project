import React, { useState } from "react";
import { useParams } from "react-router-dom";

import useExaminationStore from "../store/examination/examination-store";
import useLaboratoryStore from "../store/laboratory/laboratory-store";
import usePatientsStore from "../store/patient/patients-store";
import {
  examinationVariables,
  getExaminationData,
} from "../assets/utility-functions";

import ExaminationInfo from "../components/examination/ExaminationInfo";
import Graph from "../components/examination/Graph";
import Table from "../components/examination/Table";

const Examination = () => {
  const [viewType, setViewType] = useState("Graph");

  const { id } = useParams();

  // Get current mode to decide graph color
  const darkMode = usePatientsStore((state) => state.darkMode);

  // Get data (examinations) related to single (logged in) patient
  // Used in Home, Favorites, and Examination pages
  const currentPatient = usePatientsStore((state) => state.currentPatient);
  const getSamples = useLaboratoryStore((state) => state.getSamples);

  const getCurrentPatientExaminations = useExaminationStore(
    (state) => state.getCurrentPatientExaminations
  );

  const samples = getSamples(currentPatient.id);

  // Get the name of examination from store
  const [{ name: examinationName }] = getCurrentPatientExaminations(
    samples
  ).filter((examination) => examination.id === Number(id));

  // Get data for table view
  const examinationInfo = getExaminationData(
    getCurrentPatientExaminations(samples),
    examinationName
  );

  // Get JSON data related to examination (about, low, & high values)
  const examinationData = examinationInfo.filter(
    (examination) =>
      examination.name.toUpperCase() === examinationName.toUpperCase()
  )[0];

  examinationVariables(getCurrentPatientExaminations(samples));

  return (
    <div className="examination">
      <div className="examination__view-options">
        <button
          onClick={() => setViewType("Graph")}
          id={viewType === "Graph" && "active-button"}
        >
          Graph
        </button>
        <button
          onClick={() => setViewType("Table")}
          id={viewType === "Table" && "active-button"}
        >
          Table
        </button>
      </div>

      <div
        className="examination__view"
        style={{
          height: `${viewType === "Table" ? "auto" : "17rem"}`,
        }}
      >
        {viewType === "Graph" ? (
          <Graph
            data={window[examinationName]}
            color={darkMode ? "white" : "#218d87"}
            leftMargin={-26}
          />
        ) : (
          <Table
            rows={["Date", "Result", "Unit", "Reference Values"]}
            orderedRows={[0, 1]}
            data={examinationInfo}
          />
        )}
      </div>

      <div className="examination__info">
        <ExaminationInfo
          title={`About ${examinationName}`}
          explaination={examinationData?.about}
        />
        <ExaminationInfo
          title="Less than normal"
          explaination={examinationData?.low}
        />
        <ExaminationInfo
          title="Higher than normal"
          explaination={examinationData?.high}
        />
      </div>

      <div className="examination__warning">
        <p>
          Info provided here is not for medical reference, contact your health
          care provider
        </p>
      </div>
    </div>
  );
};

export default Examination;

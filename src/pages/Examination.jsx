import React, { useState } from "react";

import ExaminationInfo from "../components/examination/ExaminationInfo";
import examinationInfo from "../store/examination/examinations-info.json";
import examinations from "../store/examination/examinations";

import { useParams } from "react-router-dom";

import Graph from "../components/examination/Graph";
import Table from "../components/examination/Table";
import usePatientsStore from "../store/patient/patients-store";

const Examination = () => {
  const [viewType, setViewType] = useState("Graph");

  const { id } = useParams();

  // Get current mode to decide graph color
  const darkMode = usePatientsStore((state) => state.darkMode);

  // Get the name of examination from store
  const [{ name: examinationName }] = examinations.filter(
    (examination) => examination.id === Number(id)
  );

  // Get JSON data related to examination
  const examinationData = examinationInfo.filter(
    (examination) =>
      examination.name.toUpperCase() === examinationName.toUpperCase()
  )[0];

  // Examination data
  const examination = examinations.filter(
    ({ date, name }) =>
      name.toUpperCase() === examinationName.toUpperCase() && { date, name }
  );

  // Extract what's important for graph showing
  const graphData = examination.map(({ date, result }) => ({ date, result }));

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
            data={graphData}
            color={darkMode ? "white" : "#218d87"}
            leftMargin={-26}
          />
        ) : (
          <Table
            rows={["Date", "Result", "Unit", "Reference Values"]}
            orderedRows={[0, 1]}
            data={examination}
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

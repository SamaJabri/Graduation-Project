import React from "react";
import ExaminationBubble from "../components/examination/ExaminationBubble";

import examinations from "../store/examination/examinations";

const Home = () => {
  /*   const data = [
    { date: "Jan, 2022", result: 5.5 },
    { date: "July, 2022", result: 5.0 },
    { date: "Jan, 2023", result: 5.3 },
    { date: "Jan, 2023", result: 5.3 },
  ];

  const data2 = [
    { date: "Jan, 2022", result: 8.5 },
    { date: "July, 2022", result: 7.9 },
    { date: "Jan, 2023", result: 7.8 },
    { date: "Jan, 2023", result: 8.3 },
  ];

  const data3 = [
    { date: "Jan, 2022", result: 10.5 },
    { date: "July, 2022", result: 10.0 },
    { date: "Jan, 2023", result: 11.3 },
    { date: "Jan, 2023", result: 11.3 },
  ]; */

  // graphData
  const getExaminationData = (examinationName) =>
    examinations
      .filter(
        ({ date, name }) =>
          name.toUpperCase() === examinationName && { date, name }
      )
      .map(({ date, result }) => ({ date, result }));

  // Create examination variables
  let d = examinations.map(
    (examination) =>
      (window[examination.name] = getExaminationData(examination.name))
  );

  //d = Array.from(new Set(d.map(JSON.stringify)), JSON.parse);

  // [{mcv}, {mcv}, {mchc}, {rbc}, {plt}, {rdw}]
  // [[{mcv}], [{mchc}], [{rbc}], [{plt}], [{rdw}]]

  console.log(d);

  /*   const MCV = getExaminationData("MCV");
  const mch = getExaminationData("MCH");
  const mchc = getExaminationData("MCHC");
  const plt = getExaminationData("PLT");
  const wbc = getExaminationData("WBC");
  const rdw = getExaminationData("RDW");
  const rbc = getExaminationData("RBC"); */

  return (
    <div className="home">
      <div className="home__header">
        <h2>Your Health</h2>
        <div className="home__filters">
          <button>All</button>
          <button>Normal</button>
          <button>Abnormal</button>
        </div>
      </div>
      <div className="home__exams">
        {examinations.map(({ id, name }) => (
          <ExaminationBubble key={id} data={window[name]} name={name} id={id} />
        ))}
      </div>
    </div>
  );
};

export default Home;

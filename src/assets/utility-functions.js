// Remove duplicate examinations for home bubbles view
const INIT_UNIQUE_EXAMINATIONS = (examinations) =>
  Array.from(new Set(examinations.map((examination) => examination.name))).map(
    (name) => examinations.find((examination) => examination.name === name)
  );

// Get the data related to a certain examination
const getExaminationData = (examinations, examinationName) =>
  examinations.filter(
    ({ date, name }) => name.toUpperCase() === examinationName && { date, name }
  );

// Filter the important data for graph view (date & name)
const graphData = (examinations, examinationName) =>
  getExaminationData(examinations, examinationName).map(({ date, result }) => ({
    date,
    result,
  }));

// Create examination variables for graph use
let examinationVariables = (examinations) =>
  examinations.map(
    (examination) =>
      (window[examination.name] = graphData(examinations, examination.name))
  );

export {
  INIT_UNIQUE_EXAMINATIONS,
  getExaminationData,
  graphData,
  examinationVariables,
};

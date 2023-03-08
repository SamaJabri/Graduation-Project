import useLaboratoryStore from "../store/laboratory/laboratory-store";
import usePatientsStore from "../store/patient/patients-store";

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

// Upload image to Cloudinary
const saveToCloudinary = (file, folderName, extraTasks) => {
  alert("Please Wait");

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "xts9tly0");
  formData.append("folder", folderName);

  fetch("https://api.cloudinary.com/v1_1/df9xmfkp1/image/upload", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      alert("Image uploaded successfully: ", data.url);
      extraTasks();
    })
    .catch((error) => alert("Sorry, an error occured:", error));
};

// Get data (examinations) related to single (logged in) patient
// Used in Home, Favorites, and Examination pages
const getCurrentPatientExaminations = useExaminationStore(
  (state) => state.getCurrentPatientExaminations
);
const currentPatient = usePatientsStore((state) => state.currentPatient);
const getSamples = useLaboratoryStore((state) => state.getSamples);

const examinations = getCurrentPatientExaminations(
  getSamples(currentPatient.id)
);

export {
  INIT_UNIQUE_EXAMINATIONS,
  getExaminationData,
  graphData,
  examinationVariables,
  saveToCloudinary,
  examinations,
};

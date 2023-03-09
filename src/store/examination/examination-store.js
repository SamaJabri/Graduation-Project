import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { INIT_UNIQUE_EXAMINATIONS } from "../../assets/utility-functions";
import useLaboratoryStore from "../laboratory/laboratory-store";
import usePatientsStore from "../patient/patients-store";

import INIT_EXAMINATIONS from "./examinations";

// Get data (examinations) related to single (logged in) patient
// Used in Home, Favorites, and Examination pages
const currentPatient = usePatientsStore.getState().currentPatient;
const getSamples = useLaboratoryStore.getState().getSamples;

const useExaminationStore = create(
  persist(
    (set, get) => ({
      examinations: INIT_EXAMINATIONS,

      addExamination: (examination) =>
        set((state) => ({
          examinations: [examination, ...state.examinations],
        })),

      removeExamination: (examId) =>
        set((state) => ({
          examinations: state.examinations.filter(
            (examination) => examination.id !== examId
          ),
        })),

      toggleIsFavoriteExamination: (examId) =>
        set({
          examinations: get().examinations.map((examination) =>
            examination.id === examId
              ? {
                  ...examination,
                  isFavorite: !examination.isFavorite,
                }
              : examination
          ),
        }),

      // Get currentPatientExaminations (Home page)
      getCurrentPatientExaminations: () => {
        const wantedIds = getSamples(currentPatient.id).map(
          (sample) => sample.sample_id
        );

        return get().examinations.filter((examination) =>
          wantedIds.includes(examination.sample_id)
        );
      },

      // Get all examinations for a certain sample (TestDetails Page)
      getASampleExaminations: (id) =>
        get().examinations.filter(
          (examination) => examination.sample_in_lab_id === id
        ),
    }),
    {
      name: "examinations",
    }
  )
);

export default useExaminationStore;

import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

import INIT_EXAMINATIONS from "./examinations";

const useExaminationStore = create(
  persist(
    (set, get) => ({
      examinations: INIT_EXAMINATIONS,

      addExamination: (examination) => {
        set((state) => ({
          examinations: [examination, ...state.examinations],
        }));
      },

      removeExamination: (examId) => {
        set((state) => ({
          examinations: state.examinations.filter(
            (examination) => examination.id !== examId
          ),
        }));
      },

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
      getCurrentPatientExaminations: (samples) => {
        const wantedIds = samples.map((sample) => sample.sample_id);

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

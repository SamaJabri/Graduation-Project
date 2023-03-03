import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

import INIT_EXAMINATIONS from "./examinations";

const examinationStore = (set, get) => ({
  examinations: INIT_EXAMINATIONS,

  addExamination: (examination) => {
    set((state) => ({
      examinations: [examination, ...state.examinations],
    }));
  },

  removeExmamination: (examId) => {
    set((state) => ({
      examinations: state.examinations.filter(
        (examination) => examination.id !== examId
      ),
    }));
  },

  updateExamination: (examId, isFavorite) =>
    set((state) => ({
      examinations: state.examinations.map((examination) =>
        examination.id === examId
          ? {
              ...examination,
              isFavorite: isFavorite,
            }
          : examination
      ),
    })),
});

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

      toggleIsFavoriteExamination: (examId) => {
        console.log(examId);
        console.log(
          get().examinations.map((examination) => {
            if (examination.id === examId) {
              console.log("hi");

              return {
                ...examination,
                isFavorite: !examination.isFavorite,
              };
            } else {
              return examination;
            }
          })
        );
        set({
          examinations: get().examinations.map((examination) =>
            examination.id === examId
              ? {
                  ...examination,
                  isFavorite: !examination.isFavorite,
                }
              : examination
          ),
        });
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

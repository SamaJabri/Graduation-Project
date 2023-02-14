import create from "zustand";
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
  devtools(
    persist(examinationStore, {
      name: "examinations",
      getStorage: () => sessionStorage,
    })
  )
);

export default useExaminationStore;

import { create } from "zustand";
import { persist } from "zustand/middleware";

import useLaboratoryStore from "../laboratory/laboratory-store";
import usePatientsStore from "../patient/patients-store";

import INIT_EXAMINATIONS from "./examinations";

const useExaminationStore = create(
  persist(
    (set, get) => ({
      examinations: INIT_EXAMINATIONS,

      filteredExaminations: [],
      favoriteExaminations: [],

      // For favorites page
      getFavorites: () =>
        set(() => ({
          favoriteExaminations: get()
            .uniqueExaminations()
            .filter((examination) => examination.isFavorite),
        })),

      // Patient will have multiple data for same examination.
      // Here will filter to show only one bubble with his data.
      uniqueExaminations: () =>
        Array.from(
          new Set(get().examinations.map((examination) => examination.name))
        ).map((name) =>
          get().examinations.find((examination) => examination.name === name)
        ),

      // Filter used in Home page (All, Normal, Abnormal)
      filterUniqueExaminations: (filterType) => {
        set(() => {
          let filteredItems = get().uniqueExaminations();

          if (filterType === "All") {
            filteredItems = get().uniqueExaminations();
          } else if (filterType === "Normal") {
            filteredItems = get()
              .uniqueExaminations()
              .filter(
                ({ result, starting_normal_range, ending_normal_range }) =>
                  result >= starting_normal_range &&
                  result <= ending_normal_range
              );
          } else {
            filteredItems = get()
              .uniqueExaminations()
              .filter(
                ({ result, starting_normal_range, ending_normal_range }) =>
                  result < starting_normal_range || result > ending_normal_range
              );
          }
          return { filteredExaminations: filteredItems };
        });
      },

      homePageSearch: (searchQuery) => {
        set(() => ({
          filteredExaminations: get()
            .uniqueExaminations()
            .filter((examination) =>
              searchQuery
                ? examination.name.includes(searchQuery.toUpperCase())
                : examination
            ),
        }));
      },

      favoritesPageSearch: (searchQuery) => {
        set(() => ({
          favoriteExaminations: get()
            .uniqueExaminations()
            .filter((examination) => examination.isFavorite)
            .filter((examination) =>
              searchQuery
                ? examination.name.includes(searchQuery.toUpperCase())
                : examination
            ),
        }));
      },

      // Get data (examinations) related to single (logged in) patient
      // Used in Home, Favorites, and Examination pages
      currentPatient: () => usePatientsStore.getState().currentPatient,
      getSamples: () =>
        useLaboratoryStore.getState().getSamples(get().currentPatient()?.id),

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
        get().currentPatient();

        const wantedIds = get()
          .getSamples()
          .map((sample) => sample.sample_id);

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

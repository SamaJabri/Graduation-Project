import { create } from "zustand";
import { persist } from "zustand/middleware";
import INIT_PATIENTS from "./patients";

const usePatientsStore = create(
  persist(
    (set, get) => ({
      patients: INIT_PATIENTS,
      currentPatient: null,
      isLoggedIn: false,

      darkMode: false,

      // Login
      loginPatient: (patientId) =>
        set((state) => ({
          currentPatient: state.patients.find(({ id }) => id === patientId),
          isLoggedIn: true,
        })),

      // Sign Up & then login
      createAndLoginPatient: (newPatient) =>
        set((state) => ({
          patients: [...state.patients, newPatient],
          currentPatient: newPatient,
          isLoggedIn: true,
        })),

      // Update user info (newInfo is an object of the updated fields)
      UpdatePatientInfo: (newInfo) =>
        set((state) => ({
          currentPatient: { ...state.currentPatient, ...newInfo },

          patients: state.patients.map((patient) =>
            patient.id === state.currentPatient.id
              ? state.currentPatient
              : patient
          ),
        })),

      // Log out
      logOutPatient: () =>
        set((state) => ({
          currentPatient: null,
          isLoggedIn: false,
        })),

      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
    }),
    {
      name: "patients",
    }
  )
);

export default usePatientsStore;

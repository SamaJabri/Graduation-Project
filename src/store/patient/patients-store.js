import { create } from "zustand";
import { persist } from "zustand/middleware";
import INIT_PATIENTS from "./patients";

const usePatientsStore = create(
  persist(
    (set, get) => ({
      patients: INIT_PATIENTS,
      currentPatient: null,
      isLoggedIn: false,

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
          patients: state.patients.map((patient) =>
            patient.id === currentPatient.id ? { ...patient, newInfo } : patient
          ),
        })),

      // Log out
      logOutPatient: () =>
        set((state) => ({
          currentPatient: null,
          isLoggedIn: false,
        })),
    }),
    {
      name: "patients",
    }
  )
);

export default usePatientsStore;

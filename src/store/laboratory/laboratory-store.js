import { create } from "zustand";
import { persist } from "zustand/middleware";

import INIT_SAMPLES from "./samples";
import INIT_DOCTORS from "./doctors";
import INIT_SAMPLE_IN_LAB from "./sample-in-lab";
import INIT_LABORATORIES from "./laboratories";

//import usePatientsStore from "../patient/patients-store";

const useLaboratoryStore = create(
  persist(
    (set, get) => ({
      doctors: INIT_DOCTORS,
      samples: INIT_SAMPLES,
      samples_in_lab: INIT_SAMPLE_IN_LAB,
      laboratories: INIT_LABORATORIES,
      //currentPatient: usePatientsStore((state) => state.currentPatient),

      myLabs: [] /* [
        {
          // Sample
          sampleId: 0,
          // Sample_in_lab
          sampleInLabId: 0,
          expertApprovalTime: "01/01/2022",
          // Doctors
          doctorName: "Dixie",
          doctorSurname: "Naston",
          // Laboratories
          labName: "Hematology Laboratory",
        },
      ], */,

      getSamples: (id) =>
        set((state) => ({
          myLabs: state.samples.filter((sample) => sample.patient_id === id),
        })),

      getSampleInLab: (id) =>
        set((state) => ({
          myLabs: state.myLabs.map((myLab) => {
            extraInfo: state.samples_in_lab.filter(
              (sample) => sample.sample_id === myLab.id
            );

            return {
              ...myLab,
              extraInfo,
            };
          }),
        })),

      finzalizeMyLabData: (id) =>
        set((state) => {
          state.getSamples(id);
          console.log(state.myLabs);
          state.getSampleInLab(id);
          console.log(state.myLabs);
        }),
    }),
    { name: "laboratories" }
  )
);

export default useLaboratoryStore;

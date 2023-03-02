import { create } from "zustand";
import { persist } from "zustand/middleware";

import INIT_SAMPLES from "./samples";
import INIT_DOCTORS from "./doctors";
import INIT_SAMPLE_IN_LAB from "./sample-in-lab";
import INIT_LABORATORIES from "./laboratories";

const useLaboratoryStore = create(
  persist(
    (set, get) => ({
      doctors: INIT_DOCTORS,
      samples: INIT_SAMPLES,
      samples_in_lab: INIT_SAMPLE_IN_LAB,
      laboratories: INIT_LABORATORIES,

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

      finalLabs: [],

      getSamples: (id) =>
        set({
          ...get(),
          myLabs: get().samples.filter((sample) => sample.patient_id === id),
        }),

      getSampleInLab: (id) =>
        set((state) => {
          const extraInfo = (myLab) =>
            state.samples_in_lab.filter(
              (sample) => sample.sample_id === myLab.id
            );

          return {
            finalLabs: state.myLabs.map((myLab) => extraInfo(myLab)),
          };
        }),

      getLabNameFromSample: (id) => {
        const labId = get().samples_in_lab.filter(
          (sample) => sample.id === id
        )[0].lab_id;

        console.log("l", labId);
        return get().laboratories.filter((lab) => lab.id === labId)[0].lab_name;
      },

      /*  finzalizeMyLabData: (id) =>
        set((state) => {
          console.log(state.myLabs);

          //state.getSamples(id);

          //state.getSampleInLab(id);
          //console.log(state.myLabs);
        }), */
    }),
    { name: "laboratories" }
  )
);

export default useLaboratoryStore;

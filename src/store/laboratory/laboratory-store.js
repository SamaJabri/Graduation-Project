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

      // Get samples for currentPatient
      getSamples: (id) =>
        get().samples.filter((sample) => sample.patient_id === id),

      // Get the sample_in_lab data (expert_approval_time & sample_in_lab_id)
      getSampleInLab: (id) => {
        const wantedIds = get()
          .getSamples(id)
          .map((lab) => lab.sample_id);

        return get().samples_in_lab.filter((sample) =>
          wantedIds.includes(sample.sample_id)
        );
      },

      // Get Lab names for the samples_in_lab
      getLabNameFromSample: (id) => {
        const wantedIds = new Set(
          get()
            .getSampleInLab(id)
            .map((lab) => lab.lab_id)
        );

        const labs = get().laboratories.filter((lab) =>
          wantedIds.has(lab.lab_id)
        );

        return get()
          .getSampleInLab(id)
          .map((finalLab) => ({
            ...finalLab,
            ...labs.filter(
              (lab) => lab.lab_id === finalLab.lab_id && lab.lab_name
            )[0],
          }));
      },

      // Get the doctor name
      getDoctorIdFromSample: (id) =>
        get()
          .getLabNameFromSample(id)
          .map((lab) => ({
            ...lab,
            ...get()
              .getSamples(id)
              .filter((sample) => sample.sample_id === lab.sample_id)[0],
          })),

      // Return the new array of objects with only the needed data to show in Tests Page
      getFinalData: (id) =>
        get()
          .getDoctorIdFromSample(id)
          .map((sample) => ({
            ...sample,
            ...get().doctors.filter(
              (doctor) => doctor.doctor_id === sample.doctor_id
            )[0],
          })),

      // Get lab name from sample_in_lab_id for the header in TestDetails Page
      getLabName: (id) =>
        get().laboratories.filter(
          (lab) =>
            lab.lab_id ===
            get().samples_in_lab.filter(
              (sample) => sample.sample_in_lab_id === id
            )[0].lab_id
        )[0].lab_name,
    }),
    { name: "laboratories" }
  )
);

export default useLaboratoryStore;

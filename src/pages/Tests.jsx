import React, { useState, useEffect } from "react";

import useLaboratoryStore from "../store/laboratory/laboratory-store";

import LabTest from "../components/LabTest";

const Tests = () => {
  // Store variables & functions
  const getFinalData = useLaboratoryStore((state) => state.getFinalData);
  const patientsLabs = useLaboratoryStore((state) => state.patientsLabs);
  const handleFilter = useLaboratoryStore((state) => state.handleFilter);

  const [yearFilter, setYearFilter] = useState("");
  const [monthFilter, setMonthFilter] = useState("");

  // Selected month converted to String for comparison
  const filterByMonth = (e) => {
    const month = e.target.value;
    const selectedMonth = String(month);

    setMonthFilter(month);

    handleFilter(selectedMonth, yearFilter, selectedMonth);
  };

  // Selected year converted to String for comparison
  const filterByYear = (e) => {
    const year = e.target.value;
    const selectedYear = String(year);

    setYearFilter(year);

    handleFilter(selectedYear, selectedYear, monthFilter);
  };

  useEffect(() => getFinalData(), []);

  return (
    <div className="labs">
      <div className="labs__filter">
        <input
          type="number"
          placeholder="Month"
          name="month"
          value={monthFilter}
          onChange={filterByMonth}
        />

        <input
          type="number"
          placeholder="Year"
          name="year"
          value={yearFilter}
          onChange={filterByYear}
        />
      </div>

      <div className="labs__list">
        {patientsLabs.map(
          ({
            sample_in_lab_id,
            doctor_name,
            doctor_surname,
            expert_approval_time,
            lab_name,
          }) => {
            const toDate = new Date(expert_approval_time).toDateString();

            const month = toDate.split(" ")[1];
            const year = toDate.split(" ")[3];

            return (
              <LabTest
                key={sample_in_lab_id}
                id={sample_in_lab_id}
                doctorName={`${doctor_name} ${doctor_surname}`}
                labName={lab_name}
                month={month}
                year={year}
              />
            );
          }
        )}
      </div>
    </div>
  );
};

export default Tests;

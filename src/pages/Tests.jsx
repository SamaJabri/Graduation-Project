import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import LabTest from "../components/LabTest";

import useLaboratoryStore from "../store/laboratory/laboratory-store";
import usePatientsStore from "../store/patient/patients-store";

const Tests = () => {
  // Store variables & functions
  const currentPatient = usePatientsStore((state) => state.currentPatient);

  const getFinalData = useLaboratoryStore((state) => state.getFinalData);

  useEffect(() => setLabsList(getFinalData(currentPatient.id)), []);

  const [labsList, setLabsList] = useState(getFinalData(currentPatient.id));

  const [yearFilter, setYearFilter] = useState("");
  const [monthFilter, setMonthFilter] = useState("");

  // Selected month converted to String for comparison
  const filterByMonth = (e) => {
    const month = e.target.value;
    const selectedMonth = String(month);

    setMonthFilter(month);

    handleFilterAndSetList(selectedMonth, yearFilter, selectedMonth);
  };

  // Selected year converted to String for comparison
  const filterByYear = (e) => {
    const year = e.target.value;
    const selectedYear = String(year);

    setYearFilter(year);

    handleFilterAndSetList(selectedYear, selectedYear, monthFilter);
  };

  // Filter list and set the view to the new filtered one
  // Written to reduse code redundancy
  const handleFilterAndSetList = (mainFilter, year, month) => {
    setLabsList(
      mainFilter
        ? labs.filter(
            ({ expertApprovalTime }) =>
              expertApprovalTime.split("/")[2].includes(year) &&
              expertApprovalTime.split("/")[0].includes(month)
          )
        : labs
    );
  };

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
        {labsList.map(
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

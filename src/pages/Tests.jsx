import React, { useState } from "react";

import LabTest from "../components/LabTest";

const Tests = () => {
  const labs = [
    {
      sampleId: 0,
      sampleInLabId: 0,
      doctorName: "Dixie",
      doctorSurname: "Naston",
      expertApprovalTime: "01/01/2022",
      labName: "Hematology Laboratory",
    },
    {
      sampleId: 0,
      sampleInLabId: 1,
      doctorName: "Dixie",
      doctorSurname: "Naston",
      expertApprovalTime: "01/01/2022",
      labName: "Hormon Laboratory",
    },
    {
      sampleId: 0,
      sampleInLabId: 2,
      doctorName: "Dixie",
      doctorSurname: "Naston",
      expertApprovalTime: "01/01/2022",
      labName: "Chemical Laboratory",
    },
    {
      sampleId: 1,
      sampleInLabId: 3,
      doctorName: "Dixie",
      doctorSurname: "Naston",
      expertApprovalTime: "07/20/2022",
      labName: "Hematology Laboratory",
    },
    {
      sampleId: 1,
      sampleInLabId: 4,
      doctorName: "Dixie",
      doctorSurname: "Naston",
      expertApprovalTime: "07/20/2022",
      labName: "Hormon Laboratory",
    },
    {
      sampleId: 2,
      sampleInLabId: 5,
      doctorName: "Atacan",
      doctorSurname: "Karlon",
      expertApprovalTime: "01/02/2023",
      labName: "Hematology Laboratory",
    },
    {
      sampleId: 2,
      sampleInLabId: 6,
      doctorName: "Atacan",
      doctorSurname: "Karlon",
      expertApprovalTime: "01/02/2023",
      labName: "Hormon Laboratory",
    },
  ];

  const [labsList, setLabsList] = useState(labs);

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
              expertApprovalTime.split("/")[0] === month
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
            sampleInLabId,
            doctorName,
            doctorSurname,
            expertApprovalTime,
            labName,
          }) => {
            const toDate = new Date(expertApprovalTime).toDateString();

            const month = toDate.split(" ")[1];
            const year = toDate.split(" ")[3];

            return (
              <LabTest
                key={sampleInLabId}
                id={sampleInLabId}
                doctorName={`${doctorName} ${doctorSurname}`}
                labName={labName}
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

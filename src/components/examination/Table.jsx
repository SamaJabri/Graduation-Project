import React, { useState } from "react";

import Icon from "../Icon";

const Table = (props) => {
  const [data, setData] = useState(props.data);
  const [ascending, setAscending] = useState(true);

  const toggleAscending = () => setAscending((asc) => !asc);

  const orderByDate = (e) => {
    e.preventDefault();

    toggleAscending();

    setData(
      data.sort((result1, result2) =>
        ascending
          ? new Date(result2.date) - new Date(result1.date)
          : new Date(result1.date) - new Date(result2.date)
      )
    );
  };

  const orderByResult = (e) => {
    e.preventDefault();

    toggleAscending();

    setData(
      data.sort((result1, result2) =>
        ascending
          ? result2.result - result1.result
          : result1.result - result2.result
      )
    );
  };

  return (
    <table className="table">
      <thead className="table__head">
        <tr>
          <th>
            <div>
              <p>Date</p>
              <Icon iconName="AiOutlineSwap" onClick={orderByDate} />
            </div>
          </th>
          <th>
            <div>
              <p>Result</p>
              <Icon iconName="AiOutlineSwap" onClick={orderByResult} />
            </div>
          </th>
          <th>Unit</th>
          <th>Reference Values</th>
        </tr>
      </thead>

      <tbody className="table__body">
        {data.map(
          ({
            id,
            date,
            result,
            unit,
            starting_normal_range,
            ending_normal_range,
          }) => (
            <tr key={id}>
              <td>{date}</td>
              <td>{result}</td>
              <td>{unit}</td>
              <td>
                {starting_normal_range} - {ending_normal_range}
              </td>
            </tr>
          )
        )}
      </tbody>
    </table>
  );
};

export default Table;

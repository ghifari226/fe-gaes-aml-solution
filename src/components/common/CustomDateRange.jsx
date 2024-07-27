import React, { useState, useEffect } from "react";
import moment from "moment";
import DateRangePicker from "react-bootstrap-daterangepicker";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-daterangepicker/daterangepicker.css";

const CustomDateRange = ({ onChange, value, label = "Tanggal", setWarn }) => {
  const [isChange, setChange] = useState(null);

  useEffect(() => {
    if (!value) {
      setChange(null);
    }
  }, [value]);

  return (
    <>
      <DateRangePicker
        onCallback={(startDate, endDate) => {
          setChange([
            moment(startDate._d).format("DD/MM/YY"),
            moment(endDate._d).format("DD/MM/YY"),
          ]);
          onChange(
            moment(startDate._d).format("YYYY-MM-DD"),
            moment(endDate._d).format("YYYY-MM-DD")
          );
        }}
        initialSettings={{
          startDate: moment("2022-07-01").toDate(),
          endDate: moment("2022-07-01").toDate(),
        }}
      >
        <button
          className="btn p-2 w-100"
          style={{
            borderRadius: 4,
            fontSize: 12,
            minWidth: 160,
            border: setWarn ? "1px solid red" : "1px solid #000",
            backgroundColor: "#fff",
            display: "inline-block",
            textAlign: "left",
          }}
        >
          {!isChange ? "" : label + " : "}
          {!isChange
            ? "Tanggal Awal - Tanggal Akhir"
            : `${isChange[0]} - ${isChange[1]}`}
        </button>
      </DateRangePicker>
    </>
  );
};

export default CustomDateRange;

import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import CustomDateRange from "../../components/common/CustomDateRange";

import transactionFundColumns from "../../data/columns/transactionFundColumns";

const TransactionFund = () => {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState(transactionFundColumns);
  const [startDate, setStartDate] = useState(new Date("2022-07-01"));
  const [endDate, setEndDate] = useState(new Date("2022-07-31"));

  const [dateRange, setDateRange] = useState({
    startDate: startDate,
    endDate: endDate,
  });

  useEffect(() => {
    fetchData();
  }, [startDate, endDate]);

  const fetchData = async () => {
    try {
      const credential = {
        username: "johndoe",
        password: "secret",
      };
      let token;

      const loginResponse = await axios.post(
        process.env.REACT_APP_API_LOGIN_URL,
        credential,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      const loginRespData = loginResponse.data;

      if (loginResponse.data) {
        token = loginRespData.access_token;

        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/money-laundering`,
          {
            params: {
              start_date: moment(startDate).format("YYYY-MM-DD"),
              end_date: moment(endDate).format("YYYY-MM-DD"),
            },
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("Data received:", response.data.data);
        setData(response.data.data);
      } else {
        console.error("Token not found in the login response");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDateRangeChange = ( start, end ) => {
    console.log(start, end);
    setStartDate(start);
    setEndDate(end);
    setDateRange({
      start,
      end,
    });
  };

  return (
    <div>
      <h1>Analisis Pinjaman Online</h1>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <CustomDateRange
                  onChange={(x, j) => handleDateRangeChange(x, j)}
                  value={[startDate, endDate]}
                />
              </Box>
              <Box sx={{ minHeight: 400, width: "100%", marginTop: "16px" }}>
                <DataGrid
                  getRowId={(row) => row.aml_transaction_id}
                  rows={data}
                  columns={columns}
                  pageSize={10}
                  checkboxSelection
                  disableSelectionOnClick
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default TransactionFund;

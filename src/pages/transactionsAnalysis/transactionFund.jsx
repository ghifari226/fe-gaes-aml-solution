import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import {
  Box,
  Card,
  CardContent,
  Grid,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
} from "@mui/material";
import CustomDateRange from "../../components/common/CustomDateRange";
import transactionFundColumns from "../../data/columns/transactionFundColumns";

const TransactionFund = () => {
  const [loadingData, setLoadingData] = useState(false);
  const [data, setData] = useState([]);
  const [startDate, setStartDate] = useState(new Date("2022-07-01"));
  const [endDate, setEndDate] = useState(new Date("2022-07-31"));
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(0);
  const [totalRows, setTotalRows] = useState(0);

  useEffect(() => {
    fetchData();
  }, [startDate, endDate, page, pageSize]);

  const fetchData = async () => {
    try {
      setData([]);
      setLoadingData(true);

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
              startDate: moment(startDate).format("YYYY-MM-DD"),
              endDate: moment(endDate).format("YYYY-MM-DD"),
              pageSize: pageSize,
              page: page + 1,
            },
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setData(response.data.data);
        setTotalRows(response.data.total);
      } else {
        console.error("Token not found in the login response");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoadingData(false);
    }
  };

  const handleDateRangeChange = (start, end) => {
    console.log(start, end);
    setStartDate(start);
    setEndDate(end);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPageSize(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div>
      <h3>Analisis Pencucian Uang</h3>
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
                {loadingData ? (
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          {transactionFundColumns.map((column) => (
                            <TableCell key={column.field}>
                              {column.headerName}
                            </TableCell>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {Array.from({ length: pageSize }).map((_, idx) => (
                          <TableRow key={idx}>
                            {transactionFundColumns.map((column) => (
                              <TableCell key={column.field}>
                                <Skeleton />
                              </TableCell>
                            ))}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                ) : (
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          {transactionFundColumns.map((column) => (
                            <TableCell key={column.field}>
                              {column.headerName}
                            </TableCell>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {data.length ? (
                          data.map((row) => (
                            <TableRow key={row.p2p_transaction_id}>
                              {transactionFundColumns.map((column) => (
                                <TableCell key={column.field}>
                                  {column.field === "aml_ismoneylaundering" ||
                                  column.field === "aml_issuspicious"
                                    ? row[column.field] == 1
                                      ? "Ya"
                                      : "Tidak"
                                    : row[column.field]}
                                </TableCell>
                              ))}
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell
                              colSpan={transactionFundColumns.length}
                              sx={{
                                textAlign: "center",
                                fontStyle: "italic",
                                color: "gray",
                              }}
                            >
                              No data available
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
                <TablePagination
                  rowsPerPageOptions={[10, 25, 50]}
                  component="div"
                  count={totalRows}
                  rowsPerPage={pageSize}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
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

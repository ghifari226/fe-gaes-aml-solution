import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Typography,
  Skeleton
} from "@mui/material";
import CustomDateRange from "../../components/common/CustomDateRange";

import alertColumns from "../../data/columns/alertColumns";

const AlertDetail = () => {
  const [loadingData, setLoadingData] = useState(false);
  const [data, setData] = useState([]);
  const [startDate, setStartDate] = useState(new Date("2022-09-01"));
  const [endDate, setEndDate] = useState(new Date("2022-09-30"));
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
          `${process.env.REACT_APP_API_URL}/alert`,
          {
            params: {
              start_date: moment(startDate).format("YYYY-MM-DD"),
              end_date: moment(endDate).format("YYYY-MM-DD"),
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

  const alertInfo = {
    alertId: "12345",
    score: 85,
    queue: "Queue 1",
    actionableEntityName: "Entity Name",
    actionableEntityId: "Entity ID",
  };

  const statusInfo = {
    status: "Active",
    hold: "False",
    suppress: "True",
    productive: "True",
    lastUpdatedBy: "User",
    lastUpdatedDate: "2024-06-17",
  };

  const fromCustomer = {
    name: "John Doe",
    type: "Individual",
    country: "China",
  };

  const toCustomer = {
    name: "Jane Smith",
    type: "Company",
    country: "Indonesia",
  };

  return (
    <div>
      <h3>Detail Peringatan</h3>
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
                          {alertColumns.map((column) => (
                            <TableCell key={column.field}>
                              {column.headerName}
                            </TableCell>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {Array.from({ length: pageSize }).map((_, idx) => (
                          <TableRow key={idx}>
                            {alertColumns.map((column) => (
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
                          {alertColumns.map((column) => (
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
                              {alertColumns.map((column) => (
                                <TableCell key={column.field}>
                                  {row[column.field]}
                                </TableCell>
                              ))}
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell
                              colSpan={alertColumns.length}
                              sx={{ textAlign: 'center', fontStyle: 'italic', color: 'gray' }}
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

        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={5}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Detail Peringatan
                  </Typography>
                  <Grid container spacing={1}>
                    <Grid item xs={6}>
                      <Typography variant="body2">ID:</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2">{alertInfo.alertId}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2">Skor (dari 100):</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2">{alertInfo.score}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2">Antrian:</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2">{alertInfo.queue}</Typography>
                    </Grid>
                  </Grid>

                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ marginTop: "10px" }}
                  >
                    Status
                  </Typography>
                  <Grid container spacing={1}>
                    <Grid item xs={6}>
                      <Typography variant="body2">Status:</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2">{statusInfo.status}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2">Suppress:</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2">{statusInfo.suppress}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2">Productive:</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2">{statusInfo.productive}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2">Last Updated By:</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2">{statusInfo.lastUpdatedBy}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2">Last Updated Date:</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2">{statusInfo.lastUpdatedDate}</Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={7}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Alur Transaksi
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Card>
                        <CardContent>
                          <Typography variant="h6" gutterBottom>
                            Dari Nasabah
                          </Typography>
                          <Typography variant="body2">
                            Nama: {fromCustomer.name}
                          </Typography>
                          <Typography variant="body2">
                            Tipe: {fromCustomer.type}
                          </Typography>
                          <Typography variant="body2">
                            Negara: {fromCustomer.country}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid item xs={6}>
                      <Card>
                        <CardContent>
                          <Typography variant="h6" gutterBottom>
                            Ke Nasabah
                          </Typography>
                          <Typography variant="body2">
                            Nama: {toCustomer.name}
                          </Typography>
                          <Typography variant="body2">
                            Tipe: {toCustomer.type}
                          </Typography>
                          <Typography variant="body2">
                            Negara: {toCustomer.country}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  </Grid>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      marginTop: "30px",
                    }}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      href="/sna"
                      target="_blank"
                    >
                      Analisis Lebih Lanjut
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default AlertDetail;
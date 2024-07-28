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
  Skeleton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import CustomDateRange from "../../components/common/CustomDateRange";
import transactionLoanColumns from "../../data/columns/transactionLoanColumns";

const TransactionLoan = () => {
  const [loadingData, setLoadingData] = useState(false);
  const [data, setData] = useState([]);
  const [startDate, setStartDate] = useState(new Date("2022-07-01"));
  const [endDate, setEndDate] = useState(new Date("2022-07-31"));
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(0);
  const [totalRows, setTotalRows] = useState(0);
  const [suspicious, setSuspicious] = useState("-");

  const formattedStartDate = startDate
    ? moment(startDate).format("YYYY-MM-DD")
    : "";
  const formattedEndDate = endDate ? moment(endDate).format("YYYY-MM-DD") : "";

  const susOptions = [
    { id: "-", label: "Semua" },
    { id: "1", label: "Mencurigakan" },
    { id: "0", label: "Tidak Mencurigakan" },
  ];

  useEffect(() => {
    fetchData();
  }, [startDate, endDate, page, pageSize, suspicious]);

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
          `${process.env.REACT_APP_API_URL}/pinjol`,
          {
            params: {
              startDate: moment(startDate).format("YYYY-MM-DD"),
              endDate: moment(endDate).format("YYYY-MM-DD"),
              pageSize: pageSize,
              page: page + 1,
              suspicious: suspicious === "-" ? null : suspicious,
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

  const handleSuspiciousChange = (event) => {
    setSuspicious(event.target.value);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <h3 style={{ marginBottom: "45px " }}>
              Analisis Pinjaman Online
              <div style={{ float: "right" }}>
                <Button
                  style={{ margin: 0 }}
                  variant="contained"
                  color="primary"
                  href={`/transactions-analysis/fund?suspicious=1${
                    startDate && `&startDate=${formattedStartDate}`
                  }${endDate && `&endDate=${formattedEndDate}`}`}
                  target="_blank"
                >
                  Analisis Lebih Lanjut (Pencucian Uang)
                </Button>
              </div>
            </h3>
            <div style={{ marginBottom: "5px " }} className="row">
              <div className="col-6">
                <FormControl variant="outlined" sx={{ width: "100%" }}>
                  <InputLabel id="suspicious-label">
                    Transaksi Mencurigakan
                  </InputLabel>
                  <Select
                    size="small"
                    labelId="suspicious-label"
                    value={suspicious}
                    onChange={handleSuspiciousChange}
                    label="Transaksi Mencurigakan"
                  >
                    {susOptions.map((option) => (
                      <MenuItem key={option.id} value={option.id}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div className="col-6">
                <CustomDateRange
                  label="Tanggal Pembayaran"
                  onChange={(x, j) => handleDateRangeChange(x, j)}
                  value={[startDate, endDate]}
                />
              </div>
            </div>
            <Box sx={{ minHeight: 400, width: "100%", marginTop: "16px" }}>
              {loadingData ? (
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        {transactionLoanColumns.map((column) => (
                          <TableCell key={column.field}>
                            {column.headerName}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {Array.from({ length: pageSize }).map((_, idx) => (
                        <TableRow key={idx}>
                          {transactionLoanColumns.map((column) => (
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
                        {transactionLoanColumns.map((column) => (
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
                            {transactionLoanColumns.map((column) => (
                              <TableCell key={column.field}>
                                {column.field === "p2p_issuspicious"
                                  ? row[column.field] == 1
                                    ? "Ya"
                                    : "Tidak"
                                  : column.field === "p2p_paid_amount_rp" ||
                                    column.field === "p2p_borrower_income"
                                  ? `Rp ${Math.floor(
                                      row[column.field]
                                    ).toLocaleString()}`
                                  : column.field === "p2p_repay_timestamp"
                                  ? new Date(row[column.field])
                                      .toLocaleString("id-ID", {
                                        day: "2-digit",
                                        month: "2-digit",
                                        year: "numeric",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                        second: "2-digit",
                                      })
                                      .replace(",", "")
                                  : row[column.field]}
                              </TableCell>
                            ))}
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell
                            colSpan={transactionLoanColumns.length}
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
  );
};

export default TransactionLoan;

import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import {
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { blue, red } from "@mui/material/colors";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CustomDateRange from "../../components/common/CustomDateRange";
import alertColumns from "../../data/columns/alertColumns";

const AlertDetail = () => {
  const [loadingData, setLoadingData] = useState(false);
  const [data, setData] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [detail, setDetail] = useState({});
  const [startDate, setStartDate] = useState(new Date("2024-07-01"));
  const [endDate, setEndDate] = useState(new Date("2024-07-30"));
  const [startDateTransaction, setStartDateTransaction] = useState(
    new Date("2022-01-01")
  );
  const [endDateTransaction, setEndDateTransaction] = useState(
    new Date("2022-12-31")
  );
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(0);
  const [totalRows, setTotalRows] = useState(0);
  const [status, setStatus] = useState("-");
  const [statusDialogIsOpen, setStatusDialogIsOpen] = useState(false);
  const [selectedAlertId, setSelectedAlertId] = useState(null);
  const [selectedAlertCurrentStatus, setSelectedAlertCurrentStatus] =
    useState(null);
  const [selectedAlertStatus, setSelectedAlertStatus] = useState(null);
  const [laundering, setLaundering] = useState("-");
  const [suspicious, setSuspicious] = useState("-");
  const [transactionId, setTransactionId] = useState(null);
  const [inputTransactionId, setInputTransactionId] = useState(null);
  const [customerId, setCustomerId] = useState(null);
  const [inputCustomerId, setInputCustomerId] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  }, [selectedId]);

  const statusOptions = [
    { id: "-", label: "Semua" },
    { id: "Active", label: "Aktif" },
    { id: "Active - Unacknowledged", label: "Aktif - Belum Ditinjau" },
    { id: "Active - Acknowledged", label: "Aktif - Sudah Ditinjau" },
    { id: "Cleared", label: "Selesai" },
    { id: "Cleared - Unproven", label: "Selesai - Tidak Terbukti" },
    { id: "Cleared - Confirmed", label: "Selesai - Terkonfirmasi" },
  ];

  const statusIdOptions = [
    "Active - Unacknowledged",
    "Active - Acknowledged",
    "Cleared - Unproven",
    "Cleared - Confirmed",
  ];

  const statusChangeOptions = [
    { id: "Active - Unacknowledged", label: "Aktif - Belum Ditinjau" },
    { id: "Active - Acknowledged", label: "Aktif - Sudah Ditinjau" },
    { id: "Cleared - Unproven", label: "Selesai - Tidak Terbukti" },
    { id: "Cleared - Confirmed", label: "Selesai - Terkonfirmasi" },
  ];

  const statusMasking = {
    "Active - Unacknowledged": "Aktif - Belum Ditinjau",
    "Active - Acknowledged": "Aktif - Sudah Ditinjau",
    "Cleared - Unproven": "Selesai - Tidak Terbukti",
    "Cleared - Confirmed": "Selesai - Terkonfirmasi",
  };

  const openChangeStatusDialog = (id, status) => {
    setStatusDialogIsOpen(true);
    setSelectedAlertId(id);
    setSelectedAlertCurrentStatus(status);
    setSelectedAlertStatus(status);
  };

  const closeChangeStatusDialog = () => {
    setStatusDialogIsOpen(false);
    setSelectedAlertId(null);
    setSelectedAlertCurrentStatus(null);
    setSelectedAlertStatus(null);
  };

  const handleSubmitStatusChange = () => {
    const submitStatusChange = async () => {
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

          const updatedAt = new Date().toISOString();
          let body = {
            alert_status: selectedAlertStatus,
            alert_id: selectedAlertId,
            // created_by: "John Doe",
            // updated_at: updatedAt,
          };

          const response = await axios.patch(
            `${process.env.REACT_APP_API_URL}/alert-status`,
            body,
            {
              headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          closeChangeStatusDialog();
          if (response.status === 200) {
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          }
        } else {
          console.error("Token not found in the login response");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    if (selectedAlertStatus !== selectedAlertCurrentStatus) {
      submitStatusChange();
    }
  };

  const launderingOptions = [
    { id: "-", label: "Semua" },
    { id: "1", label: "Pencucian Uang" },
    { id: "0", label: "Bukan Pencucian Uang" },
  ];

  const susOptions = [
    { id: "-", label: "Semua" },
    { id: "1", label: "Mencurigakan" },
    { id: "0", label: "Tidak Mencurigakan" },
  ];

  useEffect(() => {
    fetchData();
  }, [
    startDate,
    endDate,
    startDateTransaction,
    endDateTransaction,
    page,
    pageSize,
    status,
    laundering,
    suspicious,
    transactionId,
    customerId,
  ]);

  useEffect(() => {
    if (selectedId) {
      fetchDetail();
    }
  }, [selectedId]);

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
              start_date_transaction: moment(startDate).format("YYYY-MM-DD"),
              end_date_transaction: moment(endDate).format("YYYY-MM-DD"),
              pageSize: pageSize,
              page: page + 1,
              status: status === "-" ? null : status,
              laundering: laundering === "-" ? null : laundering,
              suspicious: suspicious === "-" ? null : suspicious,
              transactionId: transactionId || null,
              customerId: customerId || null,
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

  const fetchDetail = async () => {
    try {
      setDetail({});
      setLoadingDetail(true);

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
          `${process.env.REACT_APP_API_URL}/alert-detail/${selectedId}`,
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setDetail(response.data.data);
      } else {
        console.error("Token not found in the login response");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoadingDetail(false);
    }
  };

  const handleRowClick = (id) => {
    setSelectedId(id);
  };

  const handleSuspiciousChange = (event) => {
    setSuspicious(event.target.value);
  };

  const handleLaunderingChange = (event) => {
    setLaundering(event.target.value);
  };

  const handleInputTransactionIdChange = (event) => {
    setInputTransactionId(event.target.value);
  };

  const handleTransactionIdChange = () => {
    setTransactionId(inputTransactionId);
  };

  const handleTransactionIdKeyDown = (event) => {
    if (event.key === "Enter") {
      handleTransactionIdChange();
    }
  };

  const clearTransactionId = () => {
    setInputTransactionId("");
    setTransactionId("");
  };

  const handleInputCustomerIdChange = (event) => {
    setInputCustomerId(event.target.value);
  };

  const handleCustomerIdChange = () => {
    setCustomerId(inputCustomerId);
  };

  const handleCustomerIdKeyDown = (event) => {
    if (event.key === "Enter") {
      handleCustomerIdChange();
    }
  };

  const clearCustomerId = () => {
    setInputCustomerId("");
    setCustomerId("");
  };

  const handleDateRangeChange = (start, end) => {
    setStartDate(start);
    setEndDate(end);
  };

  const handleDateRangeTransactionChange = (start, end) => {
    setStartDateTransaction(start);
    setEndDateTransaction(end);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPageSize(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSelectedStatusChange = (event) => {
    setSelectedAlertStatus(event.target.value);
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const actionColumn = {
    field: "action",
    headerName: "Aksi",
    width: 80,
    renderCell: (params) => (
      <Tooltip title="Ubah status peringatan">
        <IconButton
          onClick={() =>
            openChangeStatusDialog(params.row.alert_id, params.row.alert_status)
          }
        >
          <ArrowForwardIcon />
        </IconButton>
      </Tooltip>
    ),
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <h3 style={{ marginBottom: "45px " }}>Detail Peringatan</h3>
            <div style={{ marginBottom: "25px " }} className="row">
              <div className="col-3">
                <FormControl variant="outlined" sx={{ width: "100%" }}>
                  <InputLabel id="alert-label">Status Alert</InputLabel>
                  <Select
                    size="small"
                    labelId="alert-label"
                    value={status}
                    onChange={handleStatusChange}
                    label="Status Alert"
                  >
                    {statusOptions.map((option) => (
                      <MenuItem key={option.id} value={option.id}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div className="col-3">
                <FormControl variant="outlined" sx={{ width: "100%" }}>
                  <InputLabel id="laundering-label">
                    Status Pencucian Uang
                  </InputLabel>
                  <Select
                    size="small"
                    labelId="laundering-label"
                    value={laundering}
                    onChange={handleLaunderingChange}
                    label="Status Pencucian Uang"
                  >
                    {launderingOptions.map((option) => (
                      <MenuItem key={option.id} value={option.id}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div className="col-3">
                <FormControl variant="outlined" sx={{ width: "100%" }}>
                  <InputLabel id="suspicious-label">
                    Status Kecurigaan P2PL
                  </InputLabel>
                  <Select
                    size="small"
                    labelId="suspicious-label"
                    value={suspicious}
                    onChange={handleSuspiciousChange}
                    label="Status Kecurigaan P2PL"
                  >
                    {susOptions.map((option) => (
                      <MenuItem key={option.id} value={option.id}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div className="col-3">
                <CustomDateRange
                  label="Tanggal Alert"
                  onChange={(x, j) => handleDateRangeChange(x, j)}
                  value={[startDate, endDate]}
                />
              </div>
            </div>
            <div style={{ marginBottom: "5px " }} className="row">
              <div className="col-3">
                <FormControl variant="outlined" sx={{ width: "100%" }}>
                  <TextField
                    size="small"
                    labelId="transaction-id-label"
                    value={inputTransactionId || ""}
                    onChange={(e) => {
                      handleInputTransactionIdChange(e);
                    }}
                    onKeyDown={(e) => {
                      handleTransactionIdKeyDown(e);
                    }}
                    label="ID Transaksi"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          {inputTransactionId && (
                            <IconButton
                              onClick={(e) => {
                                clearTransactionId(e);
                              }}
                              edge="end"
                            >
                              <ClearIcon style={{ color: red[500] }} />
                            </IconButton>
                          )}
                          <IconButton
                            onClick={handleTransactionIdChange}
                            edge="end"
                          >
                            <SearchIcon style={{ color: blue[500] }} />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </FormControl>
              </div>
              <div className="col-3">
                <FormControl variant="outlined" sx={{ width: "100%" }}>
                  <TextField
                    size="small"
                    labelId="customer-id-label"
                    value={inputCustomerId || ""}
                    onChange={(e) => {
                      handleInputCustomerIdChange(e);
                    }}
                    onKeyDown={(e) => {
                      handleCustomerIdKeyDown(e);
                    }}
                    label="ID Pengirim"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          {inputCustomerId && (
                            <IconButton
                              onClick={(e) => {
                                clearCustomerId(e);
                              }}
                              edge="end"
                            >
                              <ClearIcon style={{ color: red[500] }} />
                            </IconButton>
                          )}
                          <IconButton
                            onClick={handleCustomerIdChange}
                            edge="end"
                          >
                            <SearchIcon style={{ color: blue[500] }} />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </FormControl>
              </div>
              <div className="col-3">
                <CustomDateRange
                  label="Tanggal Transaksi"
                  onChange={(x, j) => handleDateRangeTransactionChange(x, j)}
                  value={[startDateTransaction, endDateTransaction]}
                />
              </div>
            </div>
            <Box sx={{ minHeight: 400, width: "100%", marginTop: "16px" }}>
              {loadingData ? (
                <TableContainer sx={{ maxHeight: "100vh" }}>
                  <Table stickyHeader>
                    <TableHead>
                      <TableRow>
                        <TableCell>{actionColumn.headerName}</TableCell>
                        {alertColumns.map((column) => (
                          <TableCell key={column.field}>
                            {column.headerName}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {Array.from({ length: pageSize }).map((_, idx) => (
                        <TableRow
                          key={idx}
                          sx={{
                            backgroundColor:
                              idx % 2 === 0 ? "grey.100" : "background.paper",
                          }}
                        >
                          <TableCell>
                            <Skeleton />
                          </TableCell>
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
                <TableContainer sx={{ maxHeight: "100vh" }}>
                  <Table stickyHeader>
                    <TableHead>
                      <TableRow>
                        <TableCell>{actionColumn.headerName}</TableCell>
                        {alertColumns.map((column) => (
                          <TableCell key={column.field}>
                            {column.headerName}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {data.length ? (
                        data.map((row, idx) => (
                          <TableRow
                            key={row.alert_aml_transaction_id}
                            sx={{
                              backgroundColor:
                                hoveredId === row.alert_id
                                  ? "lightblue"
                                  : idx % 2 === 0
                                  ? "grey.100"
                                  : "background.paper",
                            }}
                            onMouseEnter={() => setHoveredId(row.alert_id)}
                            onMouseLeave={() => setHoveredId(null)}
                            onClick={() =>
                              handleRowClick(row.alert_aml_transaction_id)
                            }
                            style={{ cursor: "pointer" }}
                          >
                            <TableCell>
                              {actionColumn.renderCell({ row })}
                            </TableCell>
                            {alertColumns.map((column) => (
                              <TableCell key={column.field}>
                                {column.field === "alert_status"
                                  ? row[column.field] &&
                                    statusIdOptions.includes(row[column.field])
                                    ? statusMasking[row[column.field]]
                                    : ""
                                  : column.field ===
                                      "alert_aml_ismoneylaundering" ||
                                    column.field === "alert_aml_issuspicious"
                                  ? row[column.field] == 1
                                    ? "Ya"
                                    : "Tidak"
                                  : column.field === "alert_aml_rp_amount"
                                  ? `Rp ${Math.floor(
                                      row[column.field]
                                    ).toLocaleString()}`
                                  : column.field === "alert_timestamp" ||
                                    column.field === "alert_aml_timestamp"
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
                                      .replace(".", ":")
                                  : row[column.field]}
                              </TableCell>
                            ))}
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell
                            colSpan={alertColumns.length}
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
      {selectedId && (
        <>
          <Grid item xs={6}>
            <Card style={{ minHeight: "270px" }}>
              <CardContent>
                <Grid item xs={6}>
                  <Typography variant="h6" gutterBottom>
                    Detail Peringatan
                  </Typography>
                  <Grid container spacing={1}>
                    <Grid item xs={6}>
                      <Typography variant="body2">ID Transaksi:</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2">
                        {detail.aml_transaction_id}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2">
                        Skor Kecurigaan (dari 100):
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2">
                        {detail.aml_risk_score}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2">
                        Nominal Transaksi:
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2">
                        {detail.aml_rp_amount &&
                          `Rp ${Math.floor(
                            detail.aml_rp_amount
                          ).toLocaleString()}`}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ marginTop: "10px" }}
                  >
                    Pelanggaran Aturan
                  </Typography>
                  <Grid container spacing={1}>
                    {detail.aml_fuzzy_result && data.aml_fuzzy_result > 0 ? (
                      data.aml_fuzzy_result.map((data, index) => (
                        <Grid item xs={12}>
                          <Typography variant="body2">
                            {index}. {data}
                          </Typography>
                        </Grid>
                      ))
                    ) : (
                      <Grid item xs={12}>
                        <Typography variant="body2">-</Typography>
                      </Grid>
                    )}
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Card style={{ minHeight: "270px" }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Alur Transaksi
                </Typography>
                <Grid container spacing={1}>
                  <Grid item xs={6}>
                    <Typography variant="body2">ID Pengirim:</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2">
                      {detail.customer_sender_id}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2">
                      Nama Pengirim (disamarkan):
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2">
                      {detail.customer_sender_name}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2">ID Penerima:</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2">
                      {detail.customer_bene_id}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2">
                      Nama Penerima (disamarkan):
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2">
                      {detail.customer_bene_name}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} style={{ marginTop: "-25px" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                marginTop: "30px",
              }}
            >
              <Button
                sx={{ width: "100%" }}
                variant="contained"
                color="primary"
                href={`/transactions-analysis/fund?senderId=${detail.customer_sender_id}`}
                target="_blank"
              >
                Analisis Lebih Lanjut (Pencucian Uang)
              </Button>
            </Box>
          </Grid>
        </>
      )}

      <Dialog open={statusDialogIsOpen} onClose={closeChangeStatusDialog}>
        <DialogTitle style={{ textAlign: "center" }}>
          Anda akan mengubah status dari
          <br />
          Alert ID: {selectedAlertId}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            style={{ paddingTop: "20px", paddingBottom: "30px" }}
          >
            <FormControl variant="outlined" sx={{ width: "100%" }}>
              <InputLabel id="alert-label">Ubah Status Peringatan</InputLabel>
              <Select
                size="small"
                labelId="alert-label"
                value={selectedAlertStatus}
                onChange={handleSelectedStatusChange}
                label="Ubah Status Peringatan"
              >
                {statusChangeOptions.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeChangeStatusDialog} color="primary">
            Tutup
          </Button>
          <Button onClick={handleSubmitStatusChange} color="primary">
            Konfirmasi
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default AlertDetail;

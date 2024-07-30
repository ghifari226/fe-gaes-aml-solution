import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
  Grid,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
  IconButton,
  InputAdornment,
} from "@mui/material";
import AssistantOutlinedIcon from "@mui/icons-material/AssistantOutlined";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { blue, red } from "@mui/material/colors";
import CustomDateRange from "../../components/common/CustomDateRange";
import transactionFundColumns from "../../data/columns/transactionFundColumns";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const TransactionFund = () => {
  const query = useQuery();
  const navigate = useNavigate();

  const [loadingData, setLoadingData] = useState(false);
  const [data, setData] = useState([]);
  const [startDate, setStartDate] = useState(
    query.get("startDate") || new Date("2022-01-01")
  );
  const [endDate, setEndDate] = useState(
    query.get("endDate") || new Date("2022-12-31")
  );
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(0);
  const [totalRows, setTotalRows] = useState(0);
  const [laundering, setLaundering] = useState("-");
  const [suspicious, setSuspicious] = useState(query.get("suspicious") || "-");
  const [senderId, setSenderId] = useState(query.get("senderId"));
  const [inputSenderId, setInputSenderId] = useState(query.get("senderId"));
  const [beneId, setBeneId] = useState(null);
  const [inputBeneId, setInputBeneId] = useState(null);
  const [transactionId, setTransactionId] = useState(null);
  const [inputTransactionId, setInputTransactionId] = useState(null);
  const [chatDialogIsOpen, setChatDialogIsOpen] = useState(false);

  const closeChatDialog = () => {
    setChatDialogIsOpen(false);
  };

  const createNewChat = () => {
    const goToNewChat = async () => {
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

          const param_start_date = !startDate
            ? null
            : moment(startDate).format("YYYY-MM-DD");
          const param_end_date = !endDate
            ? null
            : moment(endDate).format("YYYY-MM-DD");
          const param_laundering = laundering === "-" ? null : laundering;
          const param_suspicious = suspicious === "-" ? null : suspicious;
          const param_sender_id = senderId || null;
          const param_bene_id = beneId || null;
          const param_transaction_id = transactionId || null;

          // Create an array of parameters with `=` replaced by `%3D`
          const params = [
            param_start_date ? `start_date%3D${param_start_date}` : null,
            param_end_date ? `end_date%3D${param_end_date}` : null,
            param_laundering
              ? `aml_ismoneylaundering%3D${param_laundering}`
              : null,
            param_suspicious ? `p2p_issuspicious%3D${param_suspicious}` : null,
            param_sender_id ? `customer_sender_id%3D${param_sender_id}` : null,
            param_bene_id ? `customer_bene_id%3D${param_bene_id}` : null,
            param_transaction_id
              ? `aml_transaction_id%3D${param_transaction_id}`
              : null,
          ].filter((param) => param !== null);

          // Join the parameters with "&"
          const queryString = params.length ? `${params.join("%26")}` : "";

          const createdAt = new Date().toISOString();
          let body = {
            aml_data_filter: queryString,
            agent_user_id: "1",
            created_by: "John Doe",
            created_at: createdAt,
          };

          const response = await axios.post(
            `${process.env.REACT_APP_API_URL}/chat`,
            body,
            {
              headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );

          const responseData = response.data.data;
          const chatHistoryId = responseData.chat_history_id;
          navigate(`/chat/${chatHistoryId}`);
        } else {
          console.error("Token not found in the login response");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    goToNewChat();
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
    if (senderId || suspicious || startDate || endDate) {
      const newUrl = window.location.pathname;
      navigate(newUrl, { replace: true });
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [
    startDate,
    endDate,
    page,
    pageSize,
    laundering,
    suspicious,
    senderId,
    beneId,
    transactionId,
  ]);

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
              laundering: laundering === "-" ? null : laundering,
              suspicious: suspicious === "-" ? null : suspicious,
              senderId: senderId || null,
              beneId: beneId || null,
              transactionId: transactionId || null,
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

  const handleSuspiciousChange = (event) => {
    setSuspicious(event.target.value);
  };

  const handleLaunderingChange = (event) => {
    setLaundering(event.target.value);
  };

  const handleInputSenderChange = (event) => {
    setInputSenderId(event.target.value);
  };

  const handleSenderChange = () => {
    setSenderId(inputSenderId);
  };

  const handleSenderKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSenderChange();
    }
  };

  const clearSenderId = () => {
    setInputSenderId("");
    setSenderId("");
  };

  const handleInputBeneChange = (event) => {
    setInputBeneId(event.target.value);
  };

  const handleBeneChange = () => {
    setBeneId(inputBeneId);
  };

  const handleBeneKeyDown = (event) => {
    if (event.key === "Enter") {
      handleBeneChange();
    }
  };

  const clearBeneId = () => {
    setInputBeneId("");
    setBeneId("");
  };

  const handleInputTransactionChange = (event) => {
    setInputTransactionId(event.target.value);
  };

  const handleTransactionChange = () => {
    setTransactionId(inputTransactionId);
  };

  const handleTransactionKeyDown = (event) => {
    if (event.key === "Enter") {
      handleTransactionChange();
    }
  };

  const clearTransactionId = () => {
    setInputTransactionId("");
    setTransactionId("");
  };

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <h3 style={{ marginBottom: "45px " }}>
                Analisis Pencucian Uang
                <div style={{ float: "right" }}>
                  <Button
                    style={{ margin: 0 }}
                    onClick={() => {
                      setChatDialogIsOpen(true);
                    }}
                    variant="contained"
                    color="primary"
                    startIcon={<AssistantOutlinedIcon />}
                  >
                    Mulai Obrolan Baru (Asisten AI)
                  </Button>
                </div>
              </h3>
              <div style={{ marginBottom: "25px " }} className="row">
                <div className="col-4">
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
                <div className="col-4">
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
                <div className="col-4">
                  <CustomDateRange
                    label="Tanggal Transaksi"
                    onChange={(x, j) => handleDateRangeChange(x, j)}
                    value={[startDate, endDate]}
                  />
                </div>
              </div>
              <div style={{ marginBottom: "5px " }} className="row">
                <div className="col-4">
                  <FormControl variant="outlined" sx={{ width: "100%" }}>
                    <TextField
                      size="small"
                      labelId="sender-id-label"
                      value={inputSenderId || ""}
                      onChange={(e) => {
                        handleInputSenderChange(e);
                      }}
                      onKeyDown={(e) => {
                        handleSenderKeyDown(e);
                      }}
                      label="ID Pengirim"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            {inputSenderId && (
                              <IconButton
                                onClick={(e) => {
                                  clearSenderId(e);
                                }}
                                edge="end"
                              >
                                <ClearIcon style={{ color: red[500] }} />
                              </IconButton>
                            )}
                            <IconButton onClick={handleSenderChange} edge="end">
                              <SearchIcon style={{ color: blue[500] }} />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </FormControl>
                </div>
                <div className="col-4">
                  <FormControl variant="outlined" sx={{ width: "100%" }}>
                    <TextField
                      size="small"
                      labelId="bene-id-label"
                      value={inputBeneId || ""}
                      onChange={(e) => {
                        handleInputBeneChange(e);
                      }}
                      onKeyDown={(e) => {
                        handleBeneKeyDown(e);
                      }}
                      label="ID Penerima"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            {inputBeneId && (
                              <IconButton
                                onClick={(e) => {
                                  clearBeneId(e);
                                }}
                                edge="end"
                              >
                                <ClearIcon style={{ color: red[500] }} />
                              </IconButton>
                            )}
                            <IconButton onClick={handleBeneChange} edge="end">
                              <SearchIcon style={{ color: blue[500] }} />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </FormControl>
                </div>
                <div className="col-4">
                  <FormControl variant="outlined" sx={{ width: "100%" }}>
                    <TextField
                      size="small"
                      labelId="transaction-id-label"
                      value={inputTransactionId || ""}
                      onChange={(e) => {
                        handleInputTransactionChange(e);
                      }}
                      onKeyDown={(e) => {
                        handleTransactionKeyDown(e);
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
                              onClick={handleTransactionChange}
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
              </div>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}></Box>
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
                          <TableRow
                            key={idx}
                            sx={{
                              backgroundColor:
                                idx % 2 === 0 ? "grey.100" : "background.paper",
                            }}
                          >
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
                          data.map((row, idx) => (
                            <TableRow
                              key={row.p2p_transaction_id}
                              sx={{
                                backgroundColor:
                                  idx % 2 === 0
                                    ? "grey.100"
                                    : "background.paper",
                              }}
                            >
                              {transactionFundColumns.map((column) => (
                                <TableCell key={column.field}>
                                  {column.field === "aml_ismoneylaundering" ||
                                  column.field === "p2p_issuspicious" ||
                                  column.field ===
                                    "customer_sender_pinjol_account" ||
                                  column.field ===
                                    "customer_bene_pinjol_account"
                                    ? row[column.field] == 1
                                      ? "Ya"
                                      : "Tidak"
                                    : column.field === "aml_rp_amount"
                                    ? `Rp ${Math.floor(
                                        row[column.field]
                                      ).toLocaleString()}`
                                    : column.field === "aml_time_step"
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

      <Dialog open={chatDialogIsOpen} onClose={closeChatDialog}>
        <DialogTitle style={{ textAlign: "center" }}>
          Anda akan membuat tiket obrolan
          <br />
          Asisten AI dengan kriteria data berikut:
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {laundering && (
              <>
                - Status Pencucian Uang:{" "}
                {laundering === "0"
                  ? "Tidak"
                  : laundering === "1"
                  ? "Iya"
                  : "Semua"}
                <br />
              </>
            )}
            {suspicious && (
              <>
                - Status Kecurigaan P2PL:{" "}
                {suspicious === "0"
                  ? "Tidak"
                  : suspicious === "1"
                  ? "Iya"
                  : "Semua"}
                <br />
              </>
            )}
            {startDate && endDate && (
              <>
                - Rentang Waktu: {moment(startDate).format("D MMMM YYYY")} -{" "}
                {moment(endDate).format("D MMMM YYYY")}
                <br />
              </>
            )}
            {senderId && (
              <>
                - ID Pengirim: {senderId}
                <br />
              </>
            )}
            {beneId && (
              <>
                - ID Penerima: {beneId}
                <br />
              </>
            )}
            {transactionId && (
              <>
                - ID Transaksi: {transactionId}
                <br />
              </>
            )}
          </DialogContentText>
        </DialogContent>
        <DialogContent style={{ textAlign: "center" }}>
          <p style={{ fontSize: "18px" }}>Anda yakin ingin melanjutkan?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeChatDialog} color="primary">
            Tidak
          </Button>
          <Button onClick={createNewChat} color="primary">
            Ya
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TransactionFund;

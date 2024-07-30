import React, { useState, useRef, useEffect } from "react";
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  Fab,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemText,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TextField,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SendIcon from "@mui/icons-material/Send";
import { styled } from "@mui/system";
import { useLocation, useNavigate } from "react-router-dom";
import assets from "../../assets";
import axios from "axios";
import alertInfoColumns from "../../data/columns/alertInfoColumns";

const ChatSection = styled(Paper)({
  width: "100%",
  height: "80vh",
});

const BorderLeft500 = styled(Box)({
  borderLeft: "1px solid #e0e0e0",
});

const MessageArea = styled(List)({
  height: "70vh",
  overflowY: "auto",
});

const AiAssistantAnalysis = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [pageSize, setPageSize] = useState(5);
  const [page, setPage] = useState(0);
  const [totalRows, setTotalRows] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [dataFilter, setDataFilter] = useState("");
  const [loadingData, setLoadingData] = useState(false);
  const [data, setData] = useState([]);
  const [loadingResponse, setLoadingResponse] = useState(false);

  const messageAreaRef = useRef(null);
  const chatId = location.pathname.split("/")[2];

  useEffect(() => {
    setLoadingData(true);
    fetchDataFilter();
  }, []);

  useEffect(() => {
    if (dataFilter) {
      fetchData();
    }
  }, [dataFilter, page, pageSize]);

  useEffect(() => {
    fetchHistory();
  }, [chatId]);

  const fetchDataFilter = async () => {
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
          `${process.env.REACT_APP_API_URL}/chat/${chatId}`,
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const responseData = response.data.data;
        setDataFilter(responseData.aml_data_filter);
      } else {
        console.error("Token not found in the login response");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchData = async () => {
    setLoadingData(true);
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
          `${process.env.REACT_APP_API_URL}/alert-detail`,
          {
            params: {
              pageSize: pageSize,
              page: page + 1,
              dataFilter: dataFilter || null,
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

  const fetchHistory = async () => {
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
          `${process.env.REACT_APP_API_URL}/chat-detail/${chatId}`,
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const responseData = response.data.data;
        const mappedData = responseData.map((item) => item.chat_content);
        setChatHistory(mappedData);
      } else {
        console.error("Token not found in the login response");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const sendChat = async (prompt) => {
    setLoadingResponse(true);
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

        const createdAt = new Date().toISOString();
        let body = {
          chat_content: prompt,
          chat_history_id: chatId,
          created_by: "John Doe",
          created_at: createdAt,
        };

        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/chat-detail`,
          body,
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setChatHistory([
          ...chatHistory.slice(0, chatHistory.length - 1),
          response.data.detail,
        ]);
      } else {
        console.error("Token not found in the login response");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoadingResponse(false);
    }
  };

  useEffect(() => {
    if (messageAreaRef.current) {
      messageAreaRef.current.scrollTop = messageAreaRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPageSize(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSend = () => {
    setChatHistory([
      ...chatHistory,
      { prompt: inputValue, response: { text: "loading", imageUrl: null } },
    ]);
    if (inputValue.trim() !== "") {
      sendChat(inputValue);
      setInputValue("");
    }
  };

  return (
    <Box>
      <Grid container>
        <Grid item xs={12} sx={{ marginBottom: "20px" }}>
          <Typography variant="h5" className="header-message">
            Asisten AI
          </Typography>
          <Typography>Nomor Tiket: {"T20240721000002" || ""}</Typography>
        </Grid>
      </Grid>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          Lihat Detail Data
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ width: "100%", marginTop: "10px" }}>
            {loadingData ? (
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      {alertInfoColumns.map((column) => (
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
                        {alertInfoColumns.map((column) => (
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
                      {alertInfoColumns.map((column) => (
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
                              idx % 2 === 0 ? "grey.100" : "background.paper",
                          }}
                        >
                          {alertInfoColumns.map((column) => (
                            <TableCell key={column.field}>
                              {column.field === "aml_ismoneylaundering" ||
                              column.field === "p2p_issuspicious" ||
                              column.field ===
                                "customer_sender_pinjol_account" ||
                              column.field === "customer_bene_pinjol_account"
                                ? row[column.field] == 1
                                  ? "Ya"
                                  : "Tidak"
                                : column.field === "aml_rp_amount" ||
                                  column.field === "p2p_borrower_income"
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
                                : column.field === "aml_risk_score" &&
                                  typeof row[column.field] === "number"
                                ? row[column.field].toFixed(2)
                                : column.field === "aml_fuzzy_result"
                                ? row[column.field].replace(/^\[|\]$/g, "")
                                : row[column.field]}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell
                          colSpan={alertInfoColumns.length}
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
        </AccordionDetails>
      </Accordion>

      <ChatSection>
        <Grid container>
          <Grid item xs={12}>
            <BorderLeft500>
              <MessageArea
                style={{ backgroundColor: "#f8f8f8" }}
                ref={messageAreaRef}
              >
                {chatHistory.map((chat, index) => (
                  <React.Fragment key={index}>
                    {/* User's Chat */}
                    <ListItem
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        marginTop: "30px",
                        marginBottom: "20px",
                      }}
                    >
                      <Grid
                        key={index}
                        item
                        xs={12}
                        sx={{
                          display: "flex",
                          justifyContent: "flex-end",
                        }}
                      >
                        <div
                          style={{
                            backgroundColor: "#90A4AE",
                            borderRadius: "10px",
                            padding: "10px",
                            display: "inline-block",
                            textAlign: "right",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {chat.prompt}
                        </div>
                      </Grid>
                    </ListItem>

                    {/* AI Response */}
                    <ListItem
                      style={{ margin: "auto" }}
                      sx={{
                        textAlign: "center",
                        backgroundColor: "#f8f8f8",
                        borderRadius: "10px",
                        margin: "10px 0",
                        padding: "10px",
                        maxWidth: "90%",
                      }}
                    >
                      <Grid container justifyContent="center">
                        {chat.response?.text === "Analyzing Data" && (
                          <Grid item xs={12}>
                            ...
                          </Grid>
                        )}
                        {chat.response?.text && (
                          <Grid item xs={12}>
                            <ListItemText
                              align="center"
                              primary={chat.response.text}
                            />
                          </Grid>
                        )}
                        {chat.response?.imageUrl && (
                          <Grid item xs={12}>
                            <Box sx={{ textAlign: "center" }}>
                              <img
                                src={chat.response.imageUrl}
                                alt="response"
                                style={{ width: "800px" }}
                              />
                            </Box>
                          </Grid>
                        )}
                      </Grid>
                    </ListItem>
                  </React.Fragment>
                ))}
              </MessageArea>
              <Divider />
              <Grid container sx={{ padding: "20px" }}>
                <Grid item xs={11}>
                  <TextField
                    id="outlined-basic-email"
                    label="Type Something"
                    fullWidth
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSend();
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={1} align="right">
                  <Fab color="primary" aria-label="send" onClick={handleSend}>
                    <SendIcon />
                  </Fab>
                </Grid>
              </Grid>
            </BorderLeft500>
          </Grid>
        </Grid>
      </ChatSection>
    </Box>
  );
};

export default AiAssistantAnalysis;

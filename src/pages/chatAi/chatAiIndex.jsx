import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { useNavigate } from "react-router-dom";
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
  IconButton,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Tooltip,
} from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import DoNotDisturbIcon from "@mui/icons-material/DoNotDisturb";
import CustomDateRange from "../../components/common/CustomDateRange";
import chatColumns from "../../data/columns/chatColumns";

const ChatAiIndex = () => {
  const navigate = useNavigate();

  const [loadingData, setLoadingData] = useState(false);
  const [data, setData] = useState([]);
  const [startDate, setStartDate] = useState(new Date("2024-07-01"));
  const [endDate, setEndDate] = useState(new Date("2024-07-31"));
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(0);
  const [totalRows, setTotalRows] = useState(0);
  const [archiveDialogIsOpen, setArchiveDialogIsOpen] = useState(false);
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [selectedTicketNo, setSelectedTicketNo] = useState(null);

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

      if (loginRespData) {
        token = loginRespData.access_token;

        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/chat`,
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

  const handleSubmitArchive = () => {
    const submitArchive = async () => {
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
            chat_history_id: selectedChatId,
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
          closeArchiveDialog();
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

    submitArchive();
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

  const openArchiveDialog = (id, ticketNo) => {
    setArchiveDialogIsOpen(true);
    setSelectedChatId(id);
    setSelectedTicketNo(ticketNo);
  };

  const closeArchiveDialog = () => {
    setArchiveDialogIsOpen(false);
    setSelectedChatId(null);
    setSelectedTicketNo(null);
  };

  const actionColumn = {
    field: "action",
    headerName: "Aksi",
    width: 80,
    renderCell: (params) => (
      <>
        <Tooltip title="Buka obrolan ini">
          <IconButton
            onClick={() =>
              window.open(`/chat/${params.row.chat_history_id}`, "_blank")
            }
          >
            <ChatIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Arsipkan obrolan">
          <IconButton
            onClick={() =>
              openArchiveDialog(
                params.row.chat_history_id,
                params.row.chat_ticket_no
              )
            }
          >
            <DoNotDisturbIcon />
          </IconButton>
        </Tooltip>
      </>
    ),
  };

  const handleNewChat = () => {
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

          const createdAt = new Date().toISOString();
          let body = {
            aml_data_filter: "",
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

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <h3 style={{ marginBottom: "45px " }}>
                Riwayat Obrolan Asisten AI
              </h3>
              <div style={{ marginBottom: "5px " }} className="row">
                <div className="col-6">
                  <CustomDateRange
                    onChange={(x, j) => handleDateRangeChange(x, j)}
                    value={[startDate, endDate]}
                  />
                </div>
              </div>
              <Box sx={{ minHeight: 200, width: "100%", marginTop: "16px" }}>
                {loadingData ? (
                  <TableContainer sx={{ maxHeight: "100vh" }}>
                    <Table stickyHeader>
                      <TableHead>
                        <TableRow>
                          <TableCell>{actionColumn.headerName}</TableCell>
                          {chatColumns.map((column) => (
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
                            {chatColumns.map((column) => (
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
                          {chatColumns.map((column) => (
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
                              key={row.chat_history_id}
                              sx={{
                                backgroundColor:
                                  idx % 2 === 0
                                    ? "grey.100"
                                    : "background.paper",
                              }}
                            >
                              <TableCell>
                                {actionColumn.renderCell({ row })}
                              </TableCell>
                              {chatColumns.map((column) => (
                                <TableCell key={column.field}>
                                  {column.field === "created_at"
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
                              colSpan={chatColumns.length + 1}
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

      <Dialog open={archiveDialogIsOpen} onClose={closeArchiveDialog}>
        <DialogTitle style={{ textAlign: "center" }}>
          Anda akan mengarsipkan obrolan dengan
          <br />
          Nomor Tiket: {selectedTicketNo}
        </DialogTitle>
        <DialogContent>
          <DialogContentText style={{ paddingTop: "20px" }}></DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeArchiveDialog} color="primary">
            Tutup
          </Button>
          <Button onClick={handleSubmitArchive} color="primary">
            Arsipkan
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ChatAiIndex;

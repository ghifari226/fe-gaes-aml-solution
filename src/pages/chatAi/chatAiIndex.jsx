import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { useNavigate } from "react-router-dom";
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
  IconButton,
} from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import CustomDateRange from "../../components/common/CustomDateRange";
import chatColumns from "../../data/columns/chatColumns";

const ChatAiIndex = () => {
  const navigate = useNavigate();

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

  const actionColumn = {
    field: "action",
    headerName: "Action",
    width: 80,
    renderCell: (params) => (
      <IconButton
        onClick={() =>
          window.open(`/chat/${params.row.chat_history_id}`, "_blank")
        }
      >
        <ChatIcon />
      </IconButton>
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
      <h3>Analisis Pinjaman Online</h3>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Button
                style={{ margin: 0 }}
                onClick={handleNewChat}
                variant="contained"
                color="primary"
              >
                Mulai Obrolan Baru
              </Button>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <CustomDateRange
                  onChange={(x, j) => handleDateRangeChange(x, j)}
                  value={[startDate, endDate]}
                />
              </Box>
              <Box sx={{ minHeight: 200, width: "100%", marginTop: "16px" }}>
                {loadingData ? (
                  <TableContainer>
                    <Table>
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
                          <TableRow key={idx}>
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
                  <TableContainer>
                    <Table>
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
                          data.map((row) => (
                            <TableRow key={row.chat_history_id}>
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
    </div>
  );
};

export default ChatAiIndex;

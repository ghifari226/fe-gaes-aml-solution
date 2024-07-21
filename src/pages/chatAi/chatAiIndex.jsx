import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import chatColumns from "../../data/columns/chatColumns";
import ChatIcon from "@mui/icons-material/Chat";
import axios from "axios";

const ChatAiIndex = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const actionColumn = {
    field: "action",
    headerName: "Action",
    width: 80,
    renderCell: (params) => (
      <IconButton
        onClick={() =>
          window.open(
            `/chat/${params.row.chat_history_id}`,
            "_blank"
          )
        }
      >
        <ChatIcon />
      </IconButton>
    ),
  };

  const [data, setData] = useState([]);
  const columnsWithAction = [actionColumn, ...chatColumns];

  useEffect(() => {
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
            `${process.env.REACT_APP_API_URL}/chat`,
            {
              // params: {
              //   start_date: moment(startDate).format("YYYY-MM-DD"),
              //   end_date: moment(endDate).format("YYYY-MM-DD"),
              // },
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

    fetchData();
  }, []);

  const handleNewChatClick = () => {
    navigate("/transactions-analysis/loan");
  };

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                }}
              >
                <Typography variant="h6" gutterBottom>
                  Indeks Riwayat Obrolan
                </Typography>
              </div>
              <Box>
                <DataGrid
                  getRowId={(row) => row.chat_history_id}
                  rows={data}
                  columns={columnsWithAction}
                  initialState={{
                    pagination: {
                      paginationModel: {
                        pageSize: 5,
                      },
                    },
                  }}
                  pageSizeOptions={[5]}
                  // checkboxSelection
                  disableRowSelectionOnClick
                  // onRowSelectionModelChange={(ids) => handleSelectionModelChange(ids)}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Button onClick={handleNewChatClick}>
        Mulai obrolan baru
      </Button>
    </Box>
  );
};

export default ChatAiIndex;

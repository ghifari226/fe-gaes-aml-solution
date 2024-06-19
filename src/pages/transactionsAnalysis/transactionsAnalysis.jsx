import React, { useState, useEffect } from "react";
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
  Tab,
  Tabs,
  Tooltip,
  Typography,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { styled } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useLocation, useNavigate } from "react-router-dom";
import transactionData from "../../data/transactionData";

const CustomTab = styled(Tab)(({ theme }) => ({
  // border: "1px solid",
  // borderColor: theme.palette.primary.main,
  borderRadius: "4px",
  margin: "0 4px",
  color: "#000",
  "&.Mui-selected": {
    backgroundColor: "#121288",
    color: "#fff",
  },
}));

const MultiplePrediction = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState(transactionData.rows);
  const [columns, setColumns] = useState(transactionData.loanAnalysisColumns);
  const [title, setTitle] = useState("Loan Analysis");
  const [openUploadDialog, setOpenUploadDialog] = useState(false);
  const [openPredictDialog, setOpenPredictDialog] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const [value, setValue] = React.useState(0);

  useEffect(() => {
    if (location.pathname.includes("loan")) {
      setColumns(transactionData.loanAnalysisColumns);
      setTitle("Loan Analysis");
      setValue(0);
    } else if (location.pathname.includes("money-laundering")) {
      setColumns(transactionData.moneyLaunderingColumns);
      setTitle("Money Laundering Analysis");
      setValue(1);
    }
  }, [location.pathname]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (newValue === 0) {
      setColumns(transactionData.loanAnalysisColumns);
      setTitle("Loan Analysis");
      navigate("/transactions-analysis/loan");
    } else {
      setColumns(transactionData.moneyLaunderingColumns);
      setTitle("Money Laundering Analysis");
      navigate("/transactions-analysis/money-laundering");
    }
  };

  const handleUploadClick = () => {
    setOpenUploadDialog(true);
  };

  const handlePredictClick = () => {
    setOpenPredictDialog(true);
  };

  const handleCloseUploadDialog = () => {
    setOpenUploadDialog(false);
  };

  const handleClosePredictDialog = () => {
    setOpenPredictDialog(false);
  };

  const handleSelectionModelChange = (ids) => {
    const selectedIDs = new Set(ids);
    const selectedRows = transactionData.rows.filter((row) =>
      selectedIDs.has(row.id)
    );
    setSelectedRows(selectedRows);
  };

  const [selectedRows, setSelectedRows] = useState([]);

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
    country: "USA",
  };

  const toCustomer = {
    name: "Jane Smith",
    type: "Company",
    country: "Canada",
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Box>
                <Tabs value={value} onChange={handleChange}>
                  <CustomTab label="Loan" />
                  <CustomTab label="Money Laundering" />
                </Tabs>
              </Box>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: "15px",
                }}
              >
                <h2>{title}</h2>
              </div>
              <Box sx={{ minHeight: 400, width: "100%" }}>
                <DataGrid
                  rows={data}
                  columns={columns}
                  initialState={{
                    pagination: {
                      paginationModel: {
                        pageSize: 5,
                      },
                    },
                  }}
                  pageSizeOptions={[5]}
                  checkboxSelection
                  disableRowSelectionOnClick
                  onRowSelectionModelChange={(ids) =>
                    handleSelectionModelChange(ids)
                  }
                />
                {/* <pre style={{ fontSize: 10 }}>
                  {JSON.stringify(selectedRows, null, 4)}
                </pre> */}
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "10px",
                }}
              >
                {/* <Button
                  variant="contained"
                  color="primary"
                  disabled={selectedRows.length === 0}
                  onClick={handlePredictClick}
                >
                  {selectedRows.length === transactionData.rows.length
                    ? "Predict All"
                    : "Predict"}
                </Button> */}
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "20px",
                  marginBottom: "20px",
                }}
              >
                {/* <Button
                  sx={{
                    minHeight: "80px",
                    minWidth: "200px",
                    marginRight: "80px",
                  }}
                  variant="contained"
                  color="primary"
                  disabled={selectedRows.length === 0}
                  onClick={handlePredictClick}
                >
                  {"FUZZY ANALYSIS"}
                </Button> */}
                <Button
                  sx={{ minHeight: "80px", minWidth: "200px" }}
                  variant="contained"
                  color="primary"
                  disabled={selectedRows.length === 0}
                  component={Link}
                  to="/ai-assistant/analysis/623958173256"
                  target="_blank"
                >
                  {"Start New Chat with AI Assistant"}
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Upload Dialog */}
      <Dialog open={openUploadDialog} onClose={handleCloseUploadDialog}>
        <DialogTitle>CSV Upload</DialogTitle>
        <DialogContent>
          <DialogContentText>
            CSV upload for future implementation.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseUploadDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Predict Dialog */}
      <Dialog open={openPredictDialog} onClose={handleClosePredictDialog}>
        <DialogTitle>Fuzzy Analysis</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {"Violation of Fuzzy Rules: 1. transfer amount > 500,000,000"}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePredictDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default MultiplePrediction;

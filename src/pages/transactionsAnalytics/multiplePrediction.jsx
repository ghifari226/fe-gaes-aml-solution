import React, { useState } from "react";
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
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from 'react-router-dom';
import alertData from "../../data/alertData";

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
  const [data, setData] = useState(alertData.rows);
  const [columns, setColumns] = useState(alertData.columnsLoan);
  const [openUploadDialog, setOpenUploadDialog] = useState(false);
  const [openPredictDialog, setOpenPredictDialog] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    console.log(value)
    if (newValue === 0) {
      setColumns(alertData.columnsLoan);
    } else {
      setColumns(alertData.columns);
    };
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
    const selectedRows = alertData.rows.filter((row) =>
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
                  justifyContent: "space-between",
                  marginBottom: "10px",
                }}
              >
                {/* <div>Batch Prediction</div> */}
                {/* <Button variant="contained" onClick={handleUploadClick}>
                  Upload CSV
                </Button> */}
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
                  {selectedRows.length === alertData.rows.length
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
                <Button
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
                </Button>
                <Button
                  sx={{ minHeight: "80px", minWidth: "200px" }}
                  variant="contained"
                  color="primary"
                  disabled={selectedRows.length === 0}
                  component={Link}
                  to="/ai-analysis"
                  target="_blank"
                >
                  {"GENERATIVE ANALYSIS"}
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

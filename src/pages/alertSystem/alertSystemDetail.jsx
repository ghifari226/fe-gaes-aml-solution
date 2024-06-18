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
  IconButton,
  Tab,
  Tabs,
  Tooltip,
  Typography,
} from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';
import { DataGrid } from "@mui/x-data-grid";
import alertData from "../../data/alertData";

const MultiplePrediction = () => {
  const [data, setData] = useState(alertData.rows);
  const [columns, setColumns] = useState(alertData.columns);
  const [openUploadDialog, setOpenUploadDialog] = useState(false);
  const [openPredictDialog, setOpenPredictDialog] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);

  const [openFuzzyAnalysisDialog, setOpenFuzzyAnalysisDialog] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);

  const handleFuzzyAnalysisClick = (row) => {
    setSelectedRowData(row);
    setOpenFuzzyAnalysisDialog(true);
  };

  const handleCloseFuzzyAnalysisDialog = () => {
    setOpenFuzzyAnalysisDialog(false);
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
    const selectedRows = alertData.rows.filter((row) => selectedIDs.has(row.id));
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
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                }}
              >
                <Typography variant="h6" gutterBottom>
                  Alerts
                </Typography>
              </div>
              <Box sx={{ minHeight: 400, width: "100%" }}>
                <DataGrid
                  rows={data}
                  columns={[
                    {
                      field: "fuzzyAnalysis",
                      headerName: "Fuzzy",
                      flex: 0.5,
                      renderCell: (params) => (
                        <Tooltip
                          title={
                            <Typography variant="body1">
                              {`Violation of fuzzy rules:\n${params.row.fuzzyAnalysis
                                .map((rule, index) => `(${index + 1}) ${rule};`)
                                .join(" ")}`}
                            </Typography>
                          }
                          placement="right"
                          arrow
                        >
                          <IconButton
                            onClick={() => handleFuzzyAnalysisClick(params.row)}
                            size="small"
                          >
                            <InfoIcon />
                          </IconButton>
                        </Tooltip>
                      ),
                    },
                    ...columns
                  ]}
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
            </CardContent>
          </Card>
        </Grid>

        {/* Cards Section */}
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={5}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Alert Information
                  </Typography>
                  <Grid container spacing={1}>
                    <Grid item xs={6}>
                      <Typography variant="body2">Alert ID:</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2">
                        {alertInfo.alertId}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2">
                        Score (out of 100):
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2">{alertInfo.score}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2">Queue:</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2">{alertInfo.queue}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2">
                        Actionable Entity Name:
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2">
                        {alertInfo.actionableEntityName}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2">
                        Actionable Entity ID:
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2">
                        {alertInfo.actionableEntityId}
                      </Typography>
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
                      <Typography variant="body2">
                        {statusInfo.status}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2">Hold:</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2">{statusInfo.hold}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2">Suppress:</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2">
                        {statusInfo.suppress}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2">Productive:</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2">
                        {statusInfo.productive}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2">Last Updated By:</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2">
                        {statusInfo.lastUpdatedBy}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2">
                        Last Updated Date:
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2">
                        {statusInfo.lastUpdatedDate}
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={7}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Transaction Flow
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Card>
                        <CardContent>
                          <Typography variant="h6" gutterBottom>
                            From Customer
                          </Typography>
                          <Typography variant="body2">
                            Name: {fromCustomer.name}
                          </Typography>
                          <Typography variant="body2">
                            Type: {fromCustomer.type}
                          </Typography>
                          <Typography variant="body2">
                            Country: {fromCustomer.country}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid item xs={6}>
                      <Card>
                        <CardContent>
                          <Typography variant="h6" gutterBottom>
                            To Customer
                          </Typography>
                          <Typography variant="body2">
                            Name: {toCustomer.name}
                          </Typography>
                          <Typography variant="body2">
                            Type: {toCustomer.type}
                          </Typography>
                          <Typography variant="body2">
                            Country: {toCustomer.country}
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
                      href="https://neo4j.com"
                      target="_blank"
                    >
                      Proceed to Neo4j
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
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
        <DialogTitle>Prediction</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Selected Rows: {selectedRows.join(", ")}
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

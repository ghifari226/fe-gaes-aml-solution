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
import InfoIcon from "@mui/icons-material/Info";
import { DataGrid } from "@mui/x-data-grid";
import transactionData from "../../data/transactionData";

const MultiplePrediction = () => {
  const [data, setData] = useState(transactionData.rows);
  const [columns, setColumns] = useState(transactionData.alertColumns);
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
    country: "China",
  };

  const toCustomer = {
    name: "Jane Smith",
    type: "Company",
    country: "Indonesia",
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
                  Rincian Peringatan
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
                    ...columns,
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
                  {selectedRows.length === transactionData.rows.length
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
                    Detail Peringatan
                  </Typography>
                  <Grid container spacing={1}>
                    <Grid item xs={6}>
                      <Typography variant="body2">ID:</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2">
                        {alertInfo.alertId}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2">
                        Skor (dari 100):
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2">{alertInfo.score}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2">Antrian:</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2">{alertInfo.queue}</Typography>
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
                    Alur Transaksi
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Card>
                        <CardContent>
                          <Typography variant="h6" gutterBottom>
                            Dari Nasabah
                          </Typography>
                          <Typography variant="body2">
                            Nama: {fromCustomer.name}
                          </Typography>
                          <Typography variant="body2">
                            Tipe: {fromCustomer.type}
                          </Typography>
                          <Typography variant="body2">
                            Negara: {fromCustomer.country}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid item xs={6}>
                      <Card>
                        <CardContent>
                          <Typography variant="h6" gutterBottom>
                            Ke Nasabah
                          </Typography>
                          <Typography variant="body2">
                            Nama: {toCustomer.name}
                          </Typography>
                          <Typography variant="body2">
                            Tipe: {toCustomer.type}
                          </Typography>
                          <Typography variant="body2">
                            Negara: {toCustomer.country}
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
                      href="/social-network-analysis"
                      // target="_blank"
                    >
                      Analisis Lebih Lanjut
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

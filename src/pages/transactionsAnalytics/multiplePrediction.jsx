import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import amlData from "../../data/amlData";

const MultiplePrediction = () => {
  const [data, setData] = useState(amlData.rows);
  const [openUploadDialog, setOpenUploadDialog] = useState(false);
  const [openPredictDialog, setOpenPredictDialog] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);

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
    const selectedRows = amlData.rows.filter((row) => selectedIDs.has(row.id));
    setSelectedRows(selectedRows);
  };

  const [selectedRows, setSelectedRows] = useState([]);

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "10px",
        }}
      >
        <div>Batch Prediction</div>
        <Button variant="contained" onClick={handleUploadClick}>
          Upload CSV
        </Button>
      </div>
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={data}
          columns={amlData.columns}
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
          onRowSelectionModelChange={(ids) => handleSelectionModelChange(ids)}
        />
        <pre style={{ fontSize: 10 }}>
          {JSON.stringify(selectedRows, null, 4)}
        </pre>
      </Box>
      <Box
        sx={{ display: "flex", justifyContent: "center", marginTop: "10px" }}
      >
        <Button
          variant="contained"
          color="primary"
          disabled={selectedRows.length === 0}
          onClick={handlePredictClick}
        >
          {selectedRows.length === amlData.rows.length ? 'Predict All' : 'Predict'}
        </Button>
      </Box>

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

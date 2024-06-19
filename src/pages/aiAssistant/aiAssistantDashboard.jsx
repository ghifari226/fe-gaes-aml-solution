import React from "react";
import { Box, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import aiAssistantData from "../../data/aiAssistantData";
import ChatIcon from "@mui/icons-material/Chat";

const AiAssistantDashboard = () => {
  // Define the action column
  const actionColumn = {
    field: "action",
    headerName: "Action",
    width: 80,
    renderCell: (params) => (
      <IconButton
        onClick={() =>
          window.open(`/ai-assistant/analysis/${params.row.ticketNumber}`, "_blank")
        }
      >
        <ChatIcon />
      </IconButton>
    ),
  };

  // Add the action column to the existing columns
  const columnsWithAction = [actionColumn, ...aiAssistantData.columns];

  return (
    <Box>
      <DataGrid
        rows={aiAssistantData.rows}
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
  );
};

export default AiAssistantDashboard;

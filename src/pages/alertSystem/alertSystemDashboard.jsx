import React from "react";
import { Card, CardContent } from "@mui/material";
import { styled } from "@mui/system";

const WhiteCard = styled(Card)({
  backgroundColor: "#FFFFFF",
  padding: "20px",
  marginBottom: "20px",
});

const AlertSystemDashboard = () => {
  return (
    <>
      <WhiteCard>
        <CardContent>Dashboard</CardContent>
      </WhiteCard>
    </>
  );
};

export default AlertSystemDashboard;

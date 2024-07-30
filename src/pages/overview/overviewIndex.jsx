import React, { useState } from "react";
import {
  Card,
} from "@mui/material";

const OverviewIndex = () => {
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>TIRTASENA-AML</h1>
      <div className="row mt-4">
        <div className="col-4">
          <Card style={{ minHeight: "200px" }}></Card>
        </div>
        <div className="col-4">
          <Card style={{ minHeight: "200px" }}></Card>
        </div>
        <div className="col-4">
          <Card style={{ minHeight: "200px" }}></Card>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-12">
          <Card style={{ minHeight: "600px" }}></Card>
        </div>
      </div>
    </div>
  );
};

export default OverviewIndex;

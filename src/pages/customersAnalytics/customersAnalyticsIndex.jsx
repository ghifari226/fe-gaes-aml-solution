import React from "react";
import { Box, Typography, Button, Card, CardContent } from "@mui/material";
import { styled } from "@mui/system";
import assets from "../../assets";

const Image = styled("img")({
  width: "100%",
  height: "auto",
  display: "block",
  margin: "0 auto",
});

const PeopleAnalyticsIndex = () => {
  return (
    <Image
      src={assets.images.neo4j}
      alt="Neo4j"
      style={{ width: "1350px", maxWidth: "none", maxHeight: "none" }}
    />
  );
};

export default PeopleAnalyticsIndex;

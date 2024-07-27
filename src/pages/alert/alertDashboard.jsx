import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { Card, CardContent, Grid, Typography } from "@mui/material";
import {
  PieChart,
  Pie,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { styled } from "@mui/system";

// Define the WhiteCard styled component
const WhiteCard = styled(Card)({
  backgroundColor: "#FFFFFF",
  padding: "20px",
  marginBottom: "20px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
});

const colors = ["#82ca9d", "#8884d8", "#ffc658", "#d0ed57"];

const SmallCard = ({ color, title, value }) => (
  <Card style={{ backgroundColor: color, height: "100%" }}>
    <CardContent>
      <Typography variant="subtitle1">{title}</Typography>
      <Typography variant="h4">{value}</Typography>
    </CardContent>
  </Card>
);

const AlertDashboard = () => {
  const [startDate, setStartDate] = useState(new Date("2022-07-01"));
  const [endDate, setEndDate] = useState(new Date("2022-07-31"));
  const [viz1, setViz1] = useState({});
  const [viz2, setViz2] = useState({});
  const [viz3, setViz3] = useState({});
  const [viz4, setViz4] = useState({});

  const [dataPie, setDataPie] = useState([
    { name: "Not Suspicious", value: 1, fill: "#ff6c5c" },
    { name: "Suspicious", value: 1, fill: "#82a4ca" },
  ]);
  useEffect(() => {
    setDataPie([
      { name: "Not Suspicious", value: viz2.notSuspicious, fill: "#ff6c5c" },
      { name: "Suspicious", value: viz2.suspicious, fill: "#82a4ca" },
    ])
  }, [viz2])
  
  const [dataBarAge, setDataBarAge] = useState([
    { name: "0-5", value: 1 },
    { name: "6-10", value: 1 },
    { name: "11-15", value: 1 },
    { name: "16+", value: 1 },
  ]);
  useEffect(() => {
    setDataBarAge([
      { name: "0-5", value: viz3.within5d },
      { name: "6-10", value: viz3.within10d },
      { name: "11-15", value: viz3.within15d },
      { name: "16+", value: viz3.olderThan15d },
    ])
  }, [viz3])
  
  const [dataBarScore, setDataBarScore] = useState([
    { name: "10", value: 1, fill: "#82ca9d" },
    { name: "20", value: 1, fill: "#82ca9d" },
    { name: "30", value: 1, fill: "#82ca9d" },
    { name: "40", value: 1, fill: "#ffc658" },
    { name: "50", value: 1, fill: "#ffc658" },
    { name: "60", value: 1, fill: "#ffc658" },
    { name: "70", value: 1, fill: "#ffc658" },
    { name: "80", value: 1, fill: "#ff9999" },
    { name: "90", value: 1, fill: "#ff9999" },
    { name: "100", value: 1, fill: "#ff9999" },
  ]);
  useEffect(() => {
    setDataBarScore([
    { name: "10", value: viz4.percent10, fill: "#82ca9d" },
    { name: "20", value: viz4.percent20, fill: "#82ca9d" },
    { name: "30", value: viz4.percent30, fill: "#82ca9d" },
    { name: "40", value: viz4.percent40, fill: "#ffc658" },
    { name: "50", value: viz4.percent50, fill: "#ffc658" },
    { name: "60", value: viz4.percent60, fill: "#ffc658" },
    { name: "70", value: viz4.percent70, fill: "#ffc658" },
    { name: "80", value: viz4.percent80, fill: "#ff9999" },
    { name: "90", value: viz4.percent90, fill: "#ff9999" },
    { name: "100", value: viz4.percent100, fill: "#ff9999" },
    ])
  }, [viz4]);

  useEffect(() => {
    fetchData();
  }, []);

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

        // Fetch response1 and update viz1
        try {
          const response1 = await axios.get(
            `${process.env.REACT_APP_API_URL}/alert-viz1`,
            {
              params: {
                start_date: moment(startDate).format("YYYY-MM-DD"),
                end_date: moment(endDate).format("YYYY-MM-DD"),
              },
              headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setViz1(response1.data.data);
        } catch (error) {
          console.error("Error fetching data for viz1:", error);
        }

        // Fetch response2 and update viz2
        try {
          const response2 = await axios.get(
            `${process.env.REACT_APP_API_URL}/alert-viz2`,
            {
              params: {
                start_date: moment(startDate).format("YYYY-MM-DD"),
                end_date: moment(endDate).format("YYYY-MM-DD"),
              },
              headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setViz2(response2.data.data);
        } catch (error) {
          console.error("Error fetching data for viz2:", error);
        }

        // Fetch response3 and update viz3
        try {
          const response3 = await axios.get(
            `${process.env.REACT_APP_API_URL}/alert-viz3`,
            {
              params: {
                start_date: moment(startDate).format("YYYY-MM-DD"),
                end_date: moment(endDate).format("YYYY-MM-DD"),
              },
              headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setViz3(response3.data.data);
        } catch (error) {
          console.error("Error fetching data for viz3:", error);
        }

        // Fetch response4 and update viz4
        try {
          const response4 = await axios.get(
            `${process.env.REACT_APP_API_URL}/alert-viz4`,
            {
              params: {
                start_date: moment(startDate).format("YYYY-MM-DD"),
                end_date: moment(endDate).format("YYYY-MM-DD"),
              },
              headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setViz4(response4.data.data);
        } catch (error) {
          console.error("Error fetching data for viz4:", error);
        }
      } else {
        console.error("Token not found in the login response");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Grid container spacing={2}>
      {/* Top Left: 2x2 grid of small cards */}
      <Grid item xs={12} sm={6}>
        <WhiteCard style={{ height: "100%" }}>
          <Typography variant="h6">Status Peringatan</Typography>
          <Grid container spacing={2} style={{ height: "100%" }}>
            <Grid item xs={6}>
              <SmallCard
                color={colors[0]}
                title="Aktif - Belum Ditinjau"
                value={viz1.activeUnacknowledged || 0}
              />
            </Grid>
            <Grid item xs={6}>
              <SmallCard
                color={colors[1]}
                title="Aktif - Sudah Ditinjau"
                value={viz1.activeAcknowledged || 0}
              />
            </Grid>
            <Grid item xs={6}>
              <SmallCard
                color={colors[2]}
                title="Selesai - Tidak Terbukti"
                value={viz1.clearedUnproven || 0}
              />
            </Grid>
            <Grid item xs={6}>
              <SmallCard
                color={colors[3]}
                title="Selesai - Terkonfirmasi"
                value={viz1.clearedConfirmed || 0}
              />
            </Grid>
          </Grid>
        </WhiteCard>
      </Grid>
      {/* Top Right: Pie Chart */}
      <Grid item xs={12} sm={6}>
        <WhiteCard
          style={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="h6">Aktivitas Mencurigakan</Typography>
          <CardContent
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <PieChart width={400} height={400}>
              <Pie
                data={dataPie}
                dataKey="value"
                cx="50%"
                cy="50%"
                innerRadius={75}
                outerRadius={120}
                fill="#82ca9d"
                label
              />
            </PieChart>
          </CardContent>
        </WhiteCard>
      </Grid>
      {/* Bottom Left: Bar Chart (Age of active alerts) */}
      <Grid item xs={12} sm={12}>
        <WhiteCard>
          <Typography variant="h6">Usia Peringatan Aktif (hari)</Typography>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={dataBarAge}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </WhiteCard>
      </Grid>
      {/* Bottom Right: Bar Chart (Score distribution of active alerts) */}
      {/* <Grid item xs={12} sm={6}>
        <WhiteCard>
          <Typography variant="h6">Distribusi Skor Peringatan Aktif</Typography>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={dataBarScore}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </WhiteCard>
      </Grid> */}
    </Grid>
  );
};

export default AlertDashboard;

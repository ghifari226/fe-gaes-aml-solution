import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CircularProgress, Grid, Typography } from "@mui/material";
import { styled } from "@mui/system";
import {
  ComposedChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const StyledCard = styled(Card)(({ theme }) => ({
  minHeight: "150px",
  padding: theme.spacing(2),
  margin: theme.spacing(2),
  backgroundColor: "#f9f9f9",
  textAlign: "center",
}));

const TitleTypography = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div
        className="custom-tooltip"
        style={{
          backgroundColor: "#fff",
          border: "1px solid #ccc",
          padding: "10px",
        }}
      >
        <p className="label">Rentang Tanggal:</p>
        <p className="label">{`${payload[0].payload.weekStart} - ${payload[0].payload.weekEnd}`}</p>
      </div>
    );
  }

  return null;
};

const OverviewIndex = () => {
  const [loadingSummary, setLoadingSummary] = useState(false);
  const [summary, setSummary] = useState({});
  const [loadingTimeseries, setLoadingTimeseries] = useState(false);
  const [timeseries, setTimeseries] = useState([]);

  useEffect(() => {
    fetchSummary();
    fetchTimeseries();
  }, []);

  const fetchSummary = async () => {
    try {
      setSummary([]);
      setLoadingSummary(true);

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

        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/summary-viz`,
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setSummary(response.data.data);
        console.log(response.data.data);
      } else {
        console.error("Token not found in the login response");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoadingSummary(false);
    }
  };

  const fetchTimeseries = async () => {
    try {
      setTimeseries([]);
      setLoadingTimeseries(true);

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

        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/timeseries-viz`,
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setTimeseries(response.data.data);
        console.log(response.data.data);
      } else {
        console.error("Token not found in the login response");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoadingTimeseries(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <TitleTypography
        style={{ fontFamily: "'Crimson Text', serif" }}
        variant="h4"
        align="center"
      >
        TIRTASENA ANTI MONEY LAUNDERING
      </TitleTypography>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} md={4}>
          <StyledCard>
            {loadingSummary ? (
              <CircularProgress />
            ) : (
              <>
                <Typography variant="h6">Total Transaksi Bank</Typography>
                <Typography variant="h2" className="mt-2">
                  {summary.amlCount ? summary.amlCount.toLocaleString() : ""}
                </Typography>
              </>
            )}
          </StyledCard>
        </Grid>
        <Grid item xs={12} md={4}>
          <StyledCard>
            {loadingSummary ? (
              <CircularProgress />
            ) : (
              <>
                <Typography variant="h6">
                  Total Transaksi Pinjaman Online
                </Typography>
                <Typography variant="h2" className="mt-2">
                  {summary.p2plCount ? summary.p2plCount.toLocaleString() : ""}
                </Typography>
              </>
            )}
          </StyledCard>
        </Grid>
        <Grid item xs={12} md={4}>
          <StyledCard>
            {loadingSummary ? (
              <CircularProgress />
            ) : (
              <>
                <Typography variant="h6">Total Nasabah</Typography>
                <Typography variant="h2" className="mt-2">
                  {summary.customerCount ? summary.customerCount.toLocaleString() : ""}
                </Typography>
              </>
            )}
          </StyledCard>
        </Grid>
        <Grid item xs={12}>
          <StyledCard>
            <Typography variant="h6" gutterBottom>
              Transaksi Terindikasi Pencucian Uang (Mingguan)
            </Typography>
            {loadingTimeseries ? (
              <CircularProgress />
            ) : (
              <ResponsiveContainer width="100%" height={500}>
                <ComposedChart
                  data={timeseries}
                  margin={{
                    top: 20,
                    right: 20,
                    bottom: 20,
                    left: 20,
                  }}
                >
                  <CartesianGrid stroke="#f5f5f5" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="ml1Total"
                    name="Pencucian Uang"
                    stroke="#ff0000"
                  />
                </ComposedChart>
              </ResponsiveContainer>
            )}
          </StyledCard>
        </Grid>
      </Grid>
    </div>
  );
};

export default OverviewIndex;

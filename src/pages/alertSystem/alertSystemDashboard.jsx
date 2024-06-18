import React from 'react';
import { Card, CardContent, Grid, Typography } from '@mui/material';
import { PieChart, Pie, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import { styled } from '@mui/system';

// Define the WhiteCard styled component
const WhiteCard = styled(Card)({
  backgroundColor: "#FFFFFF",
  padding: "20px",
  marginBottom: "20px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
});

const dataPie = [
  { name: 'Acknowledged', value: 844, fill: '#82a4ca' },
  { name: 'Unacknowledged', value: 430, fill: '#ff6c5c' },
];

const dataBarAge = [
  { name: '0-5', uv: 302 },
  { name: '6-10', uv: 86 },
  { name: '11-15', uv: 27 },
  { name: '16+', uv: 9 },
];

const dataBarScore = [
  { name: '10', value: 48, fill: '#82ca9d' },
  { name: '20', value: 45, fill: '#82ca9d' },
  { name: '30', value: 38, fill: '#82ca9d' },
  { name: '40', value: 40, fill: '#ffc658' },
  { name: '50', value: 34, fill: '#ffc658' },
  { name: '60', value: 37, fill: '#ffc658' },
  { name: '70', value: 55, fill: '#ffc658' },
  { name: '80', value: 30, fill: '#ff9999' },
  { name: '90', value: 45, fill: '#ff9999' },
  { name: '100', value: 35, fill: '#ff9999' },
];

const colors = ['#82ca9d', '#8884d8', '#ffc658', '#d0ed57'];

const SmallCard = ({ color, title, value }) => (
  <Card style={{ backgroundColor: color, height: '100%' }}>
    <CardContent>
      <Typography variant="subtitle1">{title}</Typography>
      <Typography variant="h4">{value}</Typography>
    </CardContent>
  </Card>
);

const AlertSystemDashboard = () => {
  return (
    <Grid container spacing={2}>
      {/* Top Left: 2x2 grid of small cards */}
      <Grid item xs={12} sm={6}>
        <WhiteCard style={{ height: '100%' }}>
          <Typography variant="h6">Alert Status</Typography>
          <Grid container spacing={2} style={{ height: '100%' }}>
            <Grid item xs={6}>
              <SmallCard color={colors[0]} title="Active Acknowledged" value="398" />
            </Grid>
            <Grid item xs={6}>
              <SmallCard color={colors[1]} title="Cleared Acknowledged" value="446" />
            </Grid>
            <Grid item xs={6}>
              <SmallCard color={colors[2]} title="Active Unacknowledged" value="392" />
            </Grid>
            <Grid item xs={6}>
              <SmallCard color={colors[3]} title="Cleared Unacknowledged" value="38" />
            </Grid>
          </Grid>
        </WhiteCard>
      </Grid>
      {/* Top Right: Pie Chart */}
      <Grid item xs={12} sm={6}>
        <WhiteCard style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Typography variant="h6">Detection Summary</Typography>
          <CardContent style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <PieChart width={400} height={400}>
              <Pie data={dataPie} dataKey="value" cx="50%" cy="50%" innerRadius={75} outerRadius={120} fill="#82ca9d" label />
            </PieChart>
          </CardContent>
        </WhiteCard>
      </Grid>
      {/* Bottom Left: Bar Chart (Age of active alerts) */}
      <Grid item xs={12} sm={6}>
        <WhiteCard>
          <Typography variant="h6">Age of Active Alerts (days)</Typography>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={dataBarAge}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="uv" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </WhiteCard>
      </Grid>
      {/* Bottom Right: Bar Chart (Score distribution of active alerts) */}
      <Grid item xs={12} sm={6}>
        <WhiteCard>
          <Typography variant="h6">Score Distribution of Active Alerts</Typography>
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
      </Grid>
    </Grid>
  );
};

export default AlertSystemDashboard;
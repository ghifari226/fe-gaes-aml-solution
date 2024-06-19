import React from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const AiAnalysisIndex = () => {
  return (
    <Box>
      <Tabs
        value={false}
        indicatorColor="primary"
        textColor="primary"
        centered
        aria-label="transactions analytics tabs"
      >
        <Tab label="AI Analysis" component={Link} to="/transactions-analytics/ai-analysis" />
        <Tab label="Single Prediction" component={Link} to="/transactions-analytics/single-prediction" />
        <Tab label="Multiple Prediction" component={Link} to="/transactions-analytics/multiple-prediction" />
      </Tabs>
    </Box>
  );
};

export default AiAnalysisIndex;
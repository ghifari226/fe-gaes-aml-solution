import React from 'react';
import { Box, Typography, Button, Card, CardContent } from '@mui/material';
import { styled } from '@mui/system';
import assets from '../../assets';

const Image = styled('img')({
  width: '100%',
  maxWidth: '800px',
  height: 'auto',
  display: 'block',
  margin: '0 auto',
});

const InfoCard = styled(Card)({
  maxWidth: '800px',
  margin: '20px auto',
});

const PeopleAnalyticsIndex = () => {
  return (
    <Box sx={{ textAlign: 'center', padding: '20px' }}>
      <Typography variant="h4" gutterBottom>Explore Customer Network</Typography>
      <InfoCard>
        <CardContent>
          <Typography variant="h6" gutterBottom>Neo4j & Graph Analytics</Typography>
          <Typography variant="body1">
            Neo4j is a powerful graph database that provides insights into relationships and connections within data. 
            It is particularly effective for Know Your Customer (KYC) processes, allowing organizations to visualize 
            and analyze customer relationships and networks. With graph analytics, you can detect fraud, uncover hidden 
            patterns, and gain a deeper understanding of customer behavior.
          </Typography>
        </CardContent>
      </InfoCard>
      <Image src={assets.images.neo4j} alt="Neo4j" />
      <Box mt={2}>
        <Button
          variant="contained"
          color="primary"
          href="https://neo4j.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Use Neo4j
        </Button>
      </Box>
    </Box>
  );
};

export default PeopleAnalyticsIndex;
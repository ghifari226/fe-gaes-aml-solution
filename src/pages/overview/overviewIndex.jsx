import React from 'react';
import { Box, Card, CardContent, Typography, Grid } from '@mui/material';
import { styled } from '@mui/system';

const ScrollableContainer = styled(Box)({
  display: 'flex',
  overflowX: 'auto',
  padding: '20px',
  gap: '20px',
  whiteSpace: 'nowrap',
});

const CardItem = styled(Card)({
  minWidth: 300,
  display: 'inline-block',
});

const OverviewIndex = () => {
  const cards = [
    { title: 'AML Overview', content: 'AML (Anti-Money Laundering) is...' },
    { title: 'KYC Process', content: 'KYC (Know Your Customer) involves...' },
    { title: 'About the App', content: 'This app helps you with...' },
    { title: 'Our Team', content: 'Meet the team behind the app...' },
    // Add more cards as needed
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>GAES AML Solution</Typography>
      <ScrollableContainer>
        {cards.map((card, index) => (
          <CardItem key={index}>
            <CardContent>
              <Typography variant="h6">{card.title}</Typography>
              <Typography variant="body2">{card.content}</Typography>
            </CardContent>
          </CardItem>
        ))}
      </ScrollableContainer>
    </Box>
  );
};

export default OverviewIndex;
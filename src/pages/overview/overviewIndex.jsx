import React from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import { styled } from '@mui/system';
import assets from "../../assets";

const ScrollableContainer = styled(Box)({
  display: 'flex',
  overflowX: 'auto',
  padding: '20px',
  gap: '20px',
  whiteSpace: 'nowrap',
});

const CardItem = styled(Card)(({ backgroundImage }) => ({
  position: 'relative',
  minWidth: 400,
  minHeight: 300,
  display: 'inline-block',
  color: '#000000',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    opacity: 0.1,
    zIndex: 0,
  }
}));

const CardContentWrapper = styled(CardContent)({
  position: 'relative',
  zIndex: 1,
});

const OverviewIndex = () => {
  const cards = [
    { title: 'AML Overview', content: 'AML (Anti-Money Laundering) is...', backgroundImage: assets.images.checkTransactions },
    { title: 'KYC Process', content: 'KYC (Know Your Customer) involves...', backgroundImage: assets.images.checkCustomers },
    { title: 'About the App', content: 'This app helps you with...', backgroundImage: '' },
    { title: 'Our Team', content: 'Meet the team behind the app...', backgroundImage: '' },
    // Add more cards as needed
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>OVERVIEW</Typography>
      <ScrollableContainer>
        {cards.map((card, index) => (
          <CardItem key={index} backgroundImage={card.backgroundImage}>
            <CardContentWrapper>
              <Typography variant="h6">{card.title}</Typography>
              <Typography variant="body2">{card.content}</Typography>
            </CardContentWrapper>
          </CardItem>
        ))}
      </ScrollableContainer>
    </Box>
  );
};

export default OverviewIndex;
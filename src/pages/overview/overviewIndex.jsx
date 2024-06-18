import React, { useState } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from '@mui/material';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import { styled } from '@mui/system';
import assets from "../../assets";

const Container = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  position: 'relative',
  zIndex: 1,
});

const BackgroundContainer = styled(Box)(({ backgroundImage }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '750px',
  height: '750px',
  backgroundImage: `url(${backgroundImage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  opacity: 0.1,
  zIndex: 0,
}));

const AccordionContainer = styled(Accordion)({
  position: 'relative',
});

const AccordionSummaryWrapper = styled(AccordionSummary)({
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
});

const OverviewIndex = () => {
  const [expanded, setExpanded] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState('');

  const handleAccordionChange = (panel, image) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : null);
    console.log('imagenya', image)
    setBackgroundImage(isExpanded ? image : '');
  };

  const cards = [
    { title: 'Alert system with deep learning and fuzzy algorithm', content: '...', backgroundImage: assets.images.warningSign },
    { title: 'Social network analysis to enhance transaction checking', content: '...', backgroundImage: assets.images.checkCustomers },
    { title: 'Transaction analysis to prevent loan-related crime', content: '...', backgroundImage: assets.images.moneyLoan },
    { title: 'Transaction analysis to prevent money laundering', content: '...', backgroundImage: assets.images.moneyLaundering },
    { title: 'Generative AI for analysis assistance', content: '...', backgroundImage: assets.images.aiHead },
  ];

  return (
    <Box position="relative" minHeight="100vh">
      <BackgroundContainer backgroundImage={backgroundImage} />
      <Container>
        <Typography variant="h4" gutterBottom>OVERVIEW</Typography>
        
        {cards.map((card, index) => (
          <AccordionContainer
            key={index}
            expanded={expanded === `panel${index}`}
            onChange={handleAccordionChange(`panel${index}`, card.backgroundImage)}
          >
            <AccordionSummaryWrapper expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">{card.title}</Typography>
            </AccordionSummaryWrapper>
            <AccordionDetails>
              <Typography variant="body2">{card.content}</Typography>
            </AccordionDetails>
          </AccordionContainer>
        ))}
      </Container>
    </Box>
  );
};

export default OverviewIndex;
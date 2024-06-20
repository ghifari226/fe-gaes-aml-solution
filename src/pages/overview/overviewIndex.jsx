import React, { useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Typography,
} from "@mui/material";
import { ExpandMore as ExpandMoreIcon } from "@mui/icons-material";
import { styled } from "@mui/system";
import assets from "../../assets";

const Container = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  position: "relative",
  zIndex: 1,
});

const BackgroundContainer = styled(Box)(({ backgroundImage }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "750px",
  height: "750px",
  backgroundImage: `url(${backgroundImage})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  opacity: 0.1,
  zIndex: 0,
}));

const AccordionContainer = styled(Accordion)({
  position: "relative",
});

const AccordionSummaryWrapper = styled(AccordionSummary)({
  backgroundColor: "rgba(255, 255, 255, 0.8)",
});

const OverviewIndex = () => {
  const [expanded, setExpanded] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState("");

  const handleAccordionChange = (panel, image) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : null);
    console.log("imagenya", image);
    setBackgroundImage(isExpanded ? image : "");
  };

  const cards = [
    {
      title: "Summary",
      content: `
        ...
    `,
    },
    {
      backgroundImage: assets.images.warningSign,
      title: "Alert system with deep learning and fuzzy algorithm",
      content: `
        The system employs advanced deep learning models to analyze transaction data and generate a suspicious score for each transaction. These models are trained on historical data to accurately identify patterns indicative of potential money laundering activities.
        In addition to the deep learning-generated scores, the system incorporates fuzzy logic rules defined by the users. When a transaction's suspicious score exceeds a predefined threshold, an alert is triggered. The system then cross-references the transaction against the fuzzy rules and provides a detailed explanation of which specific rules were violated.
        Users have the flexibility to create and adjust fuzzy rules based on their expertise and evolving compliance requirements. This allows for a personalized and adaptable approach to AML monitoring.
        This integration ensures that all alerts are not only based on advanced AI analysis but also come with clear, understandable explanations, enhancing transparency and enabling quicker decision-making.
    `,
    },
    {
      backgroundImage: assets.images.checkCustomers,
      title: "Social network analysis to enhance transaction checking",
      content: `
        Our AML (Anti-Money Laundering) application leverages Social Network Analysis (SNA) to augment transaction monitoring capabilities, enhancing the detection of suspicious activities.
        Each transaction involves two parties, ergo the sender and the recipient. By applying SNA techniques, we analyze the relationships between these entities. This allows us to uncover hidden connections, patterns of behavior, and potential risks that traditional monitoring may overlook.
        The application integrates with Neo4j, a leading graph database, to visualize customer relationships as a network of interconnected nodes and edges. This graphical representation provides a clear and intuitive way to explore complex relationships and identify anomalies within the network.
        SNA helps in assessing the risk associated with each transaction by considering factors such as the degree of separation between customers, transaction frequency, and the overall structure of the network. This multi-dimensional analysis enriches the alert system’s accuracy and reliability.
        By combining SNA with transaction monitoring, our application offers a comprehensive approach to AML compliance, empowering financial institutions to detect and prevent illicit activities more effectively.
      `,
    },
    {
      backgroundImage: assets.images.moneyLoan,
      title: "Transaction analysis to prevent loan-related crime",
      content: `
        The transaction analysis for preventing loan-related crime aims to identify patterns and behaviors indicative of fraudulent activities involving loans.
        The system analyzes transaction data, specifically focusing on loan-related transactions. It examines attributes such as the loan amount, repayment patterns, borrower information, and historical transaction behavior.
        Key indicators include the presence of anomalies in loan transactions, deviations from typical loan repayment behavior, sudden changes in loan amounts, and discrepancies in borrower information.
        Utilizes machine learning models and statistical analysis to flag transactions that exhibit high-risk characteristics associated with loan-related crime.
        Provides alerts when suspicious loan transactions are detected, with detailed insights into the specific indicators that triggered the alert. This enables prompt investigation and mitigation of potential loan-related fraud.
      `,
    },
    {
      backgroundImage: assets.images.moneyLaundering,
      title: "Transaction analysis to prevent money laundering",
      content: `
        The transaction analysis for preventing money laundering identifies transactions exhibiting characteristics commonly associated with attempts to launder illicit funds.
        Analyzes transaction data across various parameters, including transaction amounts, frequency, counterparties involved, geographic locations, and any connections identified through social network analysis (SNA).
        Looks for suspicious patterns such as frequent large transactions, unusual transaction patterns, transactions involving high-risk jurisdictions, and complex transaction routes.
        Integrates deep learning models and user-defined fuzzy rules to assign suspicious scores to transactions. Additionally, incorporates social network analysis to uncover hidden connections between entities involved in transactions.
        Generates alerts when transactions exceed predefined thresholds of suspicious activity. Provides detailed explanations of the factors contributing to the suspicious score, including insights from social network analysis, facilitating informed decision-making and compliance actions.
      `,
    },
    {
      backgroundImage: assets.images.aiHead,
      title: "Generative AI for analysis assistance",
      content: `
        Harnessing the power of AI, our application integrates the Pandas AI Python library to provide advanced analysis and visualization capabilities. Users can interact via a chat-like interface to analyze filtered transaction data for loan-related crime or money laundering flags. The system generates insightful visualizations and statistical summaries, aiding quick decision-making and enhancing detection of suspicious financial activities.
        This feature streamlines complex analysis tasks, offering interactive insights and facilitating informed responses to potential financial crimes.
      `,
    },
  ];

  return (
    <Box position="relative" minHeight="100vh">
      <BackgroundContainer backgroundImage={backgroundImage} />
      <Container>
        <Typography variant="h4" gutterBottom>
          OVERVIEW
        </Typography>
        <AccordionContainer
          expanded={expanded === "panel0"}
          onChange={handleAccordionChange("panel0", cards[0].backgroundImage)}
        >
          <AccordionSummaryWrapper expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">{cards[0].title}</Typography>
          </AccordionSummaryWrapper>
          <AccordionDetails>
            <Typography variant="body2">{cards[0].content}</Typography>
          </AccordionDetails>
        </AccordionContainer>

        <AccordionContainer
          expanded={expanded === "panel1"}
          onChange={handleAccordionChange("panel1", cards[1].backgroundImage)}
        >
          <AccordionSummaryWrapper expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">{cards[1].title}</Typography>
          </AccordionSummaryWrapper>
          <AccordionDetails>
            <Typography variant="body2">{cards[1].content}</Typography>
            <Button
              variant="contained"
              color="primary"
              // onClick={handleSimulateTransaction}
            >
              Simulate New Transaction
            </Button>
          </AccordionDetails>
        </AccordionContainer>

        <AccordionContainer
          expanded={expanded === "panel2"}
          onChange={handleAccordionChange("panel2", cards[2].backgroundImage)}
        >
          <AccordionSummaryWrapper expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">{cards[2].title}</Typography>
          </AccordionSummaryWrapper>
          <AccordionDetails>
            <Typography variant="body2">{cards[2].content}</Typography>
          </AccordionDetails>
        </AccordionContainer>

        <AccordionContainer
          expanded={expanded === "panel3"}
          onChange={handleAccordionChange("panel3", cards[3].backgroundImage)}
        >
          <AccordionSummaryWrapper expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">{cards[3].title}</Typography>
          </AccordionSummaryWrapper>
          <AccordionDetails>
            <Typography variant="body2">{cards[3].content}</Typography>
          </AccordionDetails>
        </AccordionContainer>

        <AccordionContainer
          expanded={expanded === "panel4"}
          onChange={handleAccordionChange("panel4", cards[4].backgroundImage)}
        >
          <AccordionSummaryWrapper expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">{cards[4].title}</Typography>
          </AccordionSummaryWrapper>
          <AccordionDetails>
            <Typography variant="body2">{cards[4].content}</Typography>
          </AccordionDetails>
        </AccordionContainer>

        <AccordionContainer
          expanded={expanded === "panel5"}
          onChange={handleAccordionChange("panel5", cards[5].backgroundImage)}
        >
          <AccordionSummaryWrapper expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">{cards[5].title}</Typography>
          </AccordionSummaryWrapper>
          <AccordionDetails>
            <Typography variant="body2">{cards[5].content}</Typography>
          </AccordionDetails>
        </AccordionContainer>
      </Container>
    </Box>
  );
};

export default OverviewIndex;

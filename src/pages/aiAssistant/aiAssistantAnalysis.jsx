import React, { useState, useRef, useEffect } from "react";
import {
  Paper,
  Grid,
  Box,
  Divider,
  TextField,
  Typography,
  List,
  ListItem,
  ListItemText,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { styled } from "@mui/system";
import { useLocation, useNavigate } from "react-router-dom";
import aiAssistantChatData from "../../data/aiAssistantChatData";

const ChatSection = styled(Paper)({
  width: "100%",
  height: "80vh",
});

const BorderLeft500 = styled(Box)({
  borderLeft: "1px solid #e0e0e0",
});

const MessageArea = styled(List)({
  height: "70vh",
  overflowY: "auto",
});

const AiAssistantAnalysis = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [inputValue, setInputValue] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [hasTicket, setHasTicket] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const messageAreaRef = useRef(null);
  const ticketNumber = location.pathname.split("/")[3];

  useEffect(() => {
    if (ticketNumber && !isNaN(Number(ticketNumber))) {
      setHasTicket(true);
      const foundData = aiAssistantChatData.find(
        (item) => item.ticketNumber === Number(ticketNumber)
      );
      if (foundData) {
        setChatHistory(foundData.chatHistory);
      }
    } else {
      setDialogOpen(true);
    }
  }, [ticketNumber]);

  useEffect(() => {
    if (messageAreaRef.current) {
      messageAreaRef.current.scrollTop = messageAreaRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const handleSend = () => {
    if (inputValue.trim() !== "") {
      setChatHistory([
        ...chatHistory,
        {
          prompt: inputValue,
          answer: { imgLink: "", text: "This is a static response." },
        },
      ]);
      setInputValue("");
    }
  };

  const handleHistoryClick = () => {
    navigate("/ai-assistant/index");
    setDialogOpen(false);
  };

  const handleNewChatClick = () => {
    navigate("/transactions-analysis/loan");
    setDialogOpen(false);
  };

  const handleCloseDialog = () => {
    navigate("/ai-assistant/index");
    setDialogOpen(false);
  };

  if (!hasTicket) {
    return (
      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        disableBackdropClick
        disableEscapeKeyDown
      >
        <DialogTitle>No Ticket Found</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            To access the chat with AI assistant, you need a valid ticket
            number. You can access it through one of these actions:
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleHistoryClick} autoFocus>
            See Chat History
          </Button>
          <Button onClick={handleNewChatClick} autoFocus>
            Generate New Chat
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  return (
    <Box>
      <Grid container>
        <Grid item xs={12} sx={{ marginBottom: "20px" }}>
          <Typography variant="h5" className="header-message">
            AI Assistant Analysis
          </Typography>
          <Typography>Ticket No: {ticketNumber || 623958173259}</Typography>
        </Grid>
      </Grid>
      <ChatSection>
        <Grid container>
          <Grid item xs={12}>
            <BorderLeft500>
              <MessageArea ref={messageAreaRef}>
                {chatHistory.map((chat, index) => (
                  <React.Fragment key={index}>
                    {/* User's Chat */}
                    <ListItem
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        marginTop: "30px",
                        marginBottom: "20px",
                      }}
                    >
                      <Grid
                        key={index}
                        item
                        xs={12}
                        sx={{
                          display: "flex",
                          justifyContent: "flex-end",
                        }}
                      >
                        <div
                          style={{
                            backgroundColor: "#23d368",
                            borderRadius: "10px",
                            padding: "10px",
                            display: "inline-block",
                            textAlign: "right",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {chat.prompt}
                        </div>
                      </Grid>
                    </ListItem>

                    {/* AI Response */}
                    <ListItem
                      style={{ margin: "auto" }}
                      sx={{
                        textAlign: "center",
                        backgroundColor: "#f8f8f8",
                        borderRadius: "10px",
                        margin: "10px 0",
                        padding: "10px",
                        maxWidth: "90%",
                      }}
                    >
                      <Grid container justifyContent="center">
                        <Grid item xs={12}>
                          <ListItemText
                            align="center"
                            primary={chat.answer.text}
                          />
                        </Grid>
                        {chat.answer.imgLink && (
                          <Grid item xs={12}>
                            <Box sx={{ textAlign: "center" }}>
                              <img
                                src={chat.answer.imgLink}
                                alt="response"
                                style={{ maxWidth: "100%" }}
                              />
                            </Box>
                          </Grid>
                        )}
                      </Grid>
                    </ListItem>
                  </React.Fragment>
                ))}
              </MessageArea>
              <Divider />
              <Grid container sx={{ padding: "20px" }}>
                <Grid item xs={11}>
                  <TextField
                    id="outlined-basic-email"
                    label="Type Something"
                    fullWidth
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        handleSend();
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={1} align="right">
                  <Fab color="primary" aria-label="send" onClick={handleSend}>
                    <SendIcon />
                  </Fab>
                </Grid>
              </Grid>
            </BorderLeft500>
          </Grid>
        </Grid>
      </ChatSection>
    </Box>
  );
};

export default AiAssistantAnalysis;

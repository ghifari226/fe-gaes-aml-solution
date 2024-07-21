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
import assets from "../../assets";
import aiAssistantChatData from "../../data/aiAssistantChatData";
import axios from "axios";

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
  const [data, setData] = useState([]);
  const [loadingResponse, setLoadingResponse] = useState(false);

  const messageAreaRef = useRef(null);
  const chatId = location.pathname.split("/")[2];

  useEffect(() => {
    fetchData();
  }, [chatId]);

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

        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/chat-detail/${chatId}`,
          {
            // params: {
            //   start_date: moment(startDate).format("YYYY-MM-DD"),
            //   end_date: moment(endDate).format("YYYY-MM-DD"),
            // },
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const responseData = response.data.data;
        const mappedData = responseData.map((item) => item.chat_content);
        setChatHistory(mappedData);
      } else {
        console.error("Token not found in the login response");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const sendChat = async (prompt) => {
    setLoadingResponse(true);
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

        const createdAt = new Date().toISOString();
        let body = {
          chat_content: prompt,
          chat_history_id: chatId,
          created_by: "John Doe",
          created_at: createdAt,
        };

        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/chat-detail`,
          body,
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setChatHistory([
          ...chatHistory.slice(0, chatHistory.length - 1),
          response.data.detail,
        ]);
      } else {
        console.error("Token not found in the login response");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoadingResponse(false);
    }
  };

  useEffect(() => {
    if (messageAreaRef.current) {
      messageAreaRef.current.scrollTop = messageAreaRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const handleSend = () => {
    setChatHistory([
      ...chatHistory,
      { prompt: inputValue, response: { text: "loading", imageUrl: null } },
    ]);
    if (inputValue.trim() !== "") {
      sendChat(inputValue);
      setInputValue("");
    }
  };

  return (
    <Box>
      <Grid container>
        <Grid item xs={12} sx={{ marginBottom: "20px" }}>
          <Typography variant="h5" className="header-message">
            Asisten AI
          </Typography>
          <Typography>Nomor Tiket: {data.chat_ticket_no || ""}</Typography>
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
                        {chat.response?.text === "loading" && (
                          <Grid item xs={12}>
                            ...
                          </Grid>
                        )}
                        {chat.response?.text && (
                          <Grid item xs={12}>
                            <ListItemText
                              align="center"
                              primary={chat.response.text}
                            />
                          </Grid>
                        )}
                        {chat.response?.imgLink && (
                          <Grid item xs={12}>
                            <Box sx={{ textAlign: "center" }}>
                              <img
                                src={chat.response.imageUrl}
                                alt="response"
                                style={{ width: "800px" }}
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
                    onKeyDown={(e) => {
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

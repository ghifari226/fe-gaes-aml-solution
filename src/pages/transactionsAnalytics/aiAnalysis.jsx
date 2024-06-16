import React, { useState, useRef, useEffect } from 'react';
import { Paper, Grid, Box, Divider, TextField, Typography, List, ListItem, ListItemText, Fab } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { styled } from '@mui/system';

const ChatSection = styled(Paper)({
  width: '100%',
  height: '80vh',
});

const BorderLeft500 = styled(Box)({
  borderLeft: '1px solid #e0e0e0',
});

const MessageArea = styled(List)({
  height: '70vh',
  overflowY: 'auto',
});

const AiAnalysis = () => {
  const [inputValue, setInputValue] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { prompt: 'give me barchart of this column', answer: { imgLink: 'https://placehold.co/600x400', text: 'Here is your bar chart.' } },
    // Add more Q&A pairs as needed
  ]);

  const messageAreaRef = useRef(null);

  useEffect(() => {
    if (messageAreaRef.current) {
      messageAreaRef.current.scrollTop = messageAreaRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const handleSend = () => {
    if (inputValue.trim() !== '') {
      setChatHistory([
        ...chatHistory,
        { prompt: inputValue, answer: { imgLink: '', text: 'This is a static response.' } }
      ]);
      setInputValue('');
    }
  };

  return (
    <Box>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h5" className="header-message">Analysis Assistant</Typography>
        </Grid>
      </Grid>
      <ChatSection>
        <Grid container>
          <Grid item xs={3}>
            {/* <BorderRight500> */}
                  <p style={{ marginLeft: "15px" }}>Chat History</p>
              <List>
                <ListItem>
                  Tolong bikinin histogram
                </ListItem>
                {/* {chatHistory.map((chat, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={chat.prompt} secondary={chat.answer.text} />
                  </ListItem>
                ))} */}
              </List>
            {/* </BorderRight500> */}
          </Grid>
          <Grid item xs={9}>
            <BorderLeft500>
              <MessageArea ref={messageAreaRef}>
                {chatHistory.map((chat, index) => (
                  <React.Fragment key={index}>
                    {/* User's Chat */}
                    <ListItem sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '30px', marginBottom: '20px' }}>
                      <Grid key={index} item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <div
                          style={{
                            backgroundColor: '#23d368',
                            borderRadius: '10px',
                            padding: '10px',
                            display: 'inline-block',
                            textAlign: 'right',
                            whiteSpace: 'nowrap',
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
                        textAlign: 'center',
                        backgroundColor: '#f8f8f8',
                        borderRadius: '10px',
                        margin: '10px 0',
                        padding: '10px',
                        maxWidth: '90%'
                      }}
                    >
                      <Grid container justifyContent="center">
                        <Grid item xs={12}>
                          <ListItemText align="center" primary={chat.answer.text} />
                        </Grid>
                        {chat.answer.imgLink && (
                          <Grid item xs={12}>
                            <Box sx={{ textAlign: 'center' }}>
                              <img src={chat.answer.imgLink} alt="response" style={{ maxWidth: '100%' }} />
                            </Box>
                          </Grid>
                        )}
                      </Grid>
                    </ListItem>
                  </React.Fragment>
                ))}
              </MessageArea>
              <Divider />
              <Grid container sx={{ padding: '20px' }}>
                <Grid item xs={11}>
                  <TextField
                    id="outlined-basic-email"
                    label="Type Something"
                    fullWidth
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
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

export default AiAnalysis;